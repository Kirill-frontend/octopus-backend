import 'dotenv/config'
import fs from 'node:fs/promises'
import path from 'node:path'
import { Client } from '../node_modules/.pnpm/pg@8.20.0/node_modules/pg/esm/index.mjs'

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  console.error('DATABASE_URL is missing.')
  process.exit(1)
}

const backupDir = path.resolve(process.cwd(), 'backups')
const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
const outputPath = path.join(backupDir, `db-backup-${timestamp}.json`)

const redactDatabaseUrl = (value) => value.replace(/:\/\/([^:]+):([^@]+)@/, '://$1:***@')

const client = new Client({
  connectionString: databaseUrl,
})

const getTables = async () => {
  const result = await client.query(
    `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `,
  )

  return result.rows.map((row) => row.table_name)
}

const getColumns = async (tableName) => {
  const result = await client.query(
    `
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = $1
      ORDER BY ordinal_position
    `,
    [tableName],
  )

  return result.rows
}

const getRows = async (tableName) => {
  const result = await client.query(`SELECT * FROM "${tableName}"`)
  return result.rows
}

try {
  await fs.mkdir(backupDir, { recursive: true })
  await client.connect()

  const tableNames = await getTables()
  const tables = {}

  for (const tableName of tableNames) {
    const [columns, rows] = await Promise.all([getColumns(tableName), getRows(tableName)])
    tables[tableName] = {
      columns,
      rowCount: rows.length,
      rows,
    }
  }

  const payload = {
    createdAt: new Date().toISOString(),
    databaseUrlRedacted: redactDatabaseUrl(databaseUrl),
    schema: 'public',
    tableCount: tableNames.length,
    tables,
  }

  await fs.writeFile(outputPath, JSON.stringify(payload, null, 2), 'utf8')
  console.log(outputPath)
} catch (error) {
  console.error('Database backup failed.')
  console.error(error)
  process.exit(1)
} finally {
  await client.end().catch(() => undefined)
}

import 'dotenv/config'
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import { getPayload } from 'payload'

import config from '@/payload.config'
import type { Media } from '@/payload-types'

const mediaDir = path.resolve(process.cwd(), 'media')
const supportedRasterMimePrefixes = ['image/']
const unsupportedMimeTypes = new Set(['image/svg+xml'])

const imageSizes = [
  { name: 'thumbnail', width: 400, height: 300 },
  { name: 'card', width: 1200, height: 800 },
] as const

type PayloadLike = Awaited<ReturnType<typeof getPayload>>

const fileExists = async (filePath: string) => {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

const buildDerivedFilename = (filename: string, suffix: string) => {
  const ext = path.extname(filename)
  const base = path.basename(filename, ext)
  return `${base}-${suffix}${ext}`
}

const ensureDerivative = async (
  originalPath: string,
  derivativePath: string,
  width: number,
  height: number,
) => {
  await sharp(originalPath)
    .resize({
      width,
      height,
      fit: 'cover',
      withoutEnlargement: true,
    })
    .toFile(derivativePath)
}

async function run() {
  const payload = (await getPayload({ config })) as PayloadLike

  const { docs } = await payload.find({
    collection: 'media',
    depth: 0,
    limit: 1000,
  })

  let restoredCount = 0
  const missingOriginals: string[] = []
  const failed: Array<{ filename: string; reason: string }> = []

  for (const doc of docs as Media[]) {
    if (!doc.filename) continue
    if (!doc.mimeType) continue
    if (!supportedRasterMimePrefixes.some((prefix) => doc.mimeType?.startsWith(prefix))) continue
    if (unsupportedMimeTypes.has(doc.mimeType)) continue

    const originalPath = path.join(mediaDir, doc.filename)
    const originalExists = await fileExists(originalPath)

    if (!originalExists) {
      missingOriginals.push(doc.filename)
      continue
    }

    for (const size of imageSizes) {
      const derivativeFilename =
        doc.sizes?.[size.name]?.filename || buildDerivedFilename(doc.filename, `${size.width}x${size.height}`)
      const derivativePath = path.join(mediaDir, derivativeFilename)

      if (await fileExists(derivativePath)) {
        continue
      }

      try {
        await ensureDerivative(originalPath, derivativePath, size.width, size.height)
        restoredCount += 1
        console.log(`restored: ${derivativeFilename}`)
      } catch (error) {
        failed.push({
          filename: derivativeFilename,
          reason: error instanceof Error ? error.message : 'Unknown error',
        })
      }
    }
  }

  console.log(`\nRestored derivatives: ${restoredCount}`)

  if (missingOriginals.length > 0) {
    console.log('\nMissing originals:')
    for (const filename of missingOriginals) {
      console.log(`- ${filename}`)
    }
  }

  if (failed.length > 0) {
    console.log('\nFailed derivatives:')
    for (const item of failed) {
      console.log(`- ${item.filename}: ${item.reason}`)
    }
    process.exit(1)
  }

  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})

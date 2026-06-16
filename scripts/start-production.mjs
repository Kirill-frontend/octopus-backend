import { spawnSync } from 'node:child_process'

function run(command, args, label) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    env: process.env,
  })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }

  return result
}

if (process.env.RUN_PAYLOAD_MIGRATIONS !== 'false') {
  console.log('[bootstrap] Running Payload migrations...')
  run('npx', ['payload', 'migrate'], 'payload migrate')
}

if (process.env.RUN_PAYLOAD_SEED_ON_BOOT === 'true') {
  console.log('[bootstrap] Running Payload seed...')
  run('npm', ['run', 'seed:admin-plan'], 'seed:admin-plan')
}

console.log('[bootstrap] Starting Next/Payload server...')
run('node', ['server.js'], 'server.js')

import fs from 'node:fs'
import fsPromises from 'node:fs/promises'
import path from 'node:path'
import { Readable } from 'node:stream'

const mediaDir = path.resolve(process.cwd(), 'media')

const mimeTypes: Record<string, string> = {
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
}

const buildFilePath = (segments: string[] = []) => {
  const filename = segments.join('/')
  const resolvedPath = path.resolve(mediaDir, filename)

  if (!resolvedPath.startsWith(mediaDir + path.sep)) {
    return null
  }

  return resolvedPath
}

const getHeaders = (filePath: string, size: number) => {
  const ext = path.extname(filePath).toLowerCase()
  const headers = new Headers({
    'Cache-Control': 'public, max-age=31536000, immutable',
    'Content-Length': String(size),
    'Content-Type': mimeTypes[ext] || 'application/octet-stream',
  })

  if (ext === '.svg') {
    headers.set('Content-Security-Policy', "script-src 'none'")
  }

  return headers
}

const serveFile = async (segments: string[] | undefined, method: 'GET' | 'HEAD') => {
  const filePath = buildFilePath(segments)

  if (!filePath) {
    return new Response('Not Found', { status: 404 })
  }

  try {
    const stats = await fsPromises.stat(filePath)

    if (!stats.isFile()) {
      return new Response('Not Found', { status: 404 })
    }

    const headers = getHeaders(filePath, stats.size)

    if (method === 'HEAD') {
      return new Response(null, { headers, status: 200 })
    }

    const stream = Readable.toWeb(fs.createReadStream(filePath)) as ReadableStream

    return new Response(stream, {
      headers,
      status: 200,
    })
  } catch {
    return new Response('Not Found', { status: 404 })
  }
}

export const GET = async (
  _request: Request,
  context: { params: Promise<{ filename?: string[] }> },
) => {
  const { filename } = await context.params
  return serveFile(filename, 'GET')
}

export const HEAD = async (
  _request: Request,
  context: { params: Promise<{ filename?: string[] }> },
) => {
  const { filename } = await context.params
  return serveFile(filename, 'HEAD')
}

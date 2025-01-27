import { createWriteStream } from 'node:fs'
import type { PathLike } from 'node:fs'
import { rename, stat } from 'node:fs/promises'
import { join } from 'node:path'
import { pipeline } from 'node:stream/promises'
import mkdirp from 'mkdirp'
import ytdl from 'yt-dlp-exec'
import { COOKIES, DOWNLOAD_DIR } from './env/index.js'

/* eslint-disable @typescript-eslint/consistent-type-imports */
// @ts-expect-error Incorrect typings
const exec = ytdl.exec as typeof import('yt-dlp-exec')['exec']
/* eslint-enable @typescript-eslint/consistent-type-imports */

export const downloadClip = async (url: string): Promise<string> => {
  const cookies = COOKIES
  const dir = DOWNLOAD_DIR
  await mkdirp(dir)

  const { id, ext } = await ytdl(url, {
    dumpSingleJson: true,
    cookies: cookies,
  })

  const filename = `${id}.${ext}`
  const temporaryFilename = `${filename}.tmp`

  const temporaryPath = join(dir, temporaryFilename)
  const path = join(dir, filename)

  const fileExists = await exists(path)
  if (fileExists) {
    return filename
  }

  await pipeline(
    exec(url, { output: '-', cookies: cookies }).stdout!,
    createWriteStream(temporaryPath),
  )

  await rename(temporaryPath, path)
  return filename
}

const exists: (path: PathLike) => Promise<boolean> = async path => {
  try {
    await stat(path)
    return true
  } catch {
    return false
  }
}

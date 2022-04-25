import mkdirp from 'mkdirp'
import { createWriteStream } from 'node:fs'
import { join } from 'node:path'
import { pipeline } from 'node:stream/promises'
import ytdl from 'yt-dlp-exec'
import { DOWNLOAD_DIR } from './env/index.js'

// @ts-expect-error Incorrect typings
const exec = ytdl.exec as typeof import('yt-dlp-exec')['exec']

export const downloadClip = async (url: string) => {
  const { id, title, ext } = await ytdl(url, { dumpSingleJson: true })
  const filename = `${title} [${id}].${ext}`

  const dir = DOWNLOAD_DIR
  await mkdirp(dir)

  const path = join(dir, filename)
  await pipeline(exec(url, { output: '-' }).stdout!, createWriteStream(path))
}

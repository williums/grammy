import { Client, Intents } from 'discord.js'
import { downloadClip } from './download.js'
import { TOKEN, SERVER_URL } from './env/index.js'
import { exitHook } from './exitHook.js'
import { refreshCookies } from './refresh.js'

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}`)

  client.user?.setActivity('with spiteful eyes 😡', { type: 'WATCHING' })
})

client.on('messageCreate', async message => {
  const CLIP_RX =
    /((?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:reel)\/([^/?#&\n]+))/gi
  const matches = CLIP_RX.exec(message.cleanContent)
  if (matches === null) return

  const [url, id] = matches
  const reaction = await message.react('⌛')

  try {
    console.log(`${id}: Downloading...`)
    const filename = await downloadClip(url)
    console.log(`${id}: Downloading complete!`)

    await message.react('✅')
    message.channel.send(`${SERVER_URL}/${filename}`)
  } catch (error: unknown) {
    await message.react('❗')
    if (error instanceof Error) {
      console.error(error)
    }
  } finally {
    await reaction.remove()
  }
})

void client.login(TOKEN)

setInterval(refreshCookies, 10800000)

exitHook((exit, error) => {
  console.log('Exiting...')
  if (error instanceof Error) {
    console.error(error)
  }

  client.destroy()
  exit()
})

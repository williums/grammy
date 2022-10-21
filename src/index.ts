import { setInterval } from 'node:timers'
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
  const IG_RX = /instagram\.com\/(?<type>p|reel)\/(?<id>.*)\//gi
  const matches = IG_RX.exec(message.cleanContent)
  if (matches === null) return

  const [url, type, id] = matches
  const reaction = await message.react('⌛')

  try {
    console.log(`${id}: Downloading...`)
    const filename = await downloadClip(`https://${url}`)
    console.log(`${id}: Downloading complete!`)

    await message.react('✅')
    await message.channel.send(`${SERVER_URL}/${filename}`)
  } catch (error: unknown) {
    if (error instanceof Error && type !== 'p') {
      await message.react('❗')
      console.error(error)
    }
  } finally {
    await reaction.remove()
  }
})

void client.login(TOKEN)

setInterval(refreshCookies, 10_800_000)

exitHook((exit, error) => {
  console.log('Exiting...')
  if (error instanceof Error) {
    console.error(error)
  }

  client.destroy()
  exit()
})

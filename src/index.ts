import { Client, Intents } from 'discord.js'
import { TOKEN } from './env/index.js'
import { exitHook } from './exitHook.js'

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}`)
})

client.on('messageCreate', message => {
  const CLIP_RX = /https:\/\/clips.twitch.tv\/([a-zA-Z\d-]+)/g
  const matches = CLIP_RX.exec(message.cleanContent)
  if (matches === null) return

  const [url, id] = matches
  console.log({ url, id })
})

void client.login(TOKEN)
exitHook((exit, error) => {
  console.log('Exiting...')
  if (error instanceof Error) {
    console.error(error)
  }

  client.destroy()
  exit()
})

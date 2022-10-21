import { exec } from 'child_process'
import { COOKIES } from './env/index.js'

export const refreshCookies = () => {
  const url = 'https://www.instagram.com/'
  const cookies = `../${COOKIES}`
  const command = `curl --cookie ${cookies} --cookie-jar ${cookies} ${url}`
  exec(command)
}

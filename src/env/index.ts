import { registerString } from './register.js'

// #region Globals
const NODE_ENV = registerString('NODE_ENV')
const IS_PROD = NODE_ENV?.toLowerCase() === 'production'
export const IS_DEV = !IS_PROD
// #endregion

// #region Application
export const TOKEN = registerString('TOKEN', true)
export const DOWNLOAD_DIR = registerString('DOWNLOAD_DIR', true)
export const SERVER_URL = registerString('SERVER_URL', true)
export const COOKIES = registerString('COOKIES', true)
// #endregion

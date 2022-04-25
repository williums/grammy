/* eslint-disable prettier/prettier */
import { registerString } from './register.js'

// #region Globals
const NODE_ENV = registerString('NODE_ENV')
const IS_PROD = NODE_ENV?.toLowerCase() === 'production'
export const IS_DEV = !IS_PROD
// #endregion

// #region Application
export const TOKEN = registerString('TOKEN', true)
// #endregion

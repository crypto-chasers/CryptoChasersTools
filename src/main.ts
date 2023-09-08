import { TemplatePlugin } from '@/types/utools'
import { txhash, txMagic} from './features/tx'
import { address, addressMagic } from './features/address'
import { dexscreener } from './features/dexscreener'
import { input } from './features/input'

// utools.onPluginEnter(params => {
// });

const preload: TemplatePlugin = {
  txhash,
  txMagic,
  address,
  addressMagic,
  dexscreener,
  input
}

window.exports = preload

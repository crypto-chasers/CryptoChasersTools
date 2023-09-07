import { TemplatePlugin } from '@/types/utools'
import { txhash, txMagic} from './features/tx'
import { address, addressMagic } from './features/address'
import { dexscreener } from './features/dexscreener'

// utools.onPluginEnter(params => {
// });

const preload: TemplatePlugin = {
  txhash,
  txMagic,
  address,
  addressMagic,
  dexscreener
}

window.exports = preload

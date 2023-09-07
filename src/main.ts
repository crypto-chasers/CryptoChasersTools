import { TemplatePlugin } from '@/types/utools'
import { txhash, txMagic} from './features/tx'
import { address, addressMagic } from './features/address'

// utools.onPluginEnter(params => {
// });

const preload: TemplatePlugin = {
  txhash,
  txMagic,
  address,
  addressMagic
}

window.exports = preload

/**
 * @type { import ('./src/types/utools').PluginConfig }
 */
const pluginConfig = {
  pluginName: 'CryptoChasersTools',
  // version: 'v1.0.0',
  description: 'CryptoChasers工具箱',
  author: 'GlacierLuo',
  homepage: '',
  // main: 'index.html',
  preload: 'preload.js',
  logo: 'assets/img/logo.png',
  features: [
    {
      code: 'txhash',
      explain: 'Open tx explorer',
      cmds: [
        {
          type: 'regex',
          label: 'View tx with scan.',
          match: '/^0x([A-Fa-f0-9]{64})$/'
        }
      ]
    },{
      code: 'txMagic',
      explain: '妙妙工具！',
      cmds: [
        {
          type: 'regex',
          label: '妙妙！',
          match: '/^0x([A-Fa-f0-9]{64})$/'
        }
      ]
    }, {
      code: 'address',
      explain: 'Open address explorer',
      cmds: [
        {
          type: 'regex',
          label: 'View address with scan.',
          match: '/^0x([A-Fa-f0-9]{40})$/'
        }
      ]
    }, {
      code: 'addressMagic',
      explain: '妙妙工具！',
      cmds: [
        {
          type: 'regex',
          label: '妙妙！',
          match: '/^0x([A-Fa-f0-9]{40})$/'
        }
      ]
    }, {
      code: 'dexscreener',
      explain: 'View token with dexscreener.',
      cmds: [
        {
          type: 'regex',
          label: 'Dexscreener',
          match: '/^0x([A-Fa-f0-9]{40})$/'
        }
      ]
    }, {
      code: 'abi',
      explain: 'abi form',
      cmds: [
        {
          type: 'regex',
          label: 'abi form',
          match: '/\[.+?\]/'
        }
      ]
    }
  ],
};
export default pluginConfig;

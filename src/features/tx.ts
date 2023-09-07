import { TplFeature } from '@/types/utools'
import { rpc, scan } from '@/data'
import request from '@/Helper/HttpHelper'

async function checkTxHash(hash) {
  let querys = []
  for (let i in rpc) {
    querys.push(request.post(rpc[i], {
      jsonrpc: "2.0",
      method: "eth_getTransactionByHash",
      params: [hash],
      id: 1
    }))
  }
  const res = await Promise.all(querys)
  res.map((v, i, arr) => {
    if (v.result !== null) {
      utools.shellOpenExternal(`${scan[Object.keys(scan)[i]]}tx/${hash}`)
      utools.outPlugin()
    }
  })
}

export const txhash: TplFeature = {
  mode: 'list',
  args: {
    placeholder: '',
    enter: (action, callbackSetList) => {
      let list = []
      for(let i in scan) {
        list.push({
          title: `Open with ${i}scan.`,
          description: `View tx with ${i}scan.`,
          url: `${scan[i]}tx/${action.payload}`,
          icon: '' // 图标(可选)
        })
      }
      callbackSetList(list)
    },
    select: (action, itemData, callbackSetList) => {
      utools.shellOpenExternal(itemData.url)
      utools.outPlugin()
   }
  }
}

export const txMagic: TplFeature = {
  mode: 'none',
  args: {
    placeholder: '',
    enter: async (action) => {
      checkTxHash(action.payload)
    }
  }
}

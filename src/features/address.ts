import { TplFeature } from '@/types/utools'
import { rpc, scan } from '@/data'
import request from '@/Helper/HttpHelper'

async function queryAddress (address, callback) {
  let querys = []
  for(let i in rpc) {
    querys.push(request.post(rpc[i], {
      jsonrpc:"2.0",
      method:"eth_getTransactionCount",
      params:[address, "latest"],
      id:1}))
  }
  const res = await Promise.all(querys)
  let list = []
  res.map((v, i, arr) => {
    if (v.result !== '0x0') {
      list.push({
        title: `Open with ${Object.keys(scan)[i]}scan.`,
        description: `View address with ${Object.keys(scan)[i]}scan.`,
        url: `${scan[Object.keys(scan)[i]]}address/${address}`,
        icon: '' // 图标(可选)
      })
    }
  })
  callback(list)
}

export const address: TplFeature = {
  mode: 'list',
  args: {
    placeholder: '',
    enter: (action, callbackSetList) => {
      let list = []
      for(let i in scan) {
        list.push({
          title: `Open with ${i}scan.`,
          description: `View address with ${i}scan.`,
          url: `${scan[i]}address/${action.payload}`,
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

export const addressMagic: TplFeature = {
  mode: 'list',
  args: {
    placeholder: '',
    enter: (action, callbackSetList) => {
      queryAddress(action.payload, callbackSetList)
    },
    select: (action, itemData, callbackSetList) => {
      utools.shellOpenExternal(itemData.url)
      utools.outPlugin()
   }
  }
}

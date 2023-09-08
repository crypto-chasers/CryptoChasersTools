import { TplFeature } from '@/types/utools'
import request from '@/Helper/HttpHelper'
import { decodeAbiParameters, parseAbiParameters } from 'viem'

async function decodeInput(input, callback) {
  try {
    let sigStr = input.substr(0, 10)
    let sig: any = await request.get(`https://api.openchain.xyz/signature-database/v1/lookup?function=${sigStr}&filter=true`)
    let functionName: string = sig.result.function[sigStr][0].name
    let args = functionName.match(/\(.+\)$/g)[0].replace('(', '').replace(')', '')
    let argsList = args.split(',')

    let list = [{
      title: `${functionName}`,
      description: `Function Name`,
      icon: '' // 图标(可选)
    }]

    let data = decodeAbiParameters(
      parseAbiParameters(args),
      input.replace(input.slice(0, 10), '0x')
    )
    data.map((v, i, arr) => {
      list.push({
        title: `${v}`,
        description: argsList[i],
        icon: '' // 图标(可选)
      })
    })

    callback(list)
  } catch (e) {
    utools.showNotification('Decode failed!')
    utools.outPlugin()
  }
}

export const input: TplFeature = {
  mode: 'list',
  args: {
    placeholder: '',
    enter: (action, callbackSetList) => {
      decodeInput(action.payload, callbackSetList)
    },
    select: (action, itemData, callbackSetList) => {
      utools.copyText(itemData.title)
      utools.outPlugin()
    }
  }
}
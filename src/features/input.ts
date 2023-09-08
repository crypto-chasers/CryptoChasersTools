import { TplFeature } from '@/types/utools'
import request from '@/Helper/HttpHelper'
import { decodeAbiParameters, parseAbiParameters } from 'viem'

async function decodeInput(input, callback) {
  try {
    let list = []
    let inputList = [input]

    while (inputList.length !== 0) {
      let tempInput = inputList.pop()

      let sigStr = tempInput.substr(0, 10)
      let sig: any = await request.get(`https://api.openchain.xyz/signature-database/v1/lookup?function=${sigStr}&filter=true`)
      let functionName: string = sig.result.function[sigStr][0].name
      let args = functionName.match(/\(.+\)$/g)[0].replace('(', '').replace(')', '')
      let argsList = args.split(',')

      list.push({
        title: `${functionName}`,
        description: `Function Name`,
        icon: '' // 图标(可选)
      })

      let data = decodeAbiParameters(
        parseAbiParameters(args),
        tempInput.replace(tempInput.slice(0, 10), '0x')
      )
      data.map((v, i, arr) => {
        if (functionName.startsWith('multicall')) {
          if (v instanceof Array) {
            v.map((v, i, arr) => {
              inputList.push(v)
            })
          }
        }

        list.push({
          title: `${v}`,
          description: argsList[i].match(/[a-z]+/g)[0],
          icon: '' // 图标(可选)
        })
      })
    }

    callback(list)
  } catch (e) {
    console.log(e)
    // utools.showNotification('Decode failed!')
    // utools.outPlugin()
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
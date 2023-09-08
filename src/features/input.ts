import { TplFeature } from '@/types/utools'
import request from '@/Helper/HttpHelper'
import { decodeAbiParameters, parseAbiParameters } from 'viem'

async function multiQuery (input) {
  let sigStr = input.substr(0, 10)
  let res: any = await request.get(`https://api.openchain.xyz/signature-database/v1/lookup?function=${sigStr}&filter=true`)
  let functionName: string = res.result.function[Object.keys(res.result.function)[0]][0].name
  let args = functionName.match(/\(.+\)$/g)[0].replace('(', '').replace(')', '')
  let argsList = args.split(',')
  return {
    functionName,
    args,
    argsList,
    input
  }
}

async function decodeInput(input, callback) {
  try {
    let list = []
    let inputList = [input]

    while (inputList.length !== 0) {
      let queryList = []
      while (inputList.length !== 0){
        queryList.push(multiQuery(inputList.pop()))
      }
      let res = await Promise.all(queryList)

      for(let item of res) {
        list.push({
          title: `${item.functionName}`,
          description: `Function Name`,
          icon: '' // 图标(可选)
        })

        let data = decodeAbiParameters(
          parseAbiParameters(item.args as string),
          item.input.replace(item.input.slice(0, 10), '0x')
        )
        data.map((v, i, arr) => {
          if (item.functionName.startsWith('multicall')) {
            if (v instanceof Array) {
              v.map((v, i, arr) => {
                inputList.push(v)
              })
            }
          }
  
          list.push({
            title: `${v}`,
            description: item.argsList[i].match(/[a-z]+/g)[0],
            icon: '' // 图标(可选)
          })
        })
      }
    }

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
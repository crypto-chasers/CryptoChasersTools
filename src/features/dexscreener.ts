import { TplFeature } from '@/types/utools'
import request from '@/Helper/HttpHelper'

function shortenNum (num) {
  return Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(num)
}

async function queryToken (address, callback) {
  let res: any = await request.get(`https://api.dexscreener.com/latest/dex/tokens/${address}`)
  let list = res.pairs.map((v, i, arr) => {
    return {
      title: `${v.baseToken.symbol}/${v.quoteToken.symbol}`,
      description: `PriceUsd: ${shortenNum(v.priceUsd).padEnd(15, 'ㅤ')}h24: ${shortenNum(v.volume.h24).padEnd(15, 'ㅤ')}FDV: ${shortenNum(v.fdv).padEnd(15, 'ㅤ')}Liquidity: ${shortenNum(v.liquidity.usd)}`,
      url: `${v.url}`,
      icon: '' // 图标(可选)
    }
  })
  callback(list)
}


export const dexscreener: TplFeature = {
  mode: 'list',
  args: {
    placeholder: '',
    enter: (action, callbackSetList) => {
      queryToken(action.payload, callbackSetList)
    },
    select: (action, itemData, callbackSetList) => {
      utools.shellOpenExternal(itemData.url)
      utools.outPlugin()
   }
  }
}

import { pick } from 'lodash-es'

import { apiKeys } from '../../constants/api'
import { fetcher } from '../../utils'

export default async (_, res) => {
  const data = await fetcher('https://www.blockchain.com/ticker')
  const snapshot = []
  const targetCurrencies = Object.values(apiKeys)
  for (const currency in data) {
    if (targetCurrencies.includes(currency)) 
      snapshot.push(pick(data[currency], ['symbol', '15m']))
  }
  res.status(200).json(snapshot)
}

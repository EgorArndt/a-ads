import { pick } from 'lodash-es'

import { fetcher } from '../../utils'

export default async (_, res) => {
  const data = await fetcher('https://www.blockchain.com/ticker')
  const snapshot = []
  for (const key in data) {
    if (['USD', 'RUB', 'EUR'].includes(key)) snapshot.push(pick(data[key], ['symbol', '15m']))
  }
  res.status(200).json(snapshot)
}

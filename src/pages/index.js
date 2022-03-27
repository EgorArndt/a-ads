import { useState, useEffect, memo } from 'react'
import Head from 'next/head'
import useSWR from 'swr'
import { isEmpty } from 'lodash-es'

import { Google } from '../components/icons'
import { fetcher, financial } from '../utils'
import { blockchainApi, apiKeys } from '../constants/api'
import { stubbyTxt } from '../constants/stubbyTxt'
import styles from '../styles/modules/Home.module.scss'

// Some heavy Header
// For more complex layouts a .getLayout pattern can be introduced
const Header = memo(() => 
  <header className={styles.header}>
    <div className={styles.container}>
      <Google />
      <button className={styles.btn}>button</button>
    </div>
  </header>)

// Some heavy Section
const Section = memo(({ children }) => (
  <section className={styles.section}>
    <div className={styles.container}>
      {children}
    </div>
  </section>
), (p) => !p.children.some(child => child.key === apiKeys.usd))

const Home = () => {
  const [currency, setCurrency] = useState({})
  const { data } = useSWR(blockchainApi, fetcher, {refreshInterval: 60000})
  
  useEffect(() => {
    if (data) {
      let currency = {}
      data.forEach(cur => currency = {...currency, [cur.symbol]: cur['15m']})
      setCurrency(currency)
    }
  }, [data])

  return (
    <>
      <Head>
        <title>Test assignment</title>
        <meta name="description" content="Made as a test assignment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <Section>
          <h1>Lorem ipsum is simple &#128515;</h1>
          <p>{stubbyTxt}</p>
        </Section>
        <Section>
          <p>{stubbyTxt}</p><p>{stubbyTxt}</p>
        </Section>
        <Section>
          {[
            {title: "Hello, World", key: apiKeys.usd, txt: "I am safer than ruble"},
            {title: "Привет, мир", key: apiKeys.rub, txt: "Я обречен"},
            {title: "Hallo, Welt", key: apiKeys.eur, txt: "Ich bin sicherer als Rubel"},
          ].map(({title, key, txt}) => 
            <div key={key}>
              <p>{title}</p>
              <span className={!isEmpty(currency) ? styles.currency : ''}>
                {isEmpty(currency) ? 'Loading...' : financial(currency[key])}
              </span>
              <p>{txt}</p>
            </div>
          )}
        </Section>
      </main>
    </>
  )
}

export default Home
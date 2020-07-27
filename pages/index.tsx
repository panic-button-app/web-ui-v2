import Head from 'next/head'
import dynamic from 'next/dynamic'
import React from 'react'

// import Contacts from '../lib/contacts'
const Contacts = dynamic(
  () => import('../lib/contacts'),
  { ssr: false }
)

const Page = dynamic(
  () => import('../lib/page'),
  { ssr: false }
)

export default function Home (props) {
  return (
    <div className="container">
      <Head>
        <title>Panic Button</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Page>
        <h1>Hello world</h1>
        <Contacts />
      </Page>
    </div>
  )
}

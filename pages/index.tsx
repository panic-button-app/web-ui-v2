import Head from 'next/head'
import dynamic from 'next/dynamic'
import React from 'react'

const Page = dynamic(
  () => import('../lib/page'),
  { ssr: false }
)

export default function Home () {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Page>
        <h1>Hello world</h1>
      </Page>
    </div>
  )
}

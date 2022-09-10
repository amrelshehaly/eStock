import { GetStaticProps, NextPage } from 'next'
import { createOvermindSSR } from 'overmind'
import React from 'react'
import { storeConfig } from '@lib/store'
import Main from '@lib/components'

export const getStaticProps: GetStaticProps = async () => {
  const overmind = createOvermindSSR(storeConfig)

  await overmind.actions.base.onInitializeOvermind()

  return {
    props: { mutations: overmind.hydrate() },
  }
}

const IndexPage: NextPage = () => {
  return <Main />
}

export default IndexPage

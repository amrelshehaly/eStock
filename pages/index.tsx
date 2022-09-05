import { GetStaticProps, NextPage, GetServerSideProps } from 'next'
import { createOvermindSSR } from 'overmind'
import React from 'react'
import { storeConfig, useAppState, useActions } from '@lib/store'
import Main from '@lib/components'
import { state } from '@lib/store/state'

export const getStaticProps: GetStaticProps = async () => {
  const overmind = createOvermindSSR(storeConfig)

  await overmind.actions.base
    .onInitializeOvermind()
    .then((res) => {
      console.log('calling Initialize')
      overmind.state.stock.results = res.data.results
      overmind.state.stock.next_url = res.data.next_url
    })
    .catch((err) => {
      console.error('hena fel index')
    })

  // overmind.state.results = response.

  return {
    props: { mutations: overmind.hydrate() },
  }
}

const IndexPage: NextPage = () => {
  return <Main />
}

export default IndexPage

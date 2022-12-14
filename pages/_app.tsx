import React from 'react'
import App from 'next/app'
import { createOvermind, createOvermindSSR, rehydrate, Overmind } from 'overmind'
import { Provider } from 'overmind-react'
import { IAppContext, storeConfig } from '@lib/store'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'
import SplashScreen from '@lib/components/splash'

import theme from '../lib/styles/mui_theme'

class MyApp extends App {
  private readonly overmind: Overmind<typeof storeConfig>
  private disposeReaction: any

  constructor(props: any) {
    super(props)

    const mutations = props.pageProps.mutations || []

    if (typeof window !== 'undefined') {
      this.overmind = createOvermind(storeConfig, {
        devtools: true, // defaults to 'localhost:3031'
      })
      this.overmind.actions.base.changePage(mutations)
      if (window.Cypress) {
        window.overmind = this.overmind
        if (window.Cypress.setOvermind) {
          window.Cypress.setOvermind(this.overmind)
        }
      }
    } else {
      this.overmind = createOvermindSSR(storeConfig)
      rehydrate(this.overmind.state, mutations)
    }
  }


  componentWillUnmount() {
    this.disposeReaction()
  }

  componentDidUpdate() {
    this.overmind.actions.base.changePage(this.props.pageProps.mutations || [])
  }

  render() {
    const { Component } = this.props
    const { mutations, ...props } = this.props.pageProps

    return (
      <Provider value={this.overmind}>
        <MuiThemeProvider theme={theme}>
          <SplashScreen>
            <CssBaseline />
            <Component {...props} />
          </SplashScreen>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default MyApp

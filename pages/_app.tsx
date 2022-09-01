import React from "react";
import App from "next/app";
import {
  createOvermind,
  createOvermindSSR,
  rehydrate,
  Overmind,
} from "overmind";
import { Provider } from "overmind-react";
import { IAppContext, storeConfig } from "@lib/store";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";

import theme from "../lib/styles/mui_theme";

class MyApp extends App {
  private readonly overmind: Overmind<IAppContext>;
  private disposeReaction: any;

  constructor(props: any) {
    super(props);

    const mutations = props.pageProps.mutations || [];

    if (typeof window !== "undefined") {
      this.overmind = createOvermind(storeConfig,{
        devtools: true // defaults to 'localhost:3031'
      });
      this.overmind.actions.changePage(mutations);
    } else {
      this.overmind = createOvermindSSR(storeConfig);
      rehydrate(this.overmind.state, mutations);
    }
  }

  // componentDidMount() {
  //   this.disposeReaction = this.overmind.reaction(
  //     (state) => state.theme,
  //     () => this.forceUpdate()
  //   );
  // }

  componentWillUnmount() {
    this.disposeReaction();
  }

  componentDidUpdate() {
    this.overmind.actions.changePage(this.props.pageProps.mutations || []);
  }

  render() {
    const { Component } = this.props;
    const { mutations, ...props } = this.props.pageProps;

    return (
      <Provider value={this.overmind}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...props} />
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default MyApp;

import { GetStaticProps, NextPage } from "next";
import { createOvermindSSR } from "overmind";
import React from "react";
import { storeConfig } from "@lib/store";
import Home from "@lib/components/home/index";
import { state } from "@lib/store/base/state";

type Props = {};

export const getStaticProps: GetStaticProps = async () => {
  const overmind = createOvermindSSR(storeConfig);

  await overmind.actions.onInitializeOvermind().then((res) => {
    // console.log('the result',res.data.results)
    overmind.state.results = res.data.results;
    overmind.state.next_url = res.data.next_url;
  });

  // overmind.state.results = response.

  return {
    props: { mutations: overmind.hydrate() },
  };
};

const IndexPage: NextPage<Props> = () => {
  return <Home />;
};

export default IndexPage;

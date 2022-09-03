import { GetStaticProps, NextPage, GetServerSideProps } from "next";
import { createOvermindSSR } from "overmind";
import React from "react";
import { storeConfig, useAppState, useActions } from "@lib/store";
import Main from '@lib/components'
import { state } from "@lib/store/base/state";

type Props = {};

export const getStaticProps: GetStaticProps = async () => {
  const overmind = createOvermindSSR(storeConfig);

  await overmind.actions
    .onInitializeOvermind()
    .then((res) => {
      console.log("calling Initialize");
      overmind.state.results = res.data.results;
      overmind.state.next_url = res.data.next_url;
    })
    .catch((err) => {
      console.error("hena fel index");
    });

  // overmind.state.results = response.

  return {
    props: { mutations: overmind.hydrate() },
  };
};

const IndexPage: NextPage<Props> = () => {
  return <Main />
};

export default IndexPage;

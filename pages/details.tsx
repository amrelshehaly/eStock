import { GetStaticProps, NextPage } from "next";
import { createOvermindSSR } from "overmind";
import React from "react";
import { storeConfig } from "@lib/store";
import { Header } from "@lib/components/Header";
import StockDetails from '../lib/components/Stock_Details'

type Props = {};

// export const getStaticProps: GetStaticProps = async () => {
//   const overmind = createOvermindSSR(storeConfig);

//   return {
//     props: { mutations: overmind.hydrate() },
//   };
// };

const Details: NextPage<Props> = () => {
  return (
    <div>
      <StockDetails />
    </div>
  );
};

export default Details;

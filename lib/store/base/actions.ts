import { IAppContext } from "@lib/store";
import { rehydrate } from "overmind";
import { state, Stocks } from "./state"
import axios from 'axios'

export const onInitializeOvermind = async () => {
  /**
   * Use effects and other actions onInitialize
   */
  return await axios.get<Stocks>(`${process.env.GETALLSTOCK}`)

};

export const changePage = ({ state }: IAppContext, mutations: any) => {
  rehydrate(state, mutations || []);
};


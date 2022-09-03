import { IContext } from "overmind";
import { merge } from "overmind/config";
import {
  createActionsHook,
  createEffectsHook,
  createReactionHook,
  createStateHook,
} from "overmind-react";
import * as base from "./base";
import * as StockDetails from "./StockDetails"

export const storeConfig = merge(base, StockDetails,{});

export type IAppContext = IContext<typeof storeConfig>;

export const useAppState = createStateHook<IAppContext>();
export const useActions = createActionsHook<IAppContext>();
export const useEffects = createEffectsHook<IAppContext>();
export const useReaction = createReactionHook<IAppContext>();

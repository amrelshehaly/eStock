import { IContext } from 'overmind'
import { merge, namespaced } from 'overmind/config'
import { createActionsHook, createEffectsHook, createReactionHook, createStateHook } from 'overmind-react'
import { state } from './state'
import * as base from './base'
import * as StockDetails from './StockDetails'
import * as Stock from './Stock'

export const storeConfig = merge({ state }, namespaced({ base, StockDetails, Stock }))

export type IAppContext = IContext<typeof storeConfig>

export const useAppState = createStateHook<IAppContext>()
export const useActions = createActionsHook<IAppContext>()
export const useEffects = createEffectsHook<IAppContext>()
export const useReaction = createReactionHook<IAppContext>()

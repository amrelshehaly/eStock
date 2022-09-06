import React from 'react'
import { createOvermindMock } from 'overmind'
import { storeConfig } from '../../store/index'
import { promises } from 'stream'
import { Stock } from '@lib/models/stock.interface'

describe('base state', () => {
  const overmind = createOvermindMock(storeConfig, (state) => {
    state.base.error = 'This is an error msg'
  })
  it('check if reseting error msg', async () => {
    await overmind.actions.base.ResetErrorMsg()
    expect(overmind.state.base.error).toEqual('')
  })
})

describe('calling an api', () => {
  it('should get tickers list from the api', async () => {
    const overmind = createOvermindMock(storeConfig, {
      Stock: {
        api: {
          getTickers: async (): Promise<Stock> => {
            return await Promise.resolve({
              next_url: '',
              results: [
                {
                  name: 'AAPL',
                  ticker: 'Apple Inc.',
                },
              ],
            })
          },
        },
      },
    })

    await overmind.actions.base.onInitializeOvermind()

    expect(overmind.state.stock.results).toEqual([
      {
        name: 'AAPL',
        ticker: 'Apple Inc.',
      },
    ])
  })
})

describe('Searching for a ticker', () => {
  it('should have a an array with the ticker name if found', async () => {
    const overmind = createOvermindMock(
      storeConfig,
      {
        Stock: {
          api: {
            searchForTicker: async (ticker: string): Promise<Stock> => {
              return await Promise.resolve({
                next_url: '',
                results: [
                  {
                    ticker: 'AAPL',
                    name: 'Apple Inc.',
                  },
                ],
              })
            },
          },
        },
      },
      (state) => {
        state.base.search = 'AAPL'
      },
    )

    await overmind.actions.Stock.SearchForStock()

    expect(overmind.state.stock.results).toContainEqual(
      {
        ticker: 'AAPL',
        name: 'Apple Inc.',
      },
    )
  })
})



import React from 'react'
import { createOvermindMock } from 'overmind'
import {storeConfig} from '../../store/index'

describe('base state',()=>{
    const overmind = createOvermindMock(storeConfig, (state) => {
        state.base.error = ''
      })
      it('', ()=>{  
        expect(overmind.state.base.error).toEqual('')
      })    
})

describe('calling an api', () =>{

    it('should get tickers list from the api',async ()=>{
        const overmind = createOvermindMock(storeConfig)

          

          await overmind.actions.base.onInitializeOvermind()

          expect(overmind.state.stock).toEqual({
            
          })
    })
})
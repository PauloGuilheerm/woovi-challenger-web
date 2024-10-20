import { configureStore} from '@reduxjs/toolkit'

import type { Account } from '../../graphqlTypes';

import accountReducer from './account/accountSlice';
 
export type rootState = {
  account: Account
};


const store = configureStore({
  reducer: {
    account: accountReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
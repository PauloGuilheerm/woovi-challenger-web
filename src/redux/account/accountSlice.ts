import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { Account } from "../../../graphqlTypes";

export const initialAccountState : Account = {
  _id: "",
  balance: 0.0,
  name: "",
  email: '',
  password: ''
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialAccountState,
  reducers: {
    setAccount: (state, action: PayloadAction<Account>) => {
      state._id = action.payload._id;
      state.balance = action.payload.balance;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
  },
});

export const { setAccount } = accountSlice.actions;

export default accountSlice.reducer;

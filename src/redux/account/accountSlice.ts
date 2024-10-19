import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { Account } from "../../../graphqlTypes";

const initialState: Account = {
  _id: "",
  balance: 0.0,
  name: "",
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<Account>) => {
      state._id = action.payload._id;
      state.balance = action.payload.balance;
      state.name = action.payload.name;
    },
  },
});

export const { setAccount } = accountSlice.actions;

export default accountSlice.reducer;

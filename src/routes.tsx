import React, { useLayoutEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAccount } from "./redux/account/accountSlice";
import SignUp from "@Pages/SignUp";
import SignIn from "@Pages/SignIn";
import Account from "@Pages/Account";

import { getAccountById } from "./hooks/accountHooks";
import { getLocalStorage } from "./utils/localStorage";
import { accountStorageKey } from "./utils/enums";
import { Account as AccountType } from "../graphqlTypes";

type RenderComponentType = {
  hasData: boolean;
  Component: React.ComponentType;
};
const RenderComponent = ({ hasData, Component }: RenderComponentType) => {
  if (!hasData) {
    return <Component />;
  }

  return <Account />;
};
export default function AppRoutes() {
  const [hasStorageData, setHasStorageData] = useState<boolean>(false);

  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);

  useLayoutEffect(() => {
    const loadData = async () => {
      const data = getLocalStorage(accountStorageKey);
      const accountData: AccountType | null = data ? JSON.parse(data) : null;

      if (accountData) {
        const updatedData = await getAccountById(accountData._id);
        setHasStorageData(true);

        if(updatedData !== null){
          dispatch(setAccount(updatedData));
        }
        return;
      }

      setHasStorageData(false);
    };

    loadData();
  }, [account]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate to={hasStorageData ? "/account" : "signup"} replace />
          }
        />
        <Route
          path="/signin"
          element={
            <RenderComponent hasData={hasStorageData} Component={SignIn} />
          }
        />
        <Route
          path="/signup"
          element={
            <RenderComponent hasData={hasStorageData} Component={SignUp} />
          }
        />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  );
}

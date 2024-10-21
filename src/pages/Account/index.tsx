import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {initialAccountState, setAccount} from "../../redux/account/accountSlice";
import { rootState } from "../../redux/store";
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/ui";
import { removeLocalStorage } from "../../utils/localStorage";
import { accountStorageKey } from "../../utils/enums";

import Transfer from "./Transfer";
import Transfers from "./Transfers";

export default function Account() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleDialog = () => setIsOpen((prev: boolean) => !prev);
  const navigate = useNavigate();

  const account = useSelector((state : rootState) => state.account);
  
  const dispatch = useDispatch();

  const handleLogout = () => {
    navigate("/");
    dispatch(setAccount(initialAccountState));
    removeLocalStorage(accountStorageKey);
  };

  return (
    <div className="flex justify-center items-center min-h-screen max-h-16 bg-gray-100 space-x-4 pt-4 bg-gray-300"> 
      <Card className="flex-1 max-w-md shadow-lg h-[428px]" >
        <CardHeader className="text-black text-center bg-gray-100 border-b-2">
          <h2 className="text-2xl font-bold">Account Details</h2>
        </CardHeader>
        <CardContent className="p-6 space-y-4 bg-gray-100">
          <div>
            <label className="block text-lg font-medium">Name:</label>
            <p className="text-xl font-semibold capitalize">{account.name}</p>
          </div>
          <div>
            <label className="block text-lg font-medium">
              Available Balance:
            </label>
            <p className="text-2xl font-bold text-green-600">
              $ {account.balance.toFixed(2)}
            </p>
          </div>
        </CardContent>
        <CardFooter className="p-6 flex flex-col items-center space-y-4 bg-gray-100">
          <Dialog open={isOpen} onOpenChange={toggleDialog}>
            <DialogTrigger asChild>
              <Button className="w-full mt-4 bg-green-600">Make a Transfer</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Transfer Money</DialogTitle>
                <DialogDescription>
                  Here you can transfer money between accounts.
                </DialogDescription>
              </DialogHeader>
              <Transfer toggleDialog={toggleDialog} />
            </DialogContent>
          </Dialog>
          <Button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md"
          >
            Log Out
          </Button>
        </CardFooter>
      </Card>
      <Transfers />
    </div>
  );
}

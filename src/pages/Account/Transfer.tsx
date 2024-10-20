import { useState } from "react";
import { useSelector, useDispatch  } from "react-redux";

import { setAccount } from '../../redux/account/accountSlice';
import { handleTransferMoney } from "../../hooks/transferMoney";
import { transferMoneyType } from "../../hooks/transferMoneyTypes.type";
import { Input, Label, Button, DialogFooter } from "../../components/ui";
import { getAccountById } from "../../hooks/accountHooks";


const defaultData: transferMoneyType = {
  email: "",
  amount: "0.0",
};

type transferProps = {
  toggleDialog: ()=> void
}

export default function Transfer({ toggleDialog } : transferProps) {
  const [data, setData] = useState<transferMoneyType>(defaultData);
  const [error, setError] = useState("");

  const account = useSelector((state) => state.account);
  const dispatch = useDispatch();

  const handleChange = (field: string, value: string) => {
    setData((prev: transferMoneyType) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (data.email === "") {
      setError("Please fill in all the fields.");
      return;
    };

    if (parseFloat(data.amount) <= 0) {
      setError("Value must be greater than zero.");
      return;
    };

    const response = await handleTransferMoney(data, account);
    if(response !== null) {
      const updatedAccount = await getAccountById(account._id);
      
      if(updatedAccount !== null){
        dispatch(setAccount(updatedAccount));
        toggleDialog();
      }
    }
    
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Receiver email</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onKeyDown={handleKeyDown}
            required
          />
        </div>
        <div>
          <Label htmlFor="amount">Value</Label>
          <Input

            id="amount"
            type="number"
            value={data.amount}
            step="0.01"
            onChange={(e) => handleChange("amount", e.target.value)}
            onKeyDown={handleKeyDown}
            required
          />
        </div>
        <DialogFooter>
          <Button onClick={() => console.log("Transfer confirmed")}>
            Confirm Transfer
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}

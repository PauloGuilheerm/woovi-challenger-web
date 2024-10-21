import { useState } from "react";
import { useSelector, useDispatch  } from "react-redux";

import { setAccount } from '../../redux/account/accountSlice';
import { handleTransferMoney } from "../../hooks/transferMoney";
import { transferMoneyType } from "../../hooks/transferMoneyTypes.type";
import { Input, Label, Button, DialogFooter } from "../../components/ui";
import { getAccountById } from "../../hooks/accountHooks";
import { RootState } from "../../redux/store";
import LoadingSpinner from "../../components/loading";

const defaultData: transferMoneyType = {
  email: "",
  amount: "0.0",
};

type transferProps = {
  toggleDialog: ()=> void
}

export default function Transfer({ toggleDialog } : transferProps) {
  const [data, setData] = useState<transferMoneyType>(defaultData);
  const [error, setError] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);

  const account = useSelector((state : RootState ) => state.account);

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

    setSaving(true);

    const response = await handleTransferMoney(data, account);

    if(response !== null) {
      const updatedAccount = await getAccountById(account._id);
      
      if(updatedAccount !== null){
        dispatch(setAccount(updatedAccount));
        toggleDialog();
      }
    };

    setSaving(false);
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
          <Button className="bg-green-600" disabled={saving}>
            {saving ? 'Transfering...' : 'Confirm Transfer'}
            {saving ? <LoadingSpinner /> : null}
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}

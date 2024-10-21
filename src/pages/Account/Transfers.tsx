import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Card, CardHeader, CardContent } from "../../components/ui";
import { getTransfers } from "../../hooks/transferMoney";
import { transfer } from "../../hooks/transferMoneyTypes.type";
import { rootState } from "../../redux/store";
import LoadingSpinner from "../../components/loading";

export default function Transfers() {
  const [transfers, setTransfers] = useState<transfer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const account = useSelector((state : rootState) => state.account);

  useEffect(() => {
    if (account.email === "") return;

    const loadData = async () => {
      setLoading(true);

      const data: transfer[] | null = await getTransfers(account.email);
      if (data) {
        setTransfers(data);
      };

      setLoading(false);
    };

    loadData();
  }, [account.email, account.balance]);

  return (
    <div className="flex-1 max-w-md">
      <Card className="w-full shadow-lg">
        <CardHeader className="bg-gray-100 text-black text-center border-b-2">
          <h2 className="text-2xl font-bold">Transfers</h2>
        </CardHeader>
        <CardContent className="h-[345px] overflow-y-scroll bg-gray-100">
          {loading ? <LoadingSpinner className="mt-3"/> :
          transfers.length === 0 ? (
            <p className="text-center">No transfers available.</p>
          ) : (
            transfers.map((transfer) => (
              <Transfer key={transfer._id} transfer={transfer} />
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

type TransferProps = {
  transfer: transfer;
};

function Transfer({ transfer }: TransferProps) {
  return (
    <div className="space-y-4 py-3 border-b border-gray-400">
      <p>
        <strong>From:</strong> {transfer.fromEmail}
      </p>
      <p>
        <strong>To:</strong> {transfer.toEmail}
      </p>
      <p>
        <strong>Amount:</strong> $ {transfer.amount}
      </p>
    </div>
  );
}

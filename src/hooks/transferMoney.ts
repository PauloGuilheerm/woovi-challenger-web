
import client from '../../apolloClient';
import { TransferMoneyMutation } from '../service/mutation';
import { GetTransfers } from '../service/queries';
import { Account, TransferMoneyResponse } from '../../graphqlTypes';
import { toastGenerator } from "../utils/toastGenerator";

import { transferMoneyType, transfer } from './transferMoneyTypes.type';

export const handleTransferMoney = async (data : transferMoneyType, account : Account) : Promise<TransferMoneyResponse | null>=> {
    const response : TransferMoneyResponse =  await client.mutate({
        mutation: TransferMoneyMutation,
        variables: {
          fromEmail: account.email,
          toEmail: data.email,
          amount: parseFloat(data.amount),
        },
      }).then((res) => {
        if(!res.data.transferMoney.success){
          toastGenerator('error', res.data.transferMoney.message);
          return null;
        }
        toastGenerator('success', "Transfer completed successfully!");
        return res.data.transferMoney;
      }).catch((err) => {
        console.log(err);
        toastGenerator('error', "There was an error trying to log in. Please try again.");
        return null;
      });

      return response;
};

export const getTransfers = async (email: string) : Promise<transfer[] | null> => {
  const response : transfer[] | null =  await client.query({
    query: GetTransfers,
    variables: { email },
    fetchPolicy: 'no-cache',
  }).then((res) => {
    return res.data.getTransfersByEmail;
  }).catch((err) => {
    console.log(err);
    toastGenerator('error', "There was an error trying to transfers. Please try again.");
    return null;
  });

  return response;
}
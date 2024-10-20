import { toastGenerator } from '../utils/toastGenerator';
import { Account } from '../../graphqlTypes';
import client from '../../apolloClient';

import { GetAccountQuery, GetAccountByIdQuery } from '../service/queries';
import { CreateAccountMutation } from '../service/mutation';

import { getAccountType, createAccountType } from './accounHooksTypes.type';

export const getAccountById = async (id : string) : Promise<Account | null > => {
  const account : Account | null = await client
  .query({
    query: GetAccountByIdQuery,
    variables: { id },
    fetchPolicy: 'no-cache'
  })
  .then((res) => {
    if (!res.data.getAccountById.success) {
      toastGenerator("error", res.data.getAccountById.message);
      return null;
    }
    return res.data.getAccountById;
  })
  .catch((err) => {
    console.log(err);
    toastGenerator(
      "error",
      "There was an error trying to log in. Please try again."
    );
    return null;
  });

  return account;
};

export const getAccount = async (data : getAccountType) : Promise<Account | null> => {
  const account : Account | null = await client
    .query({
      query: GetAccountQuery,
      variables: data,
    })
    .then((res) => {
      if (!res.data.getAccount.success) {
        toastGenerator("error", res.data.getAccount.message);
        return null;
      }
      toastGenerator("success", "Login successful! Welcome back!");
      return res.data.getAccount;
    })
    .catch((err) => {
      console.log(err);
      toastGenerator(
        "error",
        "There was an error trying to log in. Please try again."
      );
      return null;
    });

    return account;
};

export const createAccount = async (data : createAccountType) : Promise<Account | null> => {
  const account : Account | null = await client.mutate({
    mutation: CreateAccountMutation,
    variables: data, 
  }).then((res) => {
    toastGenerator(res.data.createAccount.success ? 'success' : 'error', res.data.createAccount.message)
    return res.data.createAccount.success ? res.data.account : null;
  }).catch((err) => {
    toastGenerator('error', err.message);
    return null;
  });

  return account;
}

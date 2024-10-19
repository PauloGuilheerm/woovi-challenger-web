import { gql } from '@apollo/client';

export const GetAccountQuery = gql`
  query GetAccountQuery($accountowner: String!) {
    account(accountowner: $accountowner) {
      _id
      name
      balance
      success
      message
    }
  }
`;

export const GetAccountBalanceQuery = gql`
  query GetAccountBalanceQuery($id: String!) {
    getAccountBalance(id: $id) {
      success
      message
      data
    }
  }
`;

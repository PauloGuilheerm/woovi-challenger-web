import { gql } from '@apollo/client';


export const GetTransfers = gql`
  query getTransfersByEmail($email: String) {
    getTransfersByEmail(email: $email) {
      fromEmail
      toEmail
      amount
    }
  }
`;


export const GetAccountByIdQuery = gql`
  query getAccountById($id: String) {
    getAccountById(id: $id) {
      message
      success
      _id
      name
      email
      balance
    }
  }
`;

export const GetAccountQuery = gql`
  query GetAccountQuery($email: String, $password: String) {
    getAccount(email: $email, password: $password) {
      _id
      name
      balance
      success
      message
      email
    }
  }
`;

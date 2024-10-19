import { gql } from '@apollo/client';

export const CreateAccountMutation = gql`
  mutation CreateAccountMutation($name: String!, $password: String!, $email: String!) {
    createAccount(name: $name, email: $email, password: $password) {
      message
      success
    }
  }
`;

export const TransferMoneyMutation = gql`
  mutation TransferMoneyMutation($fromId: ID!, $toId: ID!, $amount: Float!) {
    transferMoney(fromId: $fromId, toId: $toId, amount: $amount) {
      success
      message
    }
  }
`;

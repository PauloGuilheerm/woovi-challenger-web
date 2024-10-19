import { gql } from '@apollo/client';

export const CreateAccountMutation = gql`
  mutation CreateAccountMutation($name: String!) {
    createAccount(name: $name) {
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

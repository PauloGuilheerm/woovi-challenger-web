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
  mutation TransferMoneyMutation($fromEmail: String!, $toEmail: String!, $amount: Float!) {
    transferMoney(fromEmail: $fromEmail, toEmail: $toEmail, amount: $amount) {
      success
      message
    }
  }
`;
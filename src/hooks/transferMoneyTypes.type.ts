export type transferMoneyType = {
    email: string;
    amount: string;
};

export type transfer = {
  _id: string;
  fromEmail: string;
  toEmail: string;
  amount: number;
}
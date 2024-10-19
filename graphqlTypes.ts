export type Account = {
    _id: string;
    name: string;
    balance: number;
    password: string;
    email: string;
  };
  
  export type TransferMoneyResponse = {
    success: boolean;
    message: string;
  };
  
  export type AccountBalanceResponse = {
    success: boolean;
    message: string;
    data: number;
  };
  
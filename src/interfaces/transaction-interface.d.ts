import { IBackendAccount } from './bank-account-interface';

export interface IBackendTransaction {
  transactions: [
    {
      uid: number;
      amount: number;
      senderAccountNo: string;
      traxId: number;
      traxType: string;
      receiverAccountNo: string;
      reciever: IBackendAccount;
      sender: IBackendAccount;
      transactionDate: number;
    }
  ];
}

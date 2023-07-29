import { IBackendAccount } from './bank-account-interface';

export interface IBackendTransaction {
  filter: number;
  transactions: [
    {
      uid: number;
      amount: number;
      senderAccountInfo: IBackendAccount;
      senderAccountNo: string;
      traxId: number;
      traxType: string;
      receiverAccountInfo: IBackendAccount;
      receiverAccountNo: string;
      reciever: IBackendAccount;
      sender: IBackendAccount;
      transactionDate: number;
    }
  ];
}

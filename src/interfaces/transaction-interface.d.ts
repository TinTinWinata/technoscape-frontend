export interface IBackendTransaction {
  transactions: [
    {
      uid: number;
      amount: number;
      senderAccountNo: string;
      traxId: number;
      traxType: string;
      receiverAccountNo: string;
      transactionDate: number;
    }
  ];
}
import { manipulateDate, manipulateMoney } from '../utils/string-manipulation';

interface ITransactionHistoryProps {
  amount: number;
  createTime: number;
  accountNo: string;
  traxType: string;
  receiverNo: string;
}

enum TransferType {
  transferIn = 'Transfer In',
  transferOut = 'Transfer Out',
}

export function TransactoinHistory({
  amount,
  createTime,
  accountNo,
  traxType,
  receiverNo,
}: ITransactionHistoryProps) {
  return (
    <div className="mt-4 p-8 shadow-lg rounded-lg bg-orange-200 bg-opacity-10 ">
      <p className="font-bold">{traxType}</p>
      <div className="flex flex-row justify-between">
        <div>
          <p>{accountNo}</p>
          <p className="text-gray-400">{receiverNo}</p>
        </div>
        <div>
          {traxType === TransferType.transferIn ? (
            <p className="text-green-600 font-bold text-xl">
              {manipulateMoney(amount)}
            </p>
          ) : (
            <p className="text-red-600 font-bold text-xl">
              {manipulateMoney(amount)}
            </p>
          )}

          <p className="text-gray-400 font-bold">
            {manipulateDate(createTime)}
          </p>
        </div>
      </div>
    </div>
  );
}

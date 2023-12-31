import { useState } from 'react';
import { useUserAuth } from '../../hooks/user-context';
import HomeFilterIcon from './home-filter-icon';

const allFilters = ['Semua', 'Masuk', 'Keluar'];

interface IHomeFilterProps {
  defaultValue?: number;
}

export default function HomeFilter({ defaultValue = 0 }: IHomeFilterProps) {
  const { fetchTransaction } = useUserAuth();
  const [filter, setFilter] = useState<number>(defaultValue);
  const handleClick = (index: number) => {
    console.log(filter, index);
    if (filter !== index && index === 0) {
      fetchTransaction(undefined, undefined);
    }
    if (filter !== index && index === 1) {
      fetchTransaction(undefined, 'TRANSFER_IN');
    }
    if (filter !== index && index === 2) {
      fetchTransaction(undefined, 'TRANSFER_OUT');
    }
    setFilter(index);
  };
  return (
    <div className="flex gap-2">
      {allFilters.map((name: string, index: number) => (
        <HomeFilterIcon
          onClick={() => handleClick(index)}
          active={index === filter}
          key={index}
        >
          {name}
        </HomeFilterIcon>
      ))}
    </div>
  );
}

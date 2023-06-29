import { useState, useEffect } from 'react';

export interface HasId {
  id: string;
}

export const useExcludedList = <T extends HasId>( 
  list: T[],
  excludedIds: string[],
 ): T[] => {
  const [excludedList, setExcludedList] = useState<T[]>(list);

  useEffect(() => {
    const filteredList = list.filter(option => !excludedIds.includes(option.id));
    setExcludedList(filteredList);
  }, [list, excludedIds]);

  return excludedList;
}
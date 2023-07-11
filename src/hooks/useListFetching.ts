import { useState } from 'react';
import { collection, getDocs, DocumentData } from 'firebase/firestore';
import { PayloadAction } from '@reduxjs/toolkit';
import { database } from '../firebase';

import { IUseListFetchingResult } from '../types/useListFetchingResult';
import { useAppDispatch } from '../hooks/reduxHook';

export const useListFetching = <T>(
  setAction: (data: T[]) => PayloadAction<T[]>,
  path: string
): IUseListFetchingResult => {
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const fetchData = async (): Promise<void> => {
    setIsFetching(true);
    const db = database;
    try {
      const querySnapshot = await getDocs(collection(db, path));
      const data: DocumentData[] = querySnapshot.docs.map((doc) => doc.data());
      const typedData: T[] = data as T[];
      if (data && data.length) {
        dispatch(setAction(typedData));
      } else {
        dispatch(setAction([]));
      }
    } catch (error) {
      dispatch(setAction([]));
    }
    setIsFetching(false);
  };

  return {
    fetchData,
    isFetching
  };
};

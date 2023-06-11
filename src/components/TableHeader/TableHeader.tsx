import { ReactNode } from 'react';

import styles from './TableHeader.module.sass';

interface ITableHeader {
  children: ReactNode,
}

const TableHeader: React.FC<ITableHeader> = ({ children }) => {
  return (
    <div className={styles['table-header']}>
      { children }
    </div>
  )
};

export { TableHeader };
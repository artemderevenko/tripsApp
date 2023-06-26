import { ReactNode } from 'react';

import styles from './TableHeader.module.sass';

interface ITableHeaderProps {
  children: ReactNode,
}

const TableHeader: React.FC<ITableHeaderProps> = ({ children }) => {
  return (
    <div className={styles['table-header']}>
      { children }
    </div>
  )
};

export { TableHeader };
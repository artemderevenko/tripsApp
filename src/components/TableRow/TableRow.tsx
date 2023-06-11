import { ReactNode } from 'react';

import styles from './TableRow.module.sass';

interface ITableRow {
  children: ReactNode,
}

const TableRow: React.FC<ITableRow> = ({ children }) => {
  return (
    <div className={styles['table-row']}>
      { children }
    </div>
  )
};

export { TableRow };
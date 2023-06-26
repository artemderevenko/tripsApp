import { ReactNode, useState } from 'react';

import styles from './TableRow.module.sass';
import { TableRowOptions } from '../TableRowOptions';
import { ITableRowOption } from '../../types/tableRowOptions';

interface ITableRowProps {
  children: ReactNode,
  optionsList?: ITableRowOption[] | [],
}

const TableRow: React.FC<ITableRowProps> = ({ children, optionsList }) => {
  const [isVisibleOptions, setIsVisibleOptions] = useState<boolean>(false);

  return (
    <div
      className={styles['table-row']}
      onMouseEnter={() => setIsVisibleOptions(true)}
      onMouseLeave={() => setIsVisibleOptions(false)}
    >
      {children}
      {
        optionsList && optionsList.length ?
          <TableRowOptions visible={isVisibleOptions} optionsList={optionsList} /> : null
      }
    </div>
  )
};

export { TableRow };
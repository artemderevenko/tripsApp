import { ReactNode, useState } from 'react';

import styles from './TableRow.module.sass';
import { TableRowOptions } from '../TableRowOptions';

interface IOptionItem {
  label: string,
  className?: string,
  onClick: () => void,
}

interface ITableRow {
  children: ReactNode,
  optionsList?: IOptionItem[] | [],
}

const TableRow: React.FC<ITableRow> = ({ children, optionsList }) => {
  const [isVisibleOptions, setIsVisibleOptions] = useState<boolean>(false);

  return (
    <div
      className={styles['table-row']}
      onMouseEnter={() => setIsVisibleOptions(true)}
      onMouseLeave={() => setIsVisibleOptions(false)}
    >
      {children}
      {
        optionsList ?
          <TableRowOptions visible={isVisibleOptions} optionsList={optionsList} /> : null
      }
    </div>
  )
};

export { TableRow };
import { ReactNode } from 'react';

import styles from './Table.module.sass';
import { TableHeader } from '../TableHeader';
import { TableRow } from '../TableRow';
import headerStyles from '../TableHeader/TableHeader.module.sass';
import rowStyles from '../TableRow/TableRow.module.sass';
import { NoResults } from '../NoResults';
import { PageLoader } from '../PageLoader';
import { ITableFields } from '../../types/tableFields';
import { ITableRowOption } from '../../types/tableRowOptions';

interface IDataProps {
  id: string;
  [key: string]: any;
}

interface ITableProps {
  tableFields: ITableFields[];
  isFetching?: boolean;
  textNoSearch: string | ReactNode;
  data: IDataProps[];
  optionsList?: (data: IDataProps) => ITableRowOption[];
  className?: string;
}

const Table: React.FC<ITableProps> = ({
  tableFields,
  isFetching,
  textNoSearch,
  data,
  optionsList,
  className,
}) => {

  return (
    <div className={styles.loader}>
      {
        isFetching ? <PageLoader /> : null
      }
      {
        !isFetching && (!data || !data.length) ? <NoResults text={textNoSearch} /> : null
      }
      {
        !isFetching && data && data.length && tableFields && tableFields.length ?
          <>
            <TableHeader>
              {
                tableFields.map(field => (
                  <div
                    key={field.value}
                    className={headerStyles[`${className}-${field.value}`]}
                  >
                    {field.label}
                  </div>
                ))
              }
            </TableHeader>
            {
              data.map((data: IDataProps): ReactNode => (
                <TableRow
                  key={data.id}
                  optionsList={optionsList ? optionsList(data) : []}
                >
                  {
                    tableFields.map((field): ReactNode => (
                      <div
                        key={field.value}
                        className={`${rowStyles[`${className}-${field.value}`]} ${rowStyles['row-item']}`}
                      >
                        <div
                          className={rowStyles['field-value']}
                        >
                          {data[field.dataField] || data[field.dataField] === 0 ? data[field.dataField] : '-'}
                        </div>
                      </div>))
                  }
                </TableRow>
              ))
            }
          </> : null
      }
    </div>
  )
};

export { Table };
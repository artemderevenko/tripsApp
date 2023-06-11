import { ReactNode } from 'react';

import { PageHeader } from '../components/PageHeader';
// import { SearchField } from '../components/SearchField';
import { CLIENTS_TABLE_FIELDS as tableFields } from '../constants/clientsTableFields';
import { IPerson } from '../types/person';
import { TableHeader } from '../components/TableHeader';
import { TableRow } from '../components/TableRow';
import headerStyles from '../components/TableHeader/TableHeader.module.sass';
import rowStyles from '../components/TableRow/TableRow.module.sass';

const rowData: IPerson[] = [
  {
    firstName: 'Ivanov',
    name: 'Ivan',
    surname: 'Ivanovich',
    birth: '22-12-2000',
    sex: 'M',
    passport: 'BC 125487',
  },
  {
    firstName: 'Petrowa',
    name: 'Mariya',
    surname: 'Ivanovna',
    birth: '22-12-2000',
    sex: 'F',
    passport: 'BC 125487',
  },
  {
    firstName: 'Sidorov',
    name: 'Stepan',
    surname: 'Ivanovich',
    birth: '22-12-2000',
    sex: 'M',
    passport: 'BC 125487',
  },
  {
    firstName: 'Ivanov',
    name: 'Ivan',
    surname: 'Ivanovich',
    birth: '22-12-2000',
    sex: 'M',
    passport: 'BC 125487',
  },
  {
    firstName: 'Petrowa',
    name: 'Mariya',
    surname: 'Ivanovna',
    birth: '22-12-2000',
    sex: 'F',
    passport: 'BC 125487',
  },
  {
    firstName: 'Sidorov',
    name: 'Stepan',
    surname: 'Ivanovich',
    birth: '22-12-2000',
    sex: 'M',
    passport: 'BC 125487',
  },
]

const Clients: React.FC = () => {
  return (
    <>
      <PageHeader align={'right'}>
        SearchField
      </PageHeader>
      <>
        <TableHeader>
          {
            tableFields && tableFields.length ?
              tableFields.map(field => (
                <div
                  key={field.value}
                  className={headerStyles[`clients-${field.value}`]}
                >
                  {field.label}
                </div>
              )) : null
          }
        </TableHeader>
        {
          tableFields && tableFields.length && rowData && rowData.length ?
            rowData.map((data: IPerson): ReactNode => (
              <TableRow key={data.passport}>
                {
                  tableFields.map((field): ReactNode => (
                    <div
                      key={field.value}
                      className={rowStyles[`clients-${field.value}`]}
                    >
                      {data[field.dataField]}
                    </div>))
                }
              </TableRow>
            )) : null
        }
      </>
    </>
  )
};

export default Clients;
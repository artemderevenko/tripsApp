import styles from './TableDaysPagination.module.sass';
import { Pagination } from '../Pagination';

interface ITableDaysPagination {
  clickPrev: () => void,
  clickNext: () => void,
  tableTitle: string,
  backToToday: () => void,
}

const TableDaysPagination: React.FC<ITableDaysPagination> = ({ clickPrev, clickNext, tableTitle, backToToday }) => {
  return (
    <div className={styles['table-days-pagination']}>
      <div className={styles['today-button']} onClick={backToToday}>Today</div>
      <Pagination
        clickPrev={clickPrev}
        clickNext={clickNext}
      />
      <div className={styles['table-title']}>{tableTitle}</div>
    </div>
  )
};

export { TableDaysPagination };
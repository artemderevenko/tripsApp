import styles from './ScheduleDaysPagination.module.sass';
import { Pagination } from '../Pagination';

interface IScheduleDaysPagination {
  clickPrev: () => void,
  clickNext: () => void,
  scheduleTitle: string,
  backToToday: () => void,
}

const ScheduleDaysPagination: React.FC<IScheduleDaysPagination> = ({ clickPrev, clickNext, scheduleTitle, backToToday }) => {
  return (
    <div className={styles['schedule-days-pagination']}>
      <div className={styles['today-button']} onClick={backToToday}>Today</div>
      <Pagination
        clickPrev={clickPrev}
        clickNext={clickNext}
      />
      <div className={styles['schedule-title']}>{scheduleTitle}</div>
    </div>
  )
};

export { ScheduleDaysPagination };
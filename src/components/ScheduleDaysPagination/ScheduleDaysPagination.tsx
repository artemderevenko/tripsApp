import styles from './ScheduleDaysPagination.module.sass';
import { Pagination } from '../Pagination';

interface IScheduleDaysPagination {
  handlePrev: () => void,
  handleNext: () => void,
  scheduleTitle: string,
  backToToday: () => void,
}

const ScheduleDaysPagination: React.FC<IScheduleDaysPagination> = ({ handlePrev, handleNext, scheduleTitle, backToToday }) => {
  return (
    <div className={styles['schedule-days-pagination']}>
      <div className={styles['today-button']} onClick={backToToday}>Today</div>
      <Pagination
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
      <div className={styles['schedule-title']}>{scheduleTitle}</div>
    </div>
  )
};

export { ScheduleDaysPagination };
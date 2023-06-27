import styles from './ScheduleDaysPagination.module.sass';
import { Pagination } from '../Pagination';
import { CustomButton } from '../CustomButton';

interface IScheduleDaysPaginationProps {
  handlePrev: () => void;
  handleNext: () => void;
  scheduleTitle: string;
  backToToday: () => void;
}

const ScheduleDaysPagination: React.FC<IScheduleDaysPaginationProps> = ({ handlePrev, handleNext, scheduleTitle, backToToday }) => {
  return (
    <div className={styles['schedule-days-pagination']}>
      <div className={styles['today-button']}>
      <CustomButton
        onClick={backToToday}
        buttonText={'Today'}
        type={'confirm'}
      />
      </div>
      <Pagination
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
      <div className={styles['schedule-title']}>{scheduleTitle}</div>
    </div>
  )
};

export { ScheduleDaysPagination };
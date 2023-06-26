import { ReactNode } from 'react';
import styles from './NoResults.module.sass';

interface INoResultsProps {
  text: ReactNode | string,
}

const NoResults: React.FC<INoResultsProps> = ({ text }) => {
  return (
    <div className={styles['no-results-wrap']}>
      <div className={styles['no-results']}>
        <div className={styles['icon']}>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000">
            <g>
              <path d="M979.7,929.8L782.3,732.4c-1.3-1.3-2.9-1.8-4.2-2.8c65-76.2,104.4-174.8,104.4-282.8c0-240.9-195.3-436.3-436.3-436.3S10,205.9,10,446.8c0,38.5,5.5,75.6,14.8,111.1C36.1,540.7,65.4,500,83,492.4c-1.9-15-3.1-30.1-3.1-45.6c0-202.4,164.1-366.5,366.5-366.5c202.4,0,366.5,164.1,366.5,366.5c0,159-101.5,294.1-243.1,344.8c-6.7,28.7-17.6,56.1-32.5,81.6c72.6-15.5,138.6-48.8,193-95.5c1,1.3,1.6,2.9,2.8,4.2l197.4,197.3c13.6,13.7,35.7,13.7,49.3,0C993.4,965.6,993.4,943.5,979.7,929.8L979.7,929.8z M465.1,534.2c-50.2-50.2-117.1-77.9-188.2-77.9c-71.1,0-137.9,27.7-188.2,77.9c-50.3,50.3-78,117.1-78,188.2c0,71.1,27.7,137.9,78,188.2c50.3,50.3,117.1,78,188.2,78c0,0,0,0,0,0c71.1,0,137.9-27.7,188.2-78c50.2-50.2,77.9-117.1,77.9-188.2C543,651.3,515.3,584.5,465.1,534.2z M415.7,861.2c-37.1,37.1-86.4,57.5-138.8,57.5l0,0c-52.4,0-101.8-20.4-138.8-57.5c-37.1-37.1-57.5-86.4-57.5-138.8c0-52.4,20.4-101.8,57.5-138.8c37.1-37.1,86.4-57.5,138.8-57.5c52.4,0,101.8,20.4,138.8,57.5c37.1,37.1,57.5,86.4,57.5,138.8C473.2,774.8,452.8,824.1,415.7,861.2z M399.2,600c-13.6-13.6-35.7-13.6-49.3,0l-73,73l-73-73c-13.6-13.6-35.7-13.6-49.3,0c-13.6,13.6-13.6,35.7,0,49.3l73,73l-73,73c-13.6,13.6-13.6,35.7,0,49.3c6.8,6.8,15.7,10.2,24.7,10.2c8.9,0,17.9-3.4,24.7-10.2l73-73l73,73c6.8,6.8,15.7,10.2,24.7,10.2c8.9,0,17.9-3.4,24.7-10.2c13.6-13.6,13.6-35.7,0-49.3l-73-73l73-73C412.8,635.8,412.8,613.7,399.2,600L399.2,600z" />
            </g>
          </svg>
        </div>
        <div className={styles['text']}>
          {text}
        </div>
      </div>
    </div>
  )
};

export { NoResults };
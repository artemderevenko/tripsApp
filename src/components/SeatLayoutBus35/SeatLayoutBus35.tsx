import { useState, useEffect } from 'react';
import styles from './SeatLayoutBus35.module.sass';

const SeatLayoutBus35: React.FC = () => {
  const [fadeAnimation, setFadeAnimation] = useState<boolean>(true);

  useEffect(() => {
    setFadeAnimation(true);

    setTimeout(() => {
      setFadeAnimation(false)
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const seatsList = Array.from({ length: 35 }, (_, index) => index + 1);

  return (
    <div className={`${styles['bus-35']} ${fadeAnimation ? styles['fade'] : ''} `}>
      <div className={styles['seats-wrap']}>
        {
          seatsList.map(seat => (
            <div
              key={`bus-35-${seat}`}
              className={`${styles['seat']} ${styles[`seat-${seat}`]}`}
            >
              {seat}
            </div>
          ))
        }
      </div>
    </div>
  )
};

export { SeatLayoutBus35 };
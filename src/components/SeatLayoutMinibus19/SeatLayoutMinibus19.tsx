import { useState, useEffect } from 'react';

import styles from './SeatLayoutMinibus19.module.sass';

const SeatLayoutMinibus19: React.FC = () => {
  const [fadeAnimation, setFadeAnimation] = useState<boolean>(true);

  useEffect(() => {
    setFadeAnimation(true);

    setTimeout(() => {
      setFadeAnimation(false)
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const seatsList = Array.from({ length: 19 }, (_, index) => index + 1);

  return (
    <div className={`${styles['minibus-19']} ${fadeAnimation ? styles['fade'] : ''} `}>
      <div className={styles['seats-wrap']}>
        {
          seatsList.map(seat => (
            <div
              key={`minibus-19-${seat}`}
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

export { SeatLayoutMinibus19 };
import { useEffect, useState } from 'react';

import styles from './Notification.module.sass';

interface INotification {
  message: string,
  type: string,
  afterHide: () => void,
}

const Notification: React.FC<INotification> = ({ message, type, afterHide }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      afterHide();
      setIsVisible(false);
    }, 3950);

    return () => {
      clearTimeout(timer);
    };
  }, []);


  if (!isVisible) {
    return null;
  }

  return (
    <div className={`${styles['notification']} ${styles[type]}`}>
      {message}
    </div>
  );
};

export { Notification };
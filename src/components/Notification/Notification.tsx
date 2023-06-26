import { useEffect, useState } from 'react';

import styles from './Notification.module.sass';

interface INotificationProps {
  message: string,
  type: string,
  afterHide: () => void,
}

const Notification: React.FC<INotificationProps> = ({ message, type, afterHide }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      afterHide();
      setIsVisible(false);
    }, 3950);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
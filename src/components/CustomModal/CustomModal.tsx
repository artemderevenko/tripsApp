import { ReactNode, useEffect } from 'react';

import styles from './CustomModal.module.sass';
import { CustomButton } from '../CustomButton';

interface IButtonsList {
  onButtonClick: () => void;
  buttonText: string;
  type: string;
}

interface ICustomModalProps {
  title: string;
  onClose: () => void;
  buttonsList?: IButtonsList[] | [];
  children: ReactNode;
}

const CustomModal: React.FC<ICustomModalProps> = ({ title, onClose, buttonsList, children }) => {

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderButtonsList = () => {
    return (<div className={styles['buttons']}>
      {
        buttonsList && buttonsList.length ?
          buttonsList.map(button => (
            <div key={button.buttonText} className={styles['button-item']}>
              <CustomButton
                onClick={button.onButtonClick}
                buttonText={button.buttonText}
                type={button.type}
              />
            </div>
          )) : null
      }
    </div>)
  }

  return (
    <div className={styles['custom-modal-wrap']}>
      <div className={styles['custom-modal']}>
        <div className={styles['header']}>
          <div className={styles['title']}>
            {title}
          </div>
          <div className={styles['close']} onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
              <path d="M 38.982422 6.9707031 A 2.0002 2.0002 0 0 0 37.585938 7.5859375 L 24 21.171875 L 10.414062 7.5859375 A 2.0002 2.0002 0 0 0 8.9785156 6.9804688 A 2.0002 2.0002 0 0 0 7.5859375 10.414062 L 21.171875 24 L 7.5859375 37.585938 A 2.0002 2.0002 0 1 0 10.414062 40.414062 L 24 26.828125 L 37.585938 40.414062 A 2.0002 2.0002 0 1 0 40.414062 37.585938 L 26.828125 24 L 40.414062 10.414062 A 2.0002 2.0002 0 0 0 38.982422 6.9707031 z" />
            </svg>
          </div>
        </div>
        <div className={styles['content']}>
          {children}
        </div>
        {buttonsList && buttonsList.length ? renderButtonsList() : null}
      </div>
    </div>
  )
};

export { CustomModal };
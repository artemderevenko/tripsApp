import { ReactNode } from 'react';

import styles from './CustomButton.module.sass';

interface ICustomButton {
  buttonText: string,
  onClick: () => void,
  type: string,
  className?: string | null,
  disable?: boolean,
  icon?: ReactNode,
}

const CustomButton: React.FC<ICustomButton> = ({ buttonText, onClick, className, type = 'confirm', disable, icon }) => {
  return (
    <button
      className={`${styles['custom-button']} ${className || ''} ${styles[type]} ${disable ? styles['disable'] : ''}`}
      onClick={onClick}
    >
      {
        icon ?
          <div className={styles['icon']}>
            {icon}
          </div> : null
      }
      {buttonText}
    </button>
  )
};

export { CustomButton };
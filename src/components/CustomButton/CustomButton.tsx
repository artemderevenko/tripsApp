import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './CustomButton.module.sass';

interface ICustomButtonProps {
  buttonText: string;
  onClick: () => void;
  type: string;
  className?: string | null;
  disable?: boolean;
  icon?: ReactNode;
  linkPath?: string;
}

const CustomButton: React.FC<ICustomButtonProps> = ({ buttonText, onClick, className, type = 'confirm', disable, icon, linkPath }) => {
  return (
    linkPath ?

      <NavLink
        to={linkPath}
        className={`${styles['custom-button']} ${className || ''} ${styles[type]} ${disable ? styles['disable'] : ''}`}
      >
        {
          icon ?
            <div className={styles['icon']}>
              {icon}
            </div> : null
        }
        {buttonText}
      </NavLink> :

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
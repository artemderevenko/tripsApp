import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './MenuItem.module.sass';

const setActive = ({ isActive = false }) => {
  return isActive ? [styles['active-menu-link'], styles['menu-link']].join(' ') : styles['menu-link']
}

interface IMenuItemProps {
  children: ReactNode,
  to: string
}

const MenuItem: React.FC<IMenuItemProps> = ({ children, to }) => {
  return (
    <div className={styles['menu-item']}>
      <NavLink
        to={to}
        className={setActive}
      >
        {children}
      </NavLink>
    </div>
  )
};

export { MenuItem };
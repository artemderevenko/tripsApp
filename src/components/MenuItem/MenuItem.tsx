import { ReactNode } from 'react';
import { NavLink, useMatch } from 'react-router-dom';

import styles from './MenuItem.module.sass';

interface IMenuItemProps {
  children: ReactNode,
  to: string
}

const MenuItem: React.FC<IMenuItemProps> = ({ children, to }) => {
  const match = useMatch(to);

  const setActive = () => {
    return match ? [styles['active-menu-link'], styles['menu-link']].join(' ') : styles['menu-link']
  }

  return (
    <div className={styles['menu-item']}>
      <NavLink
        to={to}
        className={setActive()}
      >
        {children}
      </NavLink>
    </div>
  )
};

export { MenuItem };
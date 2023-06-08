import { MENU as menu } from '../../constants/menu';
import { MenuItem } from '../MenuItem';

import styles from './Sitebar.module.sass';

const Sitebar: React.FC = () => {
  return (
    <div className={styles.sitebar}>
      <div className={styles.menu}>
        {
          menu && menu.length ?
            menu.map(item => (<MenuItem key={item.id} to={`/${item.to}`}>
              <div className={styles['menu-wrap']}>
                {item.icon}
                <div className={styles['menu-title']}>{item.title}</div>
              </div>
            </MenuItem>)) : null
        }
      </div>
    </div>
  )
};

export { Sitebar };
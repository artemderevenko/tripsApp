import { ReactNode } from 'react';

import styles from './PageTitle.module.sass';

interface IPageTitle {
  children: ReactNode,
};

const PageTitle: React.FC<IPageTitle> = ({ children }) => {
  return (
    <div className={styles['page-title']}>
      {children}
    </div>
  )
};

export { PageTitle };
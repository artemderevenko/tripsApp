import { ReactNode } from 'react';

import styles from './PageTitle.module.sass';

interface IPageTitleProps {
  children: ReactNode;
};

const PageTitle: React.FC<IPageTitleProps> = ({ children }) => {
  return (
    <div className={styles['page-title']}>
      {children}
    </div>
  )
};

export { PageTitle };
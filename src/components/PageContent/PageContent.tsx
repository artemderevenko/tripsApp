import { ReactNode } from 'react';

import styles from './PageContent.module.sass';

interface IPageContentProps {
  children: ReactNode;
};

const PageContent: React.FC<IPageContentProps> = ({ children }) => {
  return (
    <div className={styles['page-content']}>
      {children}
    </div>
  )
};

export { PageContent };
import { ReactNode } from 'react';

import styles from './PageContent.module.sass';

interface IPageContent {
  children: ReactNode,
};

const PageContent: React.FC<IPageContent> = ({ children }) => {
  return (
    <div className={styles['page-content']}>
      {children}
    </div>
  )
};

export { PageContent };
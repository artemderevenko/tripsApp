import { ReactNode } from 'react';
import styles from './PageHeader.module.sass';

interface IPageHeader {
  children: ReactNode,
  align: string
};

const PageHeader: React.FC<IPageHeader> = ({ children, align }) => {
  return (
    <div className={`${styles['page-header']} ${styles[align]}`}>
      {children}
    </div>
  )
};

export { PageHeader };
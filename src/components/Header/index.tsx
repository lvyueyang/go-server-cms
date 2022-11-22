import styles from './index.module.less';
import { useAppData } from 'umi';

interface HeaderProps {
  title?: React.ReactNode;
}

export default function Header({ title }: HeaderProps) {
  const { routes } = useAppData();
  const defaultTitle = (
    Object.values(routes).find((item) => item.path === location.pathname) as any
  )?.title;
  return (
    <div className={`${styles.headerContainer} header`}>
      <div className={styles.title}>{title || defaultTitle}</div>
    </div>
  );
}

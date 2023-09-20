import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

import { Outlet } from 'umi';

export default function DefaultLayout() {
  return (
    <ConfigProvider locale={zhCN}>
      <Outlet />
    </ConfigProvider>
  );
}

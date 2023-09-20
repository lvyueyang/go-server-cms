import Layout from '@/components/Layout';
import { useUserinfoStore } from '@/store/userinfo';
import { useEffect } from 'react';
import { Outlet } from 'umi';

export default function DefaultLayout() {
  const { load } = useUserinfoStore();
  useEffect(() => {
    load();
  }, []);
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

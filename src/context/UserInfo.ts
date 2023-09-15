import { ModelAdminUser } from '@/interface/serverApi';
import { createContext } from 'react';

interface Options {
  data?: ModelAdminUser;
  loadInfo?: () => void;
}

const UserInfoContext = createContext<Options>({});

export default UserInfoContext;

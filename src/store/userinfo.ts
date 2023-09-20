import { ModelAdminUser } from '@/interface/serverApi';
import { getUserInfo } from '@/services';
import { create } from 'zustand';

type Userinfo = Required<ModelAdminUser>;

interface UserinfoStore {
  data: Userinfo | null;
  loading: boolean;
  load: () => Promise<void>;
  clear: () => void;
}

export const useUserinfoStore = create<UserinfoStore>((set) => ({
  loading: false,
  data: null,
  clear: () => {
    set({ data: null, loading: false });
  },
  load: async () => {
    set({ loading: true });
    try {
      const res = await getUserInfo();
      set({
        data: res.data.data,
      });
    } catch (e) {}
    set({ loading: false });
  },
}));

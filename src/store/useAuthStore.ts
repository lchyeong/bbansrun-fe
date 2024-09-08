import { create } from 'zustand';

// 상태 타입 정의
interface AuthState {
  userUuid: string | null;
  roles: string[] | null;
  setAuthInfo: (userUuid: string, roles: string[]) => void;
  clearAuthInfo: () => void;
}

// Zustand 스토어 생성 (persist 사용하지 않음)
export const useAuthStore = create<AuthState>((set) => ({
  userUuid: null,
  roles: null,
  setAuthInfo: (userUuid, roles) => set({ userUuid, roles }),
  clearAuthInfo: () => set({ userUuid: null, roles: null }),
}));

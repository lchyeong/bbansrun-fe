import apiClient from './apiClient';
import { useAuthStore } from '../store/useAuthStore'; // Zustand 스토어 가져오기

interface Credentials {
  email: string;
  password: string;
}

// 로그인 함수
export const login = async (credentials: Credentials) => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    const token = response.headers['authorization'].replace('Bearer ', '');

    if (token) {
      localStorage.setItem('jwtToken', token);

      // LoginResponse에서 uuid/roles를 받아와서 저장
      const { userUuid, roles } = response.data; // 응답에서 uuid와 roles 가져오기
      const setAuthInfo = useAuthStore.getState().setAuthInfo;
      setAuthInfo(userUuid, roles); // 상태에 저장

      // Zustand 스토어에서 uuid와 roles 상태 확인로그
      const authState = useAuthStore.getState();
      console.log('UUID: ', authState.userUuid);
      console.log('Roles: ', authState.roles);
    } else {
      throw new Error('토큰을 받지 못했습니다.');
    }
  } catch (error) {
    console.error('로그인 오류:', error);
    throw new Error('로그인 실패');
  }
};

export const logout = () => {
  // 1. localStorage에 저장된 JWT 토큰 삭제
  localStorage.removeItem('jwtToken');

  // 2. 서버에 요청을 보내 리프레시 토큰 쿠키 만료 (선택적)
  apiClient
    .post('/auth/logout')
    .then(() => {
      console.log('로그아웃 성공');
    })
    .catch((error) => {
      console.error('로그아웃 오류:', error);
    });

  // 3. 상태 초기화 (Zustand 사용 중인 경우)
  const clearAuthInfo = useAuthStore.getState().clearAuthInfo;
  clearAuthInfo();

  // 4. 로그인 페이지로 리디렉션
  window.location.href = '/login';
};

// 리프레시 토큰을 사용해 새로운 액세스 토큰 요청
export const refreshAccessToken = async () => {
  try {
    const response = await apiClient.post('/auth/refresh'); // /auth/refresh 엔드포인트로 요청
    const token = response.headers['authorization'].replace('Bearer ', '');

    if (token) {
      // 새 액세스 토큰을 localStorage에 저장
      localStorage.setItem('jwtToken', token);

      // 로그인 시와 마찬가지로 새로운 사용자 정보 업데이트
      const { userUuid, roles } = response.data; // 응답에서 uuid와 roles 가져오기
      const setAuthInfo = useAuthStore.getState().setAuthInfo;
      setAuthInfo(userUuid, roles); // 상태에 저장

      // Zustand 스토어에서 uuid와 roles 상태 확인로그
      const authState = useAuthStore.getState();
      console.log('UUID: ', authState.userUuid);
      console.log('Roles: ', authState.roles);
    } else {
      throw new Error('새로운 액세스 토큰을 받지 못했습니다.');
    }
  } catch (error) {
    console.error('액세스 토큰 갱신 실패:', error);
    throw new Error('토큰 갱신 실패');
  }
};

export const fetchAuthInfo = async () => {
  try {
    // localStorage에서 토큰 확인
    const token = localStorage.getItem('jwtToken');
    // 토큰이 없으면 로그인 상태가 아님
    if (!token) {
      return;
    }

    // 토큰이 있으면 유저 정보 요청
    const response = await apiClient.get('/auth/info', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { userUuid, roles } = response.data;
    // Zustand 스토어에 uuid와 roles 업데이트
    useAuthStore.getState().setAuthInfo(userUuid, roles);
    // Zustand 스토어에서 uuid와 roles 상태 확인로그
    const authState = useAuthStore.getState();
    console.log('UUID: ', authState.userUuid);
    console.log('Roles: ', authState.roles);
  } catch (error) {
    console.error('유저 정보 가져오기 실패:', error);
  }
};

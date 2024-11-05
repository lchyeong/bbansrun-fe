import apiClient from './apiClient';
import { useAuthStore } from '../store/useAuthStore'; // Zustand 스토어 가져오기

interface Credentials {
  email: string;
  password: string;
}

// 공통 함수: 토큰과 사용자 정보를 상태 및 localStorage에 저장
const storeTokenAndUserInfo = (
  token: string,
  userUuid: string,
  roles: string[]
) => {
  localStorage.setItem('jwtToken', token);
  const setAuthInfo = useAuthStore.getState().setAuthInfo;
  setAuthInfo(userUuid, roles);
  console.log('UUID:', userUuid);
  console.log('Roles:', roles);
};

// 로그인 함수
export const login = async (credentials: Credentials) => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    const token = response.headers['authorization']?.replace('Bearer ', '');

    if (token) {
      const { userUuid, roles } = response.data; // 응답에서 uuid와 roles 가져오기
      storeTokenAndUserInfo(token, userUuid, roles); // 상태 및 localStorage에 저장
    } else {
      throw new Error('토큰을 받지 못했습니다.');
    }
  } catch (error) {
    console.error('로그인 오류:', error);
    throw new Error('로그인 실패');
  }
};

// 로그아웃 함수
export const logout = async () => {
  try {
    // 1. 서버에 리프레시 토큰 만료 요청
    await apiClient.post('/auth/logout');
    console.log('로그아웃 성공');

    // 2. localStorage에 저장된 JWT 토큰 삭제
    localStorage.removeItem('jwtToken');

    // 3. 상태 초기화 (Zustand 사용 중인 경우)
    const clearAuthInfo = useAuthStore.getState().clearAuthInfo;
    clearAuthInfo();

    // 4. 로그인 페이지로 리디렉션
    window.location.href = '/';
  } catch (error) {
    console.error('로그아웃 오류:', error);
    throw new Error('로그아웃 실패');
  }
};

// 리프레시 토큰을 사용해 새로운 액세스 토큰 요청
export const refreshAccessToken = async () => {
  try {
    const response = await apiClient.post('/auth/refresh'); // /auth/refresh 엔드포인트로 요청
    const token = response.headers['authorization']?.replace('Bearer ', '');

    if (token) {
      const { userUuid, roles } = response.data;
      storeTokenAndUserInfo(token, userUuid, roles); // 새로운 정보로 상태 및 토큰 갱신
    } else {
      throw new Error('새로운 액세스 토큰을 받지 못했습니다.');
    }
  } catch (error) {
    console.error('액세스 토큰 갱신 실패:', error);
    throw new Error('토큰 갱신 실패');
  }
};

// 유저 정보 가져오기 함수
export const fetchAuthInfo = async () => {
  try {
    // localStorage에서 토큰 확인
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.warn('로그인된 사용자가 없습니다.');
      return;
    }

    // 토큰이 있으면 유저 정보 요청
    const response = await apiClient.get('/auth/info', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { userUuid, roles } = response.data;
    useAuthStore.getState().setAuthInfo(userUuid, roles); // Zustand 스토어에 uuid와 roles 업데이트
    console.log('UUID:', userUuid);
    console.log('Roles:', roles);
  } catch (error) {
    console.error('유저 정보 가져오기 실패:', error);
  }
};

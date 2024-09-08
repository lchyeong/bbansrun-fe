import apiClient from './apiClient';
import axios from 'axios';
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
      const authState = useAuthStore.getState(); // 상태 가져오기
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

export const fetchAuthInfo = async () => {
  try {
    const response = await apiClient.get('/auth/info');
    const { userUuid, roles } = response.data;

    // Zustand 스토어에 uuid와 roles 업데이트
    useAuthStore.getState().setAuthInfo(userUuid, roles);
    const authState = useAuthStore.getState(); // 상태 가져오기
    console.log('UUID: ', authState.userUuid);
    console.log('Roles: ', authState.roles);
  } catch (error) {
    console.error('유저 정보 가져오기 실패:', error);
  }
};

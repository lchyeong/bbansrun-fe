import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { refreshAccessToken } from './authApi';

// 요청 실패 시 처리할 큐의 타입 정의
interface FailedRequest {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
}

let isRefreshing = false; // 토큰 갱신 중 여부를 추적하는 플래그
let failedQueue: FailedRequest[] = []; // 실패한 요청을 저장하는 큐

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키 전송을 위해 설정
});

// 요청 인터셉터 (JWT 토큰을 요청 헤더에 포함)
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('jwtToken');

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 실패한 요청 재시도 처리 함수
const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// 응답 인터셉터 (401 Unauthorized 처리)
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response, // 정상 응답은 그대로 반환
  async (error) => {
    const originalRequest = error.config; // 실패한 원래 요청을 보관

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 무한 루프 방지 (한번만 시도)

      if (isRefreshing) {
        // 토큰 갱신이 진행 중일 때 실패한 요청을 큐에 저장하고 기다리게 함
        return new Promise<string | null>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (token && originalRequest.headers) {
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
            }
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      isRefreshing = true;

      try {
        // Refresh 토큰을 사용해 새로운 액세스 토큰 요청
        await refreshAccessToken();
        const newToken = localStorage.getItem('jwtToken'); // 갱신된 토큰 가져오기
        processQueue(null, newToken); // 대기 중인 요청 처리

        if (newToken && originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        }
        return apiClient(originalRequest); // 새로운 토큰으로 원래 요청을 다시 시도
      } catch (err) {
        processQueue(err, null); // 대기 중인 요청에 에러 전파
        console.error('액세스 토큰 갱신 중 오류 발생:', err);
        // Refresh 토큰이 만료되었거나 오류 발생 시 재로그인 요구
        alert('인증이 만료되었습니다. 다시 로그인해주세요.');
        localStorage.removeItem('jwtToken'); // 만료된 토큰 삭제
        window.location.href = '/login'; // 로그인 페이지로 리디렉션
        return Promise.reject(err); // 오류 반환
      } finally {
        isRefreshing = false; // 토큰 갱신 작업 완료
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;

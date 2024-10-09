import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키 전송을 하기 위해 설정
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 401 Unauthorized 응답 처리 추가
apiClient.interceptors.response.use(
  (response) => response, // 정상 응답은 그대로 반환
  (error) => {
    if (error.response.status === 401) {
      // 401 Unauthorized 발생 시 재로그인 요구
      alert('인증이 만료되었습니다. 다시 로그인해주세요.');
      localStorage.removeItem('jwtToken'); // 만료된 토큰 삭제
      window.location.href = '/login'; // 로그인 페이지로 리디렉션
    }

    return;
  }
);

export default apiClient;

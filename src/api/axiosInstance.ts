import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.example.com', // API의 기본 URL을 설정합니다.
  timeout: 10000, // 요청 타임아웃을 설정합니다.
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
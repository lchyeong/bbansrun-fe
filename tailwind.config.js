export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1976d2',
        secondary: '#dc004e',
        success: '#4caf50',
        danger: '#f44336',
        warning: '#ff9800',
        info: '#2196f3',
        light: '#f5f5f5',
        dark: '#212121',
        container: '#212121',
        background: '#ffffff', // 기본 배경색을 흰색으로 설정
      },
      fontFamily: {
        body: ['Roboto', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        strong: '0 0 10px rgba(0, 0, 0, 1)', // 강한 그림자 효과
      },
    },
  },
  plugins: [],
};

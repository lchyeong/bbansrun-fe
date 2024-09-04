export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#E9FF97', // 주 색상
        secondary: '#FFD18E', // 보조 색상
        success: '#FFA38F', // 성공 색상
        danger: '#FF7EE2', // 위험 색상
        warning: '#ff9800', // 경고 색상
        info: '#2196f3', // 정보 색상
        light: '#f5f5f5', // 밝은 색상
        dark: '#212121', // 어두운 색상
        container: '#212121', // 컨테이너 배경색
        background: '#ffffff', // 기본 배경색 (흰색)
      },
      fontFamily: {
        body: ['Roboto', 'sans-serif'], // 기본 본문 폰트
        heading: ['Poppins', 'sans-serif'], // 제목 폰트
      },
      boxShadow: {
        strong: '0 0 10px rgba(0, 0, 0, 1)', // 강한 그림자 효과
      },
    },
  },
  plugins: [],
};

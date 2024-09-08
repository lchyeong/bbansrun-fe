import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

import { ChevronLeft } from '@mui/icons-material';
import { login } from '../../api/authApi';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지
    try {
      await login({ email, password });
      navigate('/');
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
      setErrorMessage('이메일 또는 비밀번호를 확인해주세요.');
    }
  };

  // 이전 페이지로 이동하는 함수
  const goBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <div className="bg-primary min-h-screen flex flex-col justify-start items-center p-4">
      {/* 상단 화살표 및 제목 */}
      <div className="flex items-center self-start mb-6">
        <button onClick={goBack} className="text-gray-500 mr-3">
          <ChevronLeft />
        </button>
      </div>

      {/* 타이틀 및 인사말 */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">BBANS RUN</h1>
      </div>

      {/* 이메일 및 패스워드 입력 */}
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="이메일을 입력하세요"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="비밀번호를 입력하세요"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* 이메일 또는 비밀번호 오류 시 메시지 */}
          {errorMessage && (
            <div className="ml-1 mb-4 text-red-600 text-sm">{errorMessage}</div>
          )}

          {/* 이메일로 시작하기 버튼 */}
          <button
            type="submit"
            className="w-full py-2 px-4 text-gray-700 rounded-md font-medium relative overflow-hidden group transition-all duration-300 ease-in-out"
          >
            <span className="relative z-10">이메일로 시작하기</span>
            <span className="absolute inset-0 border-2 border-transparent transition-all duration-300 ease-in-out group-hover:bg-primary"></span>
          </button>

          {/* 수평선 */}
          <div className="relative my-3">
            <hr className="border-gray-400" />
          </div>
        </form>

        {/* 소셜 로그인 섹션 */}
        <div className="mt-6 text-center">
          <div className="flex justify-center space-x-4 mt-4">
            <button className="bg-white border border-gray-300 p-2 rounded-full">
              <img
                src="/path-to-google-icon.png"
                alt="Google 로그인"
                className="h-8 w-8"
              />
            </button>
            <button className="bg-white border border-gray-300 p-2 rounded-full">
              <img
                src="/path-to-kakao-icon.png"
                alt="Kakao 로그인"
                className="h-8 w-8"
              />
            </button>
            <button className="bg-white border border-gray-300 p-2 rounded-full">
              <img
                src="/path-to-naver-icon.png"
                alt="Naver 로그인"
                className="h-8 w-8"
              />
            </button>
          </div>
        </div>

        {/* 회원가입 링크 */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            아이디가 없으신가요?{' '}
            <Link to="/signup" className="text-indigo-600 font-medium">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

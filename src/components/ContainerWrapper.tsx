// ContainerWrapper.tsx
import React from 'react';

interface ContainerWrapperProps {
  children: React.ReactNode;
}

const ContainerWrapper: React.FC<ContainerWrapperProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-background">
      {' '}
      {/* 화면 전체 높이와 중앙 정렬 */}
      <div className="max-w-[580px] w-full mx-auto bg-primary overflow-hidden shadow-md">
        {children}
      </div>
    </div>
  );
};

export default ContainerWrapper;

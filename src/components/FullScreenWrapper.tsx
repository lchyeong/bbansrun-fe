// FullScreenWrapper.tsx
import React from 'react';

interface FullScreenWrapperProps {
  children: React.ReactNode;
}

const FullScreenWrapper: React.FC<FullScreenWrapperProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-[580px] w-full mx-auto bg-primary overflow-hidden shadow-xl">
        {children}
      </div>
    </div>
  );
};

export default FullScreenWrapper;

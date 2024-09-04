import React from 'react';

interface ContainerWrapperProps {
  children: React.ReactNode;
}

const ContainerWrapper: React.FC<ContainerWrapperProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-[580px] w-full mx-auto bg-primary overflow-hidden shadow-xl">
        {children}
      </div>
    </div>
  );
};

export default ContainerWrapper;

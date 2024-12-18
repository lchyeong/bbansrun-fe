import React, { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

// useNavigate로 교체

const TopMenu: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const tabs = ['Menu', '게시판', 'Menu 3', 'Menu 4', 'Menu 5'];

  useEffect(() => {
    const handleScroll = () => {
      if (menuRef.current) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 60) {
            setIsSticky(true);
          } else {
            setIsSticky(false);
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    if (index === 1) {
      // 2번 탭 클릭 시 카테고리 페이지로 이동
      navigate('/category');
    } else {
      window.scrollTo(0, 0); // 다른 탭 클릭 시 상단으로 이동
    }
  };

  return (
    <div className="w-full max-w-[580px] mx-auto bg-white shadow">
      {/* 탭 네비게이션 */}
      <nav
        ref={menuRef}
        className={`w-full max-w-[580px] z-50 bg-white shadow flex justify-around border-b ${
          isSticky ? 'fixed top-0' : 'relative'
        }`}
        aria-label="Tabs"
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`w-full py-4 px-1 text-center text-sm ${
              activeTab === index
                ? 'font-semibold text-gray-800'
                : 'font-normal font-medium text-gray-500 hover:font-semibold hover:text-gray-800'
            }`}
            onClick={() => handleTabClick(index)}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* 탭에 따른 콘텐츠 */}
      <div className={`p-4 ${isSticky ? 'pt-16' : ''}`}>
        {activeTab === 0 && <div>Content for Category 1</div>}
        {activeTab === 1 && <div>러닝 크루를 모집하는 게시판 입니다.</div>}
        {activeTab === 2 && <div>Content for Category 3</div>}
        {activeTab === 3 && <div>Content for Category 4</div>}
        {activeTab === 4 && <div>Content for Category 5</div>}
      </div>
    </div>
  );
};

export default TopMenu;

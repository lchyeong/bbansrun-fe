import React, { useState } from 'react';

const TopMenu: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    'Category 1',
    'Category 2',
    'Category 3',
    'Category 4',
    'Category 5',
    'Category 6',
  ];

  return (
    <div className="bg-white shadow z-50 fixed top-[60px] left-0 right-0 w-full max-w-[580px] mx-auto">
      {/* 고정된 탭 네비게이션 */}
      <nav
        className="flex justify-around border-b border-gray-200"
        aria-label="Tabs"
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`w-full py-4 px-1 text-center text-sm font-medium text-gray-600 ${
              activeTab === index
                ? 'font-bold text-blue-600'
                : 'font-normal hover:font-semibold hover:text-gray-800'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* 탭에 따른 콘텐츠 -> 나중에 링크로 바꿔야함*/}
      <div className="p-4">
        {activeTab === 0 && <div>Content for Category 1</div>}
        {activeTab === 1 && <div>Content for Category 2</div>}
        {activeTab === 2 && <div>Content for Category 3</div>}
        {activeTab === 3 && <div>Content for Category 4</div>}
        {activeTab === 4 && <div>Content for Category 5</div>}
        {activeTab === 5 && <div>Content for Category 6</div>}
      </div>
    </div>
  );
};

export default TopMenu;

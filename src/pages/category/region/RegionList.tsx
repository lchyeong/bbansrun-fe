import React from 'react';

interface Region {
  name: string;
  code: string;
  regionCode: string;
}

interface RegionListProps {
  regions: Region[];
  onRegionClick: (regionCode: string) => void;
  hoveredRegion: string | null; // 호버된 지역을 받아옴
  setHoveredRegion: (regionCode: string | null) => void; // 호버 상태 업데이트 함수
}

const RegionList: React.FC<RegionListProps> = ({
  regions,
  onRegionClick,
  hoveredRegion,
  setHoveredRegion,
}) => {
  return (
    <div className="absolute left-4 bg-white p-2 rounded-lg shadow-lg z-5">
      <ul className="text-sm">
        {regions.map((region) => (
          <li
            key={region.code}
            className={`cursor-pointer ${hoveredRegion === region.code ? 'text-blue-500' : ''}`} // 호버된 항목 강조
            onClick={() => onRegionClick(region.code)}
            onMouseEnter={() => setHoveredRegion(region.code)} // 목록에서 호버 시
            onMouseLeave={() => setHoveredRegion(null)} // 호버 해제 시
          >
            {region.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RegionList;

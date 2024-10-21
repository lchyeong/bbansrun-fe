import React from 'react';
import { ReactSVG } from 'react-svg';
import RegionList from '../category/region/RegionList';
import { sidoRegions } from '../category/region/sidoRegions';
import { useNavigate } from 'react-router-dom';

// 새로 만든 RegionList 컴포넌트를 임포트

const CategoryPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRegionClick = (regionCode: string) => {
    navigate(`/category/${regionCode}`);
  };

  const handleMapEvents = (svg: SVGSVGElement) => {
    svg.querySelectorAll('path, polyline').forEach((region) => {
      const regionId = region.getAttribute('id');

      region.setAttribute('pointer-events', 'all');
      region.removeAttribute('style');

      // 기본 색상 설정
      region.setAttribute('fill', '#ffffff');
      region.setAttribute('stroke', '#000000');

      // hover 이벤트 설정
      region.addEventListener('mouseover', () => {
        region.setAttribute('fill', '#565a52bd'); // hover 시 색상 변경
      });

      region.addEventListener('mouseleave', () => {
        region.setAttribute('fill', '#ffffff'); // hover 종료 시 원래 색상으로 복구
      });

      region.addEventListener('click', () => {
        if (regionId) {
          handleRegionClick(regionId);
          region.setAttribute('fill', '#FF4500'); // 클릭 시 색상 변경
        }
      });
    });
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-primary overflow-hidden">
      {/* RegionList 컴포넌트 삽입 */}
      <RegionList regions={sidoRegions} onRegionClick={handleRegionClick} />

      {/* 지도 */}
      <ReactSVG
        src="https://bbansrun.s3.ap-northeast-2.amazonaws.com/S3/KoreaMap/Map_of_South_Korea-blank.svg"
        beforeInjection={(svg) => {
          svg.setAttribute(
            'style',
            'width: 100%; height: auto; max-width: 100%; max-height: 100%; pointer-events: all;'
          );
          svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
          handleMapEvents(svg as SVGSVGElement);
        }}
        className="max-w-full max-h-full object-contain"
      />
    </div>
  );
};

export default CategoryPage;

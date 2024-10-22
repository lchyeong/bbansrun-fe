import React, { useEffect, useState } from 'react';

import { ReactSVG } from 'react-svg';
import RegionList from '../category/region/RegionList';
import { sidoRegions } from '../category/region/sidoRegions';
import { useNavigate } from 'react-router-dom';

const FILL_COLOR_DEFAULT = '#ffffff';
const FILL_COLOR_HOVER = '#565a52bd';
const STROKE_COLOR_DEFAULT = '#000000';

interface ExtendedSVGElement extends Element {
  handleMouseOver?: (event: Event) => void;
  handleMouseLeave?: (event: Event) => void;
  handleClick?: (event: Event) => void;
}

const CategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const handleRegionClick = (regionCode: string) => {
    navigate(`/category/${regionCode}`);
  };

  useEffect(() => {
    const svgElement = document.querySelector('svg');
    if (svgElement) {
      handleMapEvents(svgElement as SVGSVGElement);
    }

    // Cleanup 함수로 이벤트 리스너 제거
    return () => {
      const regions = svgElement?.querySelectorAll('path, polyline');
      if (regions) {
        regions.forEach((region) => {
          const extendedRegion = region as ExtendedSVGElement;
          if (extendedRegion.handleMouseOver) {
            region.removeEventListener(
              'mouseover',
              extendedRegion.handleMouseOver
            );
          }
          if (extendedRegion.handleMouseLeave) {
            region.removeEventListener(
              'mouseleave',
              extendedRegion.handleMouseLeave
            );
          }
          if (extendedRegion.handleClick) {
            region.removeEventListener('click', extendedRegion.handleClick);
          }
        });
      }
    };
  }, [hoveredRegion]);

  const handleMapEvents = (svg: SVGSVGElement) => {
    svg.querySelectorAll('path, polyline').forEach((region) => {
      const regionId = region.getAttribute('id');
      region.setAttribute('pointer-events', 'all');
      region.removeAttribute('style');

      // 기본 색상 설정
      region.setAttribute('fill', FILL_COLOR_DEFAULT);
      region.setAttribute('stroke', STROKE_COLOR_DEFAULT);

      // hover된 지역이 있을 때, 색상 변경
      if (hoveredRegion === regionId) {
        region.setAttribute('fill', FILL_COLOR_HOVER);
      }

      // 마우스 이벤트 함수 정의
      const handleMouseOver = () => {
        region.setAttribute('fill', FILL_COLOR_HOVER);
        setHoveredRegion(regionId);
      };

      const handleMouseLeave = () => {
        region.setAttribute('fill', FILL_COLOR_DEFAULT);
        setHoveredRegion(null);
      };

      const handleClick = () => {
        if (regionId) {
          handleRegionClick(regionId);
          region.setAttribute('fill', FILL_COLOR_HOVER);
        }
      };

      // 함수 참조를 Element에 저장
      const extendedRegion = region as ExtendedSVGElement;
      extendedRegion.handleMouseOver = handleMouseOver;
      extendedRegion.handleMouseLeave = handleMouseLeave;
      extendedRegion.handleClick = handleClick;

      // 이벤트 리스너 추가
      region.addEventListener('mouseover', handleMouseOver);
      region.addEventListener('mouseleave', handleMouseLeave);
      region.addEventListener('click', handleClick);
    });
  };

  return (
    <div className="relative w-full min-h-screen flex items-start justify-center bg-primary">
      <RegionList
        regions={sidoRegions}
        onRegionClick={handleRegionClick}
        hoveredRegion={hoveredRegion}
        setHoveredRegion={setHoveredRegion}
      />
      <ReactSVG
        src="https://bbansrun.s3.ap-northeast-2.amazonaws.com/S3/KoreaMap/KoreaMapSido.svg"
        beforeInjection={(svg) => {
          svg.setAttribute(
            'style',
            'width: 100%; height: auto; pointer-events: all;'
          );
          handleMapEvents(svg as SVGSVGElement);
        }}
        className="width: 100%; height: auto; pointer-events: all;"
      />
    </div>
  );
};

export default CategoryPage;

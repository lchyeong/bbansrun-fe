import React from 'react';

interface Region {
  name: string;
  code: string;
}

interface RegionListProps {
  regions: Region[];
  onRegionClick: (regionCode: string) => void;
}

const RegionList: React.FC<RegionListProps> = ({ regions, onRegionClick }) => {
  return (
    <div className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow-lg z-10">
      <ul className="text-sm">
        {regions.map((region) => (
          <li
            key={region.code}
            className="cursor-pointer hover:text-blue-500"
            onClick={() => onRegionClick(region.code)}
          >
            {region.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RegionList;

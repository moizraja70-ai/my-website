import React from 'react';

interface DentEdgeLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

const DentEdgeLogo: React.FC<DentEdgeLogoProps> = ({
  size = 40,
  className = '',
  showText = false,
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          {/* Tooth silhouette */}
          <path
            d="M24 4C20 4 18 8 18 14C18 20 20 28 24 32C28 28 30 20 30 14C30 8 28 4 24 4Z"
            fill="white"
            stroke="white"
            strokeWidth="1"
          />
          {/* "D" letter */}
          <text
            x="24"
            y="22"
            fontSize="20"
            fontWeight="bold"
            fill="#6B5FEA"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="Arial, sans-serif"
          >
            D
          </text>
          {/* Highlight */}
          <ellipse cx="22" cy="14" rx="3" ry="5" fill="white" opacity="0.4" />
        </g>
      </svg>

      {showText && (
        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          DentEdge
        </span>
      )}
    </div>
  );
};

export default DentEdgeLogo;

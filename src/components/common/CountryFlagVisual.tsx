import React from 'react';
import { LanguageConfig, LanguageFlagInfo } from '../../data/languageCurriculum';

interface CountryFlagVisualProps {
  flagInfo: LanguageFlagInfo;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

/**
 * Optically precise CSS vector representation of national flags
 */
export const CountryFlagVisual: React.FC<CountryFlagVisualProps> = ({
  flagInfo,
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-6 h-4 text-[9px] rounded-sm',
    md: 'w-9 h-6 text-xs rounded-md',
    lg: 'w-12 h-8 text-sm rounded-lg',
    hero: 'w-16 h-10 text-base rounded-xl'
  };

  const renderFlagPattern = () => {
    switch (flagInfo.pattern) {
      case 'uae-four-color':
        // UAE / Gulf: Red mast band on left, Green top, White middle, Black bottom
        return (
          <div className="relative w-full h-full flex overflow-hidden border border-black/20 shadow-sm">
            {/* Red vertical bar on hoist (left) */}
            <div className="w-1/4 h-full bg-[#FF0000] shrink-0 z-10" />
            {/* 3 horizontal bars */}
            <div className="w-3/4 h-full flex flex-col">
              <div className="h-1/3 w-full bg-[#00732F]" />
              <div className="h-1/3 w-full bg-[#FFFFFF]" />
              <div className="h-1/3 w-full bg-[#000000]" />
            </div>
          </div>
        );

      case 'horizontal-stripes':
        // Germany: Black, Red, Gold OR Spain: Red, Yellow (double), Red OR India: Saffron, White, Green
        if (flagInfo.colors.length === 3) {
          return (
            <div className="w-full h-full flex flex-col overflow-hidden border border-black/20 shadow-sm">
              <div className="h-1/3 w-full" style={{ backgroundColor: flagInfo.colors[0] }} />
              <div className="h-1/3 w-full" style={{ backgroundColor: flagInfo.colors[1] }} />
              <div className="h-1/3 w-full" style={{ backgroundColor: flagInfo.colors[2] }} />
            </div>
          );
        } else if (flagInfo.colors.length === 4) {
          // India Tiranga
          return (
            <div className="relative w-full h-full flex flex-col overflow-hidden border border-black/20 shadow-sm">
              <div className="h-1/3 w-full bg-[#FF9933]" />
              <div className="h-1/3 w-full bg-[#FFFFFF] flex items-center justify-center relative">
                <div className="w-2 h-2 rounded-full border border-[#000080] flex items-center justify-center">
                  <div className="w-0.5 h-0.5 rounded-full bg-[#000080]" />
                </div>
              </div>
              <div className="h-1/3 w-full bg-[#138808]" />
            </div>
          );
        }
        return null;

      case 'vertical-stripes':
        // France: Blue, White, Red
        return (
          <div className="w-full h-full flex overflow-hidden border border-black/20 shadow-sm">
            <div className="w-1/3 h-full" style={{ backgroundColor: flagInfo.colors[0] }} />
            <div className="w-1/3 h-full" style={{ backgroundColor: flagInfo.colors[1] }} />
            <div className="w-1/3 h-full" style={{ backgroundColor: flagInfo.colors[2] }} />
          </div>
        );

      case 'japan-sun':
        // Japan Hinomaru: Crisp White field with Crimson Red Sun circle
        return (
          <div className="relative w-full h-full bg-white flex items-center justify-center overflow-hidden border border-slate-300/80 shadow-sm">
            <div className="w-[45%] h-[65%] rounded-full bg-[#BC002D] shadow-inner" />
          </div>
        );

      case 'cross-union':
        // UK Union Jack motif stylized
        return (
          <div className="relative w-full h-full bg-[#012169] overflow-hidden border border-black/20 shadow-sm">
            {/* White diagonals */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-1 bg-white rotate-30 origin-center absolute" />
              <div className="w-full h-1 bg-white -rotate-30 origin-center absolute" />
            </div>
            {/* White cross */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-2.5 bg-white" />
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2.5 bg-white" />
            {/* Red cross */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1.5 bg-[#C8102E]" />
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1.5 bg-[#C8102E]" />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`inline-flex shrink-0 ${sizeClasses[size]} overflow-hidden ${className}`}>
      {renderFlagPattern()}
    </div>
  );
};

/**
 * Top continuous multi-color flag stripe ribbon
 */
export const CountryFlagStripeBar: React.FC<{
  flagInfo: LanguageFlagInfo;
  heightClass?: string;
  roundedClass?: string;
}> = ({ flagInfo, heightClass = 'h-1.5', roundedClass = 'rounded-t-2xl' }) => {
  return (
    <div className={`w-full ${heightClass} ${roundedClass} flex overflow-hidden shadow-sm`}>
      {flagInfo.colors.map((color, idx) => (
        <div
          key={idx}
          className="flex-1 h-full transition-all"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};

/**
 * Palette dots showing each flag color with Hindi label
 */
export const CountryFlagPaletteTag: React.FC<{
  flagInfo: LanguageFlagInfo;
  showNames?: boolean;
  className?: string;
}> = ({ flagInfo, showNames = true, className = '' }) => {
  return (
    <div className={`flex items-center gap-1.5 text-[11px] font-medium text-slate-300 ${className}`}>
      <div className="flex items-center -space-x-1">
        {flagInfo.colors.map((color, idx) => (
          <span
            key={idx}
            className="w-3.5 h-3.5 rounded-full border-2 border-slate-900 shadow-sm"
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
      {showNames && (
        <span className="text-[10px] text-slate-300 font-sans truncate font-semibold">
          {flagInfo.colorNamesHindi}
        </span>
      )}
    </div>
  );
};

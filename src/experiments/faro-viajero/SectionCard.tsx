import React from 'react';

interface SectionCardProps {
  stepNumber: string;
  badgeText: string;
  badgeColor?: 'red' | 'gold' | 'cream';
  title: string;
  subtitle?: string;
  description: string;
  align?: 'left' | 'right' | 'center';
  isWide?: boolean;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  stepNumber,
  badgeText,
  badgeColor = 'gold',
  title,
  subtitle,
  description,
  align = 'left',
}) => {
  const badgeClasses = {
    red: 'bg-[#b91c1c] text-white border-black',
    gold: 'bg-[#e2c044] text-black border-black',
    cream: 'bg-[#f5efe1] text-black border-black',
  }[badgeColor];

  const alignmentClasses = {
    left: 'text-left items-start',
    right: 'text-right items-end',
    center: 'text-center items-center',
  }[align];

  return (
    <div
      className={`flex flex-col ${alignmentClasses} w-full max-w-sm sm:max-w-md p-3.5 sm:p-5 bg-[#181615]/95 border-2 border-[#33302c] shadow-[6px_6px_0_#000] backdrop-blur-md select-none transition-all duration-300`}
    >
      {/* HEADER ROW WITH STEP & BADGE */}
      <div className="flex items-center gap-2.5 mb-2 flex-wrap">
        <span className="font-mono text-[11px] font-bold text-[#e2c044] tracking-widest bg-black/70 px-2 py-0.5 border border-[#33302c]">
          {stepNumber}
        </span>
        <span className={`font-mono text-[11px] font-bold tracking-wider uppercase px-2 py-0.5 border shadow-[2px_2px_0_#000] ${badgeClasses}`}>
          {badgeText}
        </span>
      </div>

      {/* TITLE */}
      <h3 className="font-['Anton'] text-xl sm:text-2xl md:text-3xl tracking-wide uppercase text-[#f5efe1] leading-tight mb-1">
        {title}
      </h3>

      {/* SUBTITLE IF PRESENT */}
      {subtitle && (
        <p className="font-mono text-[11px] sm:text-xs font-bold text-[#e2c044] tracking-wider uppercase mb-1.5">
          {subtitle}
        </p>
      )}

      {/* BODY DESCRIPTION */}
      <p className="font-['Space_Grotesk'] text-xs sm:text-sm text-[#b8b0a2] leading-snug sm:leading-relaxed">
        {description}
      </p>
    </div>
  );
};

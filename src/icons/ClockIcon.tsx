import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  className: string;
  style?: React.CSSProperties;
}

const ClockIcon: React.FC<Props> = ({ className, style, ...restProps }) => {
  return (
    <svg
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={className}
      style={style}
      {...restProps}
    >
      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
  );
};

export default ClockIcon;

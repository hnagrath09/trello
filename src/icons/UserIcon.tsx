import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  className: string;
  style?: React.CSSProperties;
}

const UserIcon: React.FC<Props> = ({ className, style, ...restProps }) => {
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
      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
    </svg>
  );
};

export default UserIcon;

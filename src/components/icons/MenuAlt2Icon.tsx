import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  className: string;
  style?: React.CSSProperties;
}

const MenuAlt2Icon: React.FC<Props> = ({ className, style, ...restProps }) => {
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
      <path d="M4 6h16M4 12h16M4 18h7"></path>
    </svg>
  );
};

export default MenuAlt2Icon;

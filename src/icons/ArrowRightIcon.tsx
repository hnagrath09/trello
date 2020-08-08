import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  className: string;
  style?: React.CSSProperties;
}

const ArrowRightIcon: React.FC<Props> = ({
  className,
  style,
  ...restProps
}) => {
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
      <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
    </svg>
  );
};

export default ArrowRightIcon;

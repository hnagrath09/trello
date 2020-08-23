import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  className: string;
  style?: React.CSSProperties;
}

const EmojiHappyIcon: React.FC<Props> = ({
  className,
  style,
  ...restProps
}) => {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className={className}
      style={style}
      {...restProps}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

export default EmojiHappyIcon;

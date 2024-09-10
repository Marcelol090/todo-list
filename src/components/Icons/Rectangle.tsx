import { SVGProps } from "react";

const Rectangle = ({ ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={props.width ?? "471"}
      height={props.height ?? "312"}
      viewBox={props.viewBox ?? "0 0 471 312"}
      {...props}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        opacity="0.2"
        x="2"
        y="2"
        width="467"
        height="308"
        fill="transparent"
        stroke="url(#paint0_linear_142_414)"
        strokeWidth="4"
      />
      <defs>
        <linearGradient
          id="paint0_linear_142_414"
          x1="235.5"
          y1="0"
          x2="235.5"
          y2="312"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#632329" />
          <stop offset="0.49648" stopColor="#F25551" />
          <stop offset="1" stopColor="#50F283" stopOpacity="0.8" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Rectangle;

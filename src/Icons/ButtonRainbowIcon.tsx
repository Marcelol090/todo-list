import { SVGProps } from "react";

const ButtonRainbowIcon = ({ ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={props.width ?? "26"}
      height={props.height ?? "26"}
      viewBox={props.viewBox ?? "0 0 26 26"}
      fill={props.fill ?? "none"}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1"
        y="1"
        width="24"
        height="24"
        rx="4"
        stroke="url(#paint0_linear_854_127)"
        stroke-width="2"
      />
      <defs>
        <linearGradient
          id="paint0_linear_854_127"
          x1="12"
          y1="0"
          x2="12"
          y2="24"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#632329" />
          <stop offset="0.49648" stop-color="#F25551" />
          <stop offset="1" stop-color="#50F283" stop-opacity="0.8" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default ButtonRainbowIcon;

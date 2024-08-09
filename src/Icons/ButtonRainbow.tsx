import { SVGProps } from "react";

const ButtonRainbow = ({ ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={props.width ?? "32"}
      height={props.height ?? "32"}
      viewBox={props.viewBox ?? "0 0 32 32"}
      {...props}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 4C1 2.34315 2.34315 1 4 1L28 1C29.6569 1 31 2.34315 31 4L31 28C31 29.6569 29.6569 31 28 31L4 31C2.34315 31 1 29.6569 1 28L1 4Z"
        stroke="url(#paint0_linear_142_244)"
        strokeWidth="2"
      />
      <defs>
        <linearGradient
          id="paint0_linear_142_244"
          x1="16"
          y1="0"
          x2="16"
          y2="32"
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

export default ButtonRainbow;

import { SVGProps } from "react";

const ArrowLeftIcon = ({ ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={props.width ?? "38"}
      height={props.height ?? "38"}
      viewBox={props.viewBox ?? "0 0 38 38"}
      {...props}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 37C28.9411 37 37 28.9411 37 19C37 9.05887 28.9411 1 19 1C9.05887 1 1 9.05887 1 19C1 28.9411 9.05887 37 19 37Z"
        stroke={props.color ?? "#632329"}
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M17.8563 25.3563L11.5 19L17.8563 12.6438"
        stroke={props.color ?? "#632329"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.5 19H26.5"
        stroke={props.color ?? "#632329"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowLeftIcon;

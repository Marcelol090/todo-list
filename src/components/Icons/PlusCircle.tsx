import { SVGProps } from "react";

const PlusCircle = ({ ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={props.width ?? "26"}
      height={props.height ?? "26"}
      viewBox={props.viewBox ?? "0 0 26 26"}
      {...props}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z"
        stroke={props.color ?? "#F25551"}
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M8 13H18"
        stroke={props.color ?? "#F25551"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 8V18"
        stroke={props.color ?? "#F25551"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PlusCircle;

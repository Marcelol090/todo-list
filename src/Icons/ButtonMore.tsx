import { SVGProps } from "react";

const ButtonMore = ({ ...props }: SVGProps<SVGSVGElement>) => {
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
        d="M1 4C1 2.34315 2.34315 1 4 1H28C29.6569 1 31 2.34315 31 4V28C31 29.6569 29.6569 31 28 31H4C2.34315 31 1 29.6569 1 28V4Z"
        stroke="#F25551"
        strokeWidth="2"
      />
      <path
        d="M23.1111 16H8.88892M16 8.88889V23.1111"
        stroke="#F25551"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ButtonMore;

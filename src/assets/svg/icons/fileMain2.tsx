import * as React from "react";
import { SVGProps } from "@/types";

const SVGComponent = ({ fill = "currentColor", ...props }: SVGProps) => (
  <svg
    width={199}
    height={140}
    viewBox="0 0 199 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1 110.953V5.58139C1 3.05116 3.05116 1 5.58139 1H95.4912C98.0214 1 100.073 3.05116 100.073 5.58139V10.2108C100.073 12.741 102.124 14.7921 104.654 14.7921H193.418C195.949 14.7921 198 16.8433 198 19.3735V110.953C198 113.484 195.949 115.535 193.418 115.535H5.58139C3.05116 115.535 1 113.484 1 110.953Z"
      fill="url(#paint0_linear_65_5571)"
      stroke="#D3B2EB"
      strokeWidth={1.14535}
    />
    <rect x={7.87207} y={6.15625} width={183.256} height={114.535} rx={4.58139} fill="white" />
    <rect
      x={7.87207}
      y={6.15625}
      width={183.256}
      height={114.535}
      rx={4.58139}
      stroke="#E4E4E4"
      strokeWidth={0.746212}
    />
    <rect x={17.0352} y={11.8828} width={164.93} height={6.87209} rx={3.43604} fill="#E4E4E4" />
    <rect x={17.0352} y={25.6289} width={164.93} height={6.87209} rx={3.43604} fill="#E4E4E4" />
    <rect x={17.0352} y={39.3711} width={164.93} height={6.87209} rx={3.43604} fill="#E4E4E4" />
    <rect x={17.0352} y={53.1172} width={164.93} height={6.87209} rx={3.43604} fill="#E4E4E4" />
    <rect x={17.0352} y={66.8594} width={164.93} height={6.87209} rx={3.43604} fill="#E4E4E4" />
    <rect x={17.0352} y={80.6055} width={164.93} height={6.87209} rx={3.43604} fill="#E4E4E4" />
    <rect x={17.0352} y={94.3477} width={164.93} height={6.87209} rx={3.43604} fill="#E4E4E4" />
    <rect x={17.0352} y={108.094} width={164.93} height={6.87209} rx={3.43604} fill="#E4E4E4" />
    <path
      d="M198 133.864V28.4915C198 25.9613 195.949 23.9102 193.419 23.9102H103.509C100.979 23.9102 98.9274 25.9613 98.9274 28.4915V33.1209C98.9274 35.6511 96.8762 37.7023 94.346 37.7023H5.58154C3.05132 37.7023 1.00015 39.7535 1.00015 42.2837V133.864C1.00015 136.394 3.0513 138.445 5.58153 138.445H193.419C195.949 138.445 198 136.394 198 133.864Z"
      fill="url(#paint1_linear_65_5571)"
      stroke="#D3B2EB"
      strokeWidth={1.14535}
    />
    <defs>
      <linearGradient
        id="paint0_linear_65_5571"
        x1={30.779}
        y1={11.7939}
        x2={103.839}
        y2={112.383}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#CBA1EA" />
        <stop offset={1} stopColor="#A146E4" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_65_5571"
        x1={168.221}
        y1={34.704}
        x2={95.1605}
        y2={135.293}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#CBA1EA" />
        <stop offset={1} stopColor="#A146E4" />
      </linearGradient>
    </defs>
  </svg>
);
export default SVGComponent;

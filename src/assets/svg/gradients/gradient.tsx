import * as React from "react";
import { SVGProps } from "@/types";

const SVGComponent = (props: SVGProps) => (
  <svg
    width={860}
    height={1024}
    viewBox="0 0 860 1024"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_f_29_43)">
      <ellipse
        cx={454.397}
        cy={322.5}
        rx={162.908}
        ry={42.2612}
        transform="rotate(-67.0678 454.397 322.5)"
        fill="#A4CDFD"
      />
    </g>
    <g filter="url(#filter1_f_29_43)">
      <path
        d="M196.445 830C151.441 760.287 141.133 727.718 156.98 684.537L196.445 575.767C267.053 463.917 433.238 451.271 490.068 401.473C546.899 351.675 530.323 239.629 581.628 171.484C632.933 103.339 780.313 170.067 801.846 282.22L820 436.201C780.645 664.068 702.027 761.365 434.027 866.038C321.412 892.413 270.643 881.973 196.445 830Z"
        fill="#E8D0FF"
      />
    </g>
    <g filter="url(#filter2_f_29_43)">
      <ellipse
        cx={605.402}
        cy={483.133}
        rx={179.149}
        ry={28.5504}
        transform="rotate(-65.8291 605.402 483.133)"
        fill="#FFE19E"
      />
    </g>
    <defs>
      <filter
        id="filter0_f_29_43"
        x={229.928}
        y={21.5527}
        width={448.938}
        height={601.895}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation={75} result="effect1_foregroundBlur_29_43" />
      </filter>
      <filter
        id="filter1_f_29_43"
        x={0}
        y={-6}
        width={970}
        height={1036}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation={75} result="effect1_foregroundBlur_29_43" />
      </filter>
      <filter
        id="filter2_f_29_43"
        x={377.539}
        y={169.266}
        width={455.725}
        height={627.735}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation={75} result="effect1_foregroundBlur_29_43" />
      </filter>
    </defs>
  </svg>
);
export default SVGComponent;

import * as React from "react";
import { SVGProps } from "@/types";

const SVGComponent = ({ fill = "currentColor", ...props }: SVGProps) => (
  <svg
    width={16}
    height={17}
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13.5 10.5V14H10M13.1812 13.6803L9.5 10M2.5 6.5V3H6M2.81875 3.31969L6.5 7M10 3H13.5V6.5M13.1803 3.31875L9.5 7M6 14H2.5V10.5M2.81969 13.6812L6.5 10"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SVGComponent;

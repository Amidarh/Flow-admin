import * as React from "react";
import { SVGProps } from "@/types";

const SVGComponent = ({ fill = "currentColor", ...props }: SVGProps) => (
  <svg
    width={17}
    height={16}
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13.8337 13.3327L10.5003 9.99935M10.5003 9.99935V12.666M10.5003 9.99935H13.167M3.16699 13.3327L6.50033 9.99935M6.50033 9.99935V12.666M6.50033 9.99935H3.83366M13.8337 2.66602L10.5003 5.99935M10.5003 5.99935V3.33268M10.5003 5.99935H13.167M3.16699 2.66602L6.50033 5.99935M6.50033 5.99935V3.33268M6.50033 5.99935H3.83366"
      stroke={fill}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SVGComponent;

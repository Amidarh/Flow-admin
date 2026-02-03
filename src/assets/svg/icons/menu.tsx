import * as React from "react";
import { SVGProps } from "@/types";

const SVGComponent = ({ fill = "currentColor", ...props }: SVGProps) => (
  <svg
    width={24}
    height={25}
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 8.81055H20M4 16.1903H13.4079"
      stroke={fill}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SVGComponent;

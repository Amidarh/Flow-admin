import * as React from "react";
import { SVGProps } from "@/types";

const SVGComponent = ({ fill = "currentColor", ...props }: SVGProps) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M17 9C17 13.4184 13.4184 17 9 17C4.5816 17 1 13.4184 1 9C1 4.5816 4.5816 1 9 1C13.4184 1 17 4.5816 17 9Z"
      stroke={fill}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.9999 9.80156C9.42425 9.80156 9.83121 9.63299 10.1313 9.33293C10.4313 9.03287 10.5999 8.62591 10.5999 8.20156C10.5999 7.77722 10.4313 7.37025 10.1313 7.07019C9.83121 6.77013 9.42425 6.60156 8.9999 6.60156C8.57556 6.60156 8.16859 6.77013 7.86853 7.07019C7.56847 7.37025 7.3999 7.77722 7.3999 8.20156C7.3999 8.62591 7.56847 9.03287 7.86853 9.33293C8.16859 9.63299 8.57556 9.80156 8.9999 9.80156ZM8.9999 9.80156V12.2016"
      stroke={fill}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SVGComponent;

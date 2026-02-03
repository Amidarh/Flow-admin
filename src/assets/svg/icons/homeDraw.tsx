import * as React from "react";
import { SVGProps } from "@/types";

const SVGComponent = ({ fill = "currentColor", ...props }: SVGProps) => (
  <svg
    width={103}
    height={72}
    viewBox="0 0 103 72"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x={16} y={1} width={70} height={70} rx={8} fill="white" />
    <rect x={16} y={1} width={70} height={70} rx={8} stroke="#F2F2F2" />
    <rect x={21} y={13} width={60} height={10} rx={5} fill="#F2F2F2" />
    <rect x={21} y={31} width={60} height={10} rx={5} fill="#F2F2F2" />
    <rect x={21} y={49} width={60} height={10} rx={5} fill="#F2F2F2" />
    <path
      d="M0 47C0 42.5817 3.58172 39 8 39H52C56.4183 39 60 42.5817 60 47V51C60 55.4183 56.4183 59 52 59H0V47Z"
      fill="url(#paint0_linear_92_5586)"
    />
    <rect x={5} y={45} width={50} height={8} rx={4} fill="#BCDCBC" />
    <path
      d="M89.8244 13.8541C90.5254 13.3448 91.4746 13.3448 92.1756 13.8541L101.237 20.4377C101.938 20.947 102.231 21.8497 101.964 22.6738L98.5025 33.3262C98.2347 34.1503 97.4668 34.7082 96.6003 34.7082H85.3997C84.5332 34.7082 83.7653 34.1503 83.4975 33.3262L80.0364 22.6738C79.7686 21.8497 80.0619 20.947 80.7629 20.4377L89.8244 13.8541Z"
      fill="url(#paint1_linear_92_5586)"
    />
    <path
      d="M84 25C84 21.134 87.134 18 91 18C94.866 18 98 21.134 98 25C98 28.866 94.866 32 91 32H84V25Z"
      fill="url(#paint2_linear_92_5586)"
    />
    <path
      d="M96.25 24.5621V29.8121C96.25 29.9281 96.2039 30.0394 96.1219 30.1215C96.0398 30.2035 95.9285 30.2496 95.8125 30.2496H92.75C92.634 30.2496 92.5227 30.2035 92.4406 30.1215C92.3586 30.0394 92.3125 29.9281 92.3125 29.8121V26.9683C92.3125 26.9103 92.2895 26.8547 92.2484 26.8137C92.2074 26.7726 92.1518 26.7496 92.0938 26.7496H89.9062C89.8482 26.7496 89.7926 26.7726 89.7516 26.8137C89.7105 26.8547 89.6875 26.9103 89.6875 26.9683V29.8121C89.6875 29.9281 89.6414 30.0394 89.5594 30.1215C89.4773 30.2035 89.366 30.2496 89.25 30.2496H86.1875C86.0715 30.2496 85.9602 30.2035 85.8781 30.1215C85.7961 30.0394 85.75 29.9281 85.75 29.8121V24.5621C85.7501 24.3301 85.8424 24.1076 86.0065 23.9436L90.3815 19.5686C90.5456 19.4046 90.768 19.3125 91 19.3125C91.232 19.3125 91.4544 19.4046 91.6185 19.5686L95.9935 23.9436C96.1576 24.1076 96.2499 24.3301 96.25 24.5621Z"
      fill="white"
    />
    <defs>
      <linearGradient
        id="paint0_linear_92_5586"
        x1={30}
        y1={39}
        x2={30}
        y2={59}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#9DD29C" />
        <stop offset={1} stopColor="#56A954" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_92_5586"
        x1={91}
        y1={13}
        x2={91}
        y2={37}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#9DD29C" />
        <stop offset={1} stopColor="#56A954" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_92_5586"
        x1={91}
        y1={18}
        x2={91}
        y2={32}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#9DD29C" />
        <stop offset={1} stopColor="#56A954" />
      </linearGradient>
    </defs>
  </svg>
);
export default SVGComponent;

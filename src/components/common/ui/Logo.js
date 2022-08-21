import { Icon } from '@chakra-ui/react';

const Logo = ({ ...props }) => {
  return (
    <Icon viewBox="0 0 71 72" width="71px" height="71px" {...props}>
      <path
        d="M30.5 13.1754C33.9034 11.2105 38.0966 11.2105 41.5 13.1754L53.0167 19.8246C56.4201 21.7895 58.5167 25.4209 58.5167 29.3509V42.6491C58.5167 46.5791 56.4201 50.2105 53.0167 52.1754L41.5 58.8246C38.0966 60.7895 33.9034 60.7895 30.5 58.8246L18.9833 52.1754C15.5799 50.2105 13.4833 46.5791 13.4833 42.6491V29.3509C13.4833 25.4209 15.5799 21.7895 18.9833 19.8246L30.5 13.1754Z"
        fill="url(#paint0_linear_11_50)"
      />
      <g filter="url(#filter0_dddddd_11_50)">
        <circle cx="36" cy="36" r="12.2422" fill="url(#paint1_linear_11_50)" />
      </g>
      <defs>
        <filter
          id="filter0_dddddd_11_50"
          x="0.873482"
          y="0.873482"
          width="70.2529"
          height="70.2529"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="0.272433" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_11_50" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="0.544865" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
          <feBlend mode="normal" in2="effect1_dropShadow_11_50" result="effect2_dropShadow_11_50" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="1.90703" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
          <feBlend mode="normal" in2="effect2_dropShadow_11_50" result="effect3_dropShadow_11_50" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="3.81406" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.980392 0 0 0 0 0.839216 0 0 0 1 0"
          />
          <feBlend mode="normal" in2="effect3_dropShadow_11_50" result="effect4_dropShadow_11_50" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="6.53838" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.980392 0 0 0 0 0.839216 0 0 0 1 0"
          />
          <feBlend mode="normal" in2="effect4_dropShadow_11_50" result="effect5_dropShadow_11_50" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="11.4422" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.980392 0 0 0 0 0.839216 0 0 0 1 0"
          />
          <feBlend mode="normal" in2="effect5_dropShadow_11_50" result="effect6_dropShadow_11_50" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect6_dropShadow_11_50" result="shape" />
        </filter>
        <linearGradient
          id="paint0_linear_11_50"
          x1="23.4081"
          y1="17.3453"
          x2="50.8072"
          y2="54.1883"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.269738" stopColor="#C91800" />
          <stop offset="1" stopColor="#F8A300" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_11_50"
          x1="28.4215"
          y1="26.3228"
          x2="43.4618"
          y2="45.7937"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#DEDEDE" />
        </linearGradient>
      </defs>
    </Icon>
  );
};

export default Logo;

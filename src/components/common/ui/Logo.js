import { Icon } from '@chakra-ui/react';

const Logo = ({ size = 42, ...props }) => {
  return (
    <Icon viewBox="0 0 203 203" width={`${size}px`} height={`${size}px`} {...props}>
      <circle cx="102" cy="102" r="72" fill="url(#paint0_linear_24_21)" fill-opacity="0.6" />
      <circle cx="101.5" cy="101.5" r="101.5" fill="url(#paint1_linear_24_21)" fill-opacity="0.9" />
      <circle cx="102" cy="102" r="50" fill="url(#paint2_linear_24_21)" fill-opacity="0.3" />
      <defs>
        <linearGradient
          id="paint0_linear_24_21"
          x1="65.0886"
          y1="37.2911"
          x2="132.532"
          y2="168.076"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F9B93C" />
          <stop offset="0.633727" stopColor="#AC1707" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_24_21"
          x1="49.4652"
          y1="10.2785"
          x2="144.541"
          y2="194.649"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.112894" stopColor="#F9B93C" />
          <stop offset="1" stopColor="#AC1707" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_24_21"
          x1="76.3671"
          y1="57.0633"
          x2="123.203"
          y2="147.886"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F9B93C" />
          <stop offset="0.545186" stopColor="#AC1707" />
        </linearGradient>
      </defs>
    </Icon>
  );
};

export default Logo;

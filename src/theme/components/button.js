import { gradient } from 'theme/colors';

const Button = {
  baseStyle: {
    borderRadius: '3xl',
    _hover: {
      transform: `scale(1.04)`,
    },
  },
  defaultProps: {
    variant: 'solid',
  },
  variants: {
    solid: {
      bgImage: gradient,
      _hover: {
        bgImage: gradient,
      },
    },
  },
};

export default Button;

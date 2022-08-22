import { Image } from '@chakra-ui/react';
import fallbackSrc from 'assets/images/coin.png';

const AssetIcon = ({ src, ...props }) => {
  return (
    <Image
      boxSize="42px"
      borderRadius="full"
      src={src}
      fallbackSrc={fallbackSrc}
      bgColor="none"
      {...props}
    />
  );
};

export default AssetIcon;

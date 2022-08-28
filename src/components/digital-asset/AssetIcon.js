import { Image } from '@chakra-ui/react';
import fallbackSrcToken from 'assets/images/coin.png';
import fallbackSrcNft from 'assets/images/nft.png';

const AssetIcon = ({ src, isNft, ...props }) => {
  return (
    <Image
      boxSize="42px"
      borderRadius="full"
      src={src}
      fallbackSrc={isNft ? fallbackSrcNft : fallbackSrcToken}
      bgColor="none"
      {...props}
    />
  );
};

export default AssetIcon;

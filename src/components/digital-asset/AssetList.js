import { Box } from '@chakra-ui/react';
import AssetItem from './AssetItem';

const AssetList = ({ assetAddresses = [], ...props }) => {
  return (
    <Box maxH="400px" overflowY="scroll" {...props}>
      {assetAddresses.slice(0, 4)?.map(assetAddress => (
        <AssetItem key={assetAddress} assetAddress={assetAddress} my={1} />
      ))}
      <Box py={8} />
    </Box>
  );
};

export default AssetList;

import { Box, Divider, Text, VStack } from '@chakra-ui/react';
import { useGetVaultAssets } from 'api/vault/getVaultAssets';
import { Identicon } from 'components/common';
import { CopyableAddress } from 'components/common/ui';
import { AssetList, SkeletonAssetList } from 'components/digital-asset';
import { useLocation, useNavigate } from 'react-router-dom';
import Path from 'router/paths';

const VaultDetailView = ({ ...props }) => {
  const { state: vault } = useLocation();
  const navigate = useNavigate();
  const { data, isFetching, isLoading, error } = useGetVaultAssets({
    vaultAddress: vault?.address,
  });

  const handleSend = assetAddress => {
    console.log({ assetAddress });
    const state = { assetAddress, fromAddress: vault?.address };
    navigate(Path.TX_SEND_ASSET, { state });
  };

  return (
    <VStack spacing={0} {...props}>
      <Identicon address={vault.address} size={32} />
      <Text fontWeight="semibold" textAlign="center">
        {vault.label}
      </Text>
      <CopyableAddress address={vault.address} />
      <Divider />
      <Box alignSelf="stretch" px={2}>
        {isLoading ? (
          <SkeletonAssetList />
        ) : (
          <AssetList
            assetAddresses={data || []}
            ownerAddress={vault?.address}
            onSendClick={handleSend}
          />
        )}
      </Box>
    </VStack>
  );
};

export default VaultDetailView;

import { useQuery } from 'react-query';
import ERC725 from '@erc725/erc725.js';
import uProfileMetadataSchema from '@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json';
import { web3Provider } from 'lib/web3';
import { ipfsGateway } from 'settings/config';
import { ipfsToUrl } from 'utils/ipfs';
const config = { ipfsGateway };

const formatMetadata = data => {
  const metadata = {};

  if (!data) {
    return metadata;
  }

  data.forEach(d => {
    switch (d.name) {
      case 'LSP3Profile':
        metadata.profile = parseProfile(d.value);
        break;
      case 'LSP12IssuedAssets[]':
        metadata.issuedAssets = d.value || [];
        break;
      case 'LSP5ReceivedAssets[]':
        metadata.receivedAssets = d.value || [];
        break;
      default:
        break;
    }
  });

  return metadata;
};

export const parseProfile = value => {
  const lsp3Profile = value['LSP3Profile'];
  const avatar = lsp3Profile.profileImage?.[0]?.url;
  const backgroundImage = lsp3Profile.backgroundImage?.[0]?.url;

  return {
    name: lsp3Profile.name,
    description: lsp3Profile.description,
    avatar: avatar ? ipfsToUrl(avatar) : null,
    backgroundImage: backgroundImage ? ipfsToUrl(backgroundImage) : null,
    links: lsp3Profile.links,
    tags: lsp3Profile.tags,
  };
};

const getUniversalProfileMetadata = async ({ profileAddress }) => {
  const profile = new ERC725(uProfileMetadataSchema, profileAddress, web3Provider, config);
  const data = await profile.fetchData();
  const profileData = formatMetadata(data);
  return profileData;
};

export const useGetUniversalProfileMetadata = ({ profileAddress }) => {
  return useQuery(
    ['LSP3UniversalProfileMetadata', { profileAddress }],
    () => getUniversalProfileMetadata({ profileAddress }),
    {
      enabled: !!profileAddress,
    }
  );
};

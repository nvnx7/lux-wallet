import { useQuery } from 'react-query';
import ERC725 from '@erc725/erc725.js';
import upMetadataSchema from '@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json';
import { web3Provider } from 'lib/web3';
import { ipfsGateway } from 'settings/config';
import { ipfsToUrl } from 'utils/ipfs';
import QueryKey from 'api/utils/query';
const config = { ipfsGateway };

/**
 * Formats the received universal profile metadata
 */
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

/**
 * Parses the universal profile data to plain format
 */
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

/**
 * Retrieves given universal profile's metadata
 * & returns a formatted data
 */
const getUniversalProfileMetadata = async ({ profileAddress }) => {
  const profile = new ERC725(upMetadataSchema, profileAddress, web3Provider, config);
  const data = await profile.fetchData();
  const profileData = formatMetadata(data);
  return profileData;
};

export const useGetUniversalProfileMetadata = ({ profileAddress }) => {
  return useQuery(
    [QueryKey.UP_METADATA, { profileAddress }],
    () => getUniversalProfileMetadata({ profileAddress }),
    {
      enabled: !!profileAddress,
    }
  );
};

import { ipfsToUrl } from './ipfs';

export const formatLSP3Metadata = data => {
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

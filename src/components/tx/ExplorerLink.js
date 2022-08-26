import { Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from 'components/icons';
import { useTranslation } from 'react-i18next';
import { getExplorerLink } from 'utils/web3';

const ExplorerLink = ({ address, variant, type = 'address', icon = {}, ...props }) => {
  const { t } = useTranslation();
  return (
    <Link
      href={getExplorerLink(address, type)}
      isExternal
      color="whiteAlpha.700"
      fontSize="sm"
      display="flex"
      alignItems="center"
      {...props}
    >
      {variant !== 'icon' && t('tx:view-on-explorer')} <ExternalLinkIcon {...icon} />
    </Link>
  );
};

export default ExplorerLink;

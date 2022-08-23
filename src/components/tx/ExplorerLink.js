import { Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from 'components/icons';
import { useTranslation } from 'react-i18next';
import { getExplorerLink } from 'utils/web3';

const ExplorerLink = ({ address, variant, ...props }) => {
  const { t } = useTranslation();
  return (
    <Link
      href={getExplorerLink(address)}
      isExternal
      color="whiteAlpha.700"
      fontSize="sm"
      display="flex"
      alignItems="center"
      {...props}
    >
      {variant !== 'icon' && t('tx:view-on-explorer')} <ExternalLinkIcon />
    </Link>
  );
};

export default ExplorerLink;

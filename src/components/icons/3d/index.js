import { Image } from '@chakra-ui/react';
import rocketSrc from 'assets/images/rocket.png';
import coinSrc from 'assets/images/coin.png';
import coinFlatSrc from 'assets/images/coin-flat.png';
import safeSrc from 'assets/images/safe.png';
import purseSrc from 'assets/images/purse.png';
import pageSrc from 'assets/images/page.png';
import userSrc from 'assets/images/user.png';
import sendSrc from 'assets/images/send.png';
import keySrc from 'assets/images/key.png';
import walletSrc from 'assets/images/wallet.png';
import heartSrc from 'assets/images/heart.png';

// All 3d icons
const Icon3d = ({ src, size = 10, ...props }) => {
  return <Image boxSize={size} src={src} {...props} />;
};

export const RocketIcon = props => <Icon3d src={rocketSrc} {...props} />;
export const SafeIcon = props => <Icon3d src={safeSrc} {...props} />;
export const PurseIcon = props => <Icon3d src={purseSrc} {...props} />;
export const PageIcon = props => <Icon3d src={pageSrc} {...props} />;
export const UserIcon = props => <Icon3d src={userSrc} {...props} />;
export const CoinIcon = props => <Icon3d src={coinSrc} {...props} />;
export const CoinFlatIcon = props => <Icon3d src={coinFlatSrc} {...props} />;
export const SendIcon = props => <Icon3d src={sendSrc} {...props} />;
export const KeyIcon = props => <Icon3d src={keySrc} {...props} />;
export const WalletIcon = props => <Icon3d src={walletSrc} {...props} />;
export const HeartIcon = props => <Icon3d src={heartSrc} {...props} />;

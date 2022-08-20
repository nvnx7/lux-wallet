import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

const Identicon = ({ address = '', variant = 'circle', size = 64 }) => {
  return (
    <Jazzicon
      diameter={size}
      seed={jsNumberForAddress(address)}
      paperStyles={{ borderRadius: variant === 'square' ? '8px' : '50%' }}
    />
  );
};

export default Identicon;

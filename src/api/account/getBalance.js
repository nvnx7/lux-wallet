import { useQuery } from 'react-query';
import web3 from 'lib/web3';
import { isValidAddress } from 'utils/web3';
import QueryKey from 'api/utils/query';

const getAddressBalance = async ({ address }) => {
  const wei = await web3.eth.getBalance(address);
  const lyx = parseFloat(web3.utils.fromWei(wei, 'ether')).toFixed(2);
  return { wei, lyx };
};

/**
 * Fetches native token balance of an address
 */
export const useGetBalance = ({ address }) => {
  return useQuery([QueryKey.BALANCE, { address }], () => getAddressBalance({ address }), {
    enabled: isValidAddress(address),
  });
};

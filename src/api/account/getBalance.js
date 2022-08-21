import { useQuery } from 'react-query';
import web3 from 'scripts/web3';

const getAddressBalance = async ({ address }) => {
  const wei = await web3.eth.getBalance(address);
  const lyx = parseFloat(web3.utils.fromWei(wei, 'ether')).toFixed(2);
  return { wei, lyx };
};

export const useGetBalance = ({ address }) => {
  return useQuery(['balance', { address }], () => getAddressBalance({ address }), {
    enabled: !!address,
  });
};

import { useQuery } from 'react-query';
import web3 from 'lib/web3';
import tokenAbi from 'api/utils/abi/legacyToken.json';
import { makeBatchCall } from 'api/utils/tx';
import { logError } from 'utils/logger';

/**
 * Fetches a legacy (ERC20/ERC721) token's metadata (name/symbol)
 * and balance of given owner address in a batch call
 */
const getToken = async ({ ownerAddress, tokenAddress }) => {
  const token = new web3.eth.Contract(tokenAbi, tokenAddress);
  const calls = [
    token.methods.name().call,
    token.methods.symbol().call,
    token.methods.balanceOf(ownerAddress).call,
  ];

  const [name, symbol, wei] = await makeBatchCall(web3, calls);
  const lyx = parseFloat(web3.utils.fromWei(wei, 'ether')).toFixed(2);
  return {
    name,
    symbol,
    balance: { wei, lyx },
  };
};

/**
 * Fetches legacy token info
 */
export const useGetLegacyToken = ({ ownerAddress, tokenAddress }) => {
  return useQuery(
    ['legacyToken', { ownerAddress, tokenAddress }],
    () => getToken({ ownerAddress, tokenAddress }),
    { enabled: !!ownerAddress && !!tokenAddress, onError: logError }
  );
};

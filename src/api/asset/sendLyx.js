import { sendSignedTx } from 'api/utils/tx';
import { useMutation } from 'react-query';
import web3 from 'lib/web3';
import UniversalProfile from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import KeyManager from '@lukso/lsp-smart-contracts/artifacts/LSP6KeyManager.json';
import { areEqualHex } from 'utils/web3';
import useSentTxStore from 'hooks/useSentTxStore';
import { logError } from 'utils/logger';
import { QueryKey, useInvalidateQuery } from 'api/utils/query';

const sendLyx = async params => {
  const { accountAddress, from, to, amount } = params;

  const amountWei = web3.utils.toWei(`${amount}`, 'ether');
  const txData = {
    from,
    to,
    value: amountWei,
    gas: 30000,
  };

  // Assuming, LYX is either transferred from account address or
  // related universal profile address.
  if (!areEqualHex(from, accountAddress)) {
    // Send from universal profile
    const up = new web3.eth.Contract(UniversalProfile.abi, from);
    const kmAddress = await up.methods.owner().call();
    const km = new web3.eth.Contract(KeyManager.abi, kmAddress);
    const payload = await up.methods.execute(0, to, amountWei, '0x').encodeABI();
    const data = await km.methods.execute(payload).encodeABI();
    txData.from = accountAddress;
    txData.to = kmAddress;
    txData.value = '0'; // Not sending from account/eoa address
    txData.data = data;
    txData.gas = 300_000;
  }

  const data = await sendSignedTx(txData, accountAddress);

  return data;
};

/**
 * For sending native LYX coins
 */
export const useSendLyx = ({ accountAddress }) => {
  const { invalidateQueries } = useInvalidateQuery();
  const { storeSentTx } = useSentTxStore({ accountAddress });
  return useMutation(params => sendLyx(params), {
    onSuccess: tx => {
      storeSentTx(tx);
      invalidateQueries([QueryKey.BALANCE]);
    },
    onError: logError,
  });
};

import ERC725 from '@erc725/erc725.js';
import uProfileMetadataSchema from '@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json';
import { web3Provider } from 'scripts/web3';
import { ipfsGateway } from 'settings/config';

const config = { ipfsGateway };

/**
 * Singleton factory for ERC725 Profile instance.
 */
const UProfile = (function () {
  let instance;
  return {
    getInstance: function (addr) {
      if (!instance || instance.address !== addr) {
        instance = new ERC725(uProfileMetadataSchema, addr, web3Provider, config);
      }
      return instance;
    },
  };
})();

export default UProfile;

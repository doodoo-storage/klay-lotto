// @ts-ignore
import Caver from 'caver-js';
import abi from './abi.json';

(async () => {
  const caver = new Caver(process.env.BAOBAB_ENDPOINT_NODE_URL);

  const contract = new caver.contract(abi, process.env.CONTRACT_ADDRESS);
});
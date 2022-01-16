import Caver, { AbiItem, Contract } from 'caver-js';
import env from 'env-var';

import abi from './abi.json';

const ENDPOINT_NODE_URL = env.get('ENDPOINT_NODE_URL').required().asString();

let caverContract: Contract;

export const getCaverContract = () => 
  caverContract ? caverContract : createCaverContract();


const createCaverContract = () => {
  const caver = new Caver(ENDPOINT_NODE_URL);
  
  const contract = new caver.contract(abi as AbiItem[], process.env.CONTRACT_ADDRESS);
  
  caverContract = contract;
  return contract;
}
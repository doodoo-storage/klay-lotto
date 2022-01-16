import cron from 'node-cron';
import Caver from 'caver-js';
import env from 'env-var';
import { getCaverContract } from './contract/lottery-contract-test';

const ENDPOINT_NODE_URL = env.get('ENDPOINT_NODE_URL').required().asString();
const WALLET_ADDRESS = env.get('WALLET_ADDRESS').required().asString();
const PRIVATE_KEY = env.get('PRIVATE_KEY').required().asString();

export const endLotteryScheduler = () => 
  cron.schedule('0 0 0 * * *', async () => {
    const caver = new Caver(ENDPOINT_NODE_URL);

    // @ts-ignore
    await caver.wallet.keyring.create(WALLET_ADDRESS, PRIVATE_KEY);
    
    await getCaverContract().methods.joinLottery().send({
      from: WALLET_ADDRESS,
      gas: 10000000000,
      value: 10**18
    });
  })
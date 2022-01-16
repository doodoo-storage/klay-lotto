import 'dotenv/config';

import express from 'express';
import env from 'env-var';
import Caver from 'caver-js';

import { endLotteryScheduler } from './scheduler';
import { getCaverContract } from './contract/lottery-contract-test';

const PORT = env.get('PORT').required().asPortNumber();
const ENDPOINT_NODE_URL = env.get('ENDPOINT_NODE_URL').required().asString();
const WALLET_ADDRESS = env.get('WALLET_ADDRESS').required().asString();
const WALLET_PRIVATE_KEY = env.get('WALLET_PRIVATE_KEY').required().asString();

(async () => {
  endLotteryScheduler();

  const app = express();
  app.use('/images', express.static(`${__dirname}/views/images`));
  app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
  });

  app.get('/test', async (req, res) => {
    const caver = new Caver(ENDPOINT_NODE_URL);

    // @ts-ignore
    await caver.wallet.keyring.create(WALLET_ADDRESS, WALLET_PRIVATE_KEY);
    
    await getCaverContract().methods.endLottery(1).send({
      from: WALLET_ADDRESS,
      gas: 10000000000
    });
  })

  app.listen(PORT, () => { console.log('app started') });
})();
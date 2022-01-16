import 'dotenv/config';

import express from 'express';
import env from 'env-var';

import { endLotteryScheduler } from './scheduler';

const PORT = env.get('PORT').required().asPortNumber();

(async () => {
  endLotteryScheduler();

  const app = express();
  app.use('/images', express.static(`${__dirname}/views/images`));
  app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
  });

  app.listen(PORT, () => { console.log('app started') });
})();
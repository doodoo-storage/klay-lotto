import 'dotenv/config';
import express from 'express';

(() => {
  const app = express();

  app.use('/images', express.static(`${__dirname}/views/images`));

  app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
  })

  app.listen(process.env.PORT, () => { console.log('app started') });
})();
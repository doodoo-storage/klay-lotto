import 'dotenv/config';
import express from 'express';

(() => {
  const app = express();

  app.get('/', (req, res) => { res.status(200).json({ success: true }) });

  app.listen(process.env.PORT, () => { console.log('app started') });
})();
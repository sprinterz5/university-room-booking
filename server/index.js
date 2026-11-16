import express from 'express';
import { fileURLToPath } from 'node:url';

const app = express();
const port = Number(process.env.PORT ?? 3001);
const clientBuild = fileURLToPath(new URL('../dist/', import.meta.url));

app.get('/api/health', (_request, response) => {
  response.json({ ok: true });
});

app.use(express.static(clientBuild));

app.listen(port, '127.0.0.1', () => {
  console.log(`Server listening at http://127.0.0.1:${port}`);
});

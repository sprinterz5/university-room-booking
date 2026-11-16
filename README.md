# University Room Booking Starter

A starter for testing Node.js, Express, React, and Vite together. The **Check server** button calls the Express health endpoint from the React page.

## Run locally

Use Node.js 22.12 or later.

```sh
npm ci
npm run build
npm start
```

Open [http://127.0.0.1:3001](http://127.0.0.1:3001) and click **Check server**. The page should show **Server is responding**.

For development, run `npm run dev:server` and `npm run dev` in separate terminals. Open the address Vite prints. Vite forwards API requests to Express on port 3001.

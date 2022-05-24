const createServer = require('./app');

const app = createServer();

app.listen(process.env.PORT ?? 4000);

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json');

const routes = require('./routes');

const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use('/api', routes);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  return app;
};

module.exports = createServer;

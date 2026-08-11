const express = require('express');
const swaggerUi = require('swagger-ui-express');
const errorHandler = require('./middleware/errorHandler');

let swaggerDocument;
try {
  swaggerDocument = require('../openapi.json');
} catch (e) {
  swaggerDocument = null;
}

const app = express();
app.use(express.json());

// System Endpoints
app.get('/', (req, res) => {
  res.json({ name: 'Task API', version: '2.0', endpoints: ['/tasks'] });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Swagger Route
if (swaggerDocument) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

const taskRoutes = require('./routes/task.routes');
app.use('/tasks', taskRoutes);

// Error Handler Middleware
app.use(errorHandler);

module.exports = app;
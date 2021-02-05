const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const cors = require('cors');
const logger = require('./lib/logger')
const apiRouter = require('./api');
const app = express();

const UPLOAD_DIR = path.resolve(os.tmpdir(), 'uploads');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors())

app.use('/health', (req, res) => res.send('OK')); // Health check
app.use('/api/v1', apiRouter);

app.use(express.static('public'))

let server;
const startServer = async (port = 8000) => {
  try {
    // await initDatabase();
    await fs.ensureDir(UPLOAD_DIR);
    server = app.listen(port, () => logger.info(`Starting Shortify api-server on port ${port}`));
  } catch (error) {
    logger.error(`Error starting express server, ${error.message}`);
    throw error;
  }
}

const stopServer = async () => {
  if (server) {
    await server.close();
  }
}

module.exports = {
  startServer,
  stopServer,
};
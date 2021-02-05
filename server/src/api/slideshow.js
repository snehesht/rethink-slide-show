const { Router } = require('express');
const multer = require('multer')
const path = require('path');
const os = require('os');
const fs = require('fs');

const { BASE_URI } = process.env; 

const UPLOAD_DIR = path.resolve(os.tmpdir(), 'uploads');
const upload = multer({ dest: UPLOAD_DIR })

const logger = require('../lib/logger')

const slideShowRouter = Router();

const fileList = new Map();

// Returns all files in the slide show in order
slideShowRouter.get('/', (req, res) => {
  try {
    // make sure files are returned in order
    const files = [];
    fileList.forEach((value) => files.push(value))
    return res.send(files);
  } catch(error) {
    logger.error(`Failed to list files in the slide show, ${error.message}`);
    return res.status(400).send({ error: 'Failed to get files in the slide show' });
  }
});

slideShowRouter.get('/file/:id', (req, res) => {
  try {
    const { id } = req.params;
    const file = fileList.get(id);
    if (!file) {
      return res.status(404).send({ error: 'File not found'})
    }
    const options = {
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    }
    res.set('Content-Type', file.mimetyoe)
    return res.sendFile(path.resolve(file.path))
  } catch (error) {
    logger.error(`Failed to file by id, ${error.message}`);
    return res.status(400).send({ error: 'Failed to file by id' });
  }
});

slideShowRouter.post('/file', upload.single('slide'), (req, res) => {
  try {
    
    const file = Object.assign({}, req.file, { url: `${BASE_URI}/api/v1/slideshow/file/${req.file.filename}` });
    fileList.set(req.file.filename, file)
    return res.send(file)
  } catch (error) {
    logger.error(`Failed to upload file, ${error.message}`);
    return res.status(400).send({ error: 'Failed to upload' });
  }
});

slideShowRouter.delete('/file/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const file = fileList.get(id);
    if (!file) {
      return res.status(404).send({ error: 'File not found' })
    }
    fileList.delete(id);
    fs.unlinkSync(path.resolve(file.path));
    return res.send({ message: 'Removed file' });
  } catch (error) {
    logger.error(`Failed to file by id, ${error.message}`);
    return res.status(400).send({ error: 'Failed to file by id' });
  }
});

module.exports = slideShowRouter;
const { Router } = require('express');
const slideShowRouter = require('./slideshow');

const apiRouter = Router();

apiRouter.use('/slideshow', slideShowRouter);

module.exports = apiRouter;
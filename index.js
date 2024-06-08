import express from 'express'
import routes from './app/routers/routes.js';
import globalErrorHandler from './utils/errors/globalErrorHandler.js';
import { bootstrap, globalMiddlewares, handleRouteNotFound } from './utils/server/index.js';

const app = express();

// middleware
globalMiddlewares(app);

// all routes
app.use('/api/v1', routes);

// files route
app.use('/public', express.static('public'))

// global error handler
app.use(globalErrorHandler);

// handle route not found
app.use(handleRouteNotFound)

// server & database
bootstrap(app);
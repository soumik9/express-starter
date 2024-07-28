import express from 'express'
import routes from './app/routers/routes.js';
import globalErrorHandler from './utils/errors/globalErrorHandler.js';
import bootstrap from './utils/server/bootstrap.js';
import handleRouteNotFound from './utils/server/handleRouteNotFound.js';
import globalMiddlewares from './utils/server/globalMiddlewares.js';

const app = express();

// middleware
globalMiddlewares(app);

// all routes
app.use('/api/v1', routes);

app.get('/', (req, res) => {
    res.send("Hellow")
})

// files route
app.use('/public', express.static('public'))

// global error handler
app.use(globalErrorHandler);

// handle route not found
app.use(handleRouteNotFound)

// server & database
bootstrap(app);
import express from 'express';
import { AuthRouter, OrganizerRouter } from './index.js';

const router = express.Router();

const apiRoutes = [
    {
        path: '/auth',
        route: AuthRouter,
    },
    {
        path: '/organizer',
        route: OrganizerRouter,
    },
];

apiRoutes.forEach(route => router.use(route.path, route.route));
export default router;
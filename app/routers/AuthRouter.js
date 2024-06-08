import express from 'express'
const router = express.Router();

// middlewares
import auth from '../middleware/auth.js';

// controllers
import AuthController from '../controllers/AuthController.js';

//routes
router.post('/signin', AuthController.Signin);
router.get('/profile', auth(), AuthController.Profile);

export const AuthRouter = router;
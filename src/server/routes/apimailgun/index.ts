import * as express from 'express';
import contactRouter from './contact';

const router = express.Router();

router.use('/contact', contactRouter)

export default router;

//git commit -m "created branch for auth integration - jwt, bcrypt, passport, passport strategies installed"
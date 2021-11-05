import * as express from 'express';
import contactRouter from './contact'

const router = express.Router();

router.use('/contact', contactRouter)

export default router;
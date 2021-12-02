import { Router} from 'express';
import apiRouter from './api';
import authRouter from './auth';
import mailgun_Router from './apimailgun';

const router = Router();

router.use('/api', apiRouter)
router.use('/auth', authRouter)
router.use('/apimailgun', mailgun_Router)

export default router;
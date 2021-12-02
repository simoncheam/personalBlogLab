import { Router} from 'express';
import loginRouter from './login';
import registerRouter from './register';
import validateRouter from './validate'

const router = Router();

router.use('/login', loginRouter);
router.use('/register', registerRouter);
router.use('/validate', validateRouter);


export default router;
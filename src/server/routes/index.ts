import * as express from 'express';
import blogs_router from './blogs';
import authors_router from './authors';
import tags_router from './tags';

const router = express.Router();

router.use('/blogs', blogs_router);
router.use('/authors', authors_router);
router.use('/tags', tags_router);

export default router;
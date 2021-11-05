import * as express from 'express';
import blogs_router from './blogs';
import authors_router from './authors';
import tags_router from './tags';
import donate_router from './donate';

import mailgun_Router from './apimailgun';

const router = express.Router();

router.use('/apimailgun', mailgun_Router)

router.use('/blogs', blogs_router);
router.use('/authors', authors_router);
router.use('/tags', tags_router);
router.use('/donate', donate_router);

export default router;
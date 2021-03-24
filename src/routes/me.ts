import { Router } from 'express';

import me from '../controllers/me';
import auth from '../middlewares/auth';

const router = Router();

router.get('/', auth, me);

export default router;

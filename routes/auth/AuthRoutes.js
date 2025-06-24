import express from 'express';
import register from '../../controllers/auth/register.js';
import signIn from '../../controllers/auth/signIn.js';


const router = express.Router();

router.post('/signup', register);
router.post('/signin', signIn);


export default router;
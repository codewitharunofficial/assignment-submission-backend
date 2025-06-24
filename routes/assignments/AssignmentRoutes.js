import express from 'express';
import submit from '../../controllers/assignments/submit.js';
import ExpressFormidable from 'express-formidable';


const router = express.Router();

router.post('/submit', ExpressFormidable(), submit);
// router.post('/signin', () => {});


export default router;
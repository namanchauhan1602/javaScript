import express from 'express';
import { generateNewShortURL, getAllURLS } from '../controller/urlController.js';
const router = express.Router();

router.get('/getAllURLS', getAllURLS)
router.post('/', generateNewShortURL);

export default router;
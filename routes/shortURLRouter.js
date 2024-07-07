import express from 'express';
import { redirectToURL, redirectURLAnalytics } from '../controller/urlController.js';
const router = express.Router();

router.post('/:shortID', redirectToURL);

router.get('/analytics/:shortID', redirectURLAnalytics);

export default router;
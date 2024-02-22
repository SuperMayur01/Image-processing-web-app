import express from 'express';
import { handleRequest, validateQuery } from './api/image';
const router = express.Router();

//route to get processed image
router.get('/image', validateQuery, handleRequest);

export default router;

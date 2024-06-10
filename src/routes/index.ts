import express from 'express';
import entityRoutes from './entityRoutes';

const router = express.Router();

router.use('/entities', entityRoutes);

export default router;

import { Router } from 'express';
import { topicRouter } from './routes';
import { messageRouter } from './routes';

const router = Router();
router.use("/api/topics", topicRouter);
router.use("/api/messages", messageRouter);

export default router;
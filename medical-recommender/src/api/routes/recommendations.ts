import { Router } from 'express';
import { RecommendationController } from '../controllers/recommendationController';

const router = Router();
const recommendationController = new RecommendationController();

router.post('/recommendations', recommendationController.getRecommendations);

export default router;
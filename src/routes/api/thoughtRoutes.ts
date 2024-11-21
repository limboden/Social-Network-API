import { Router } from 'express';
const router = Router();
import { getThoughts, getSingleThought, createThought, updateThought, deleteThought, addThoughtReaction, removeThoughtReaction } from '../../controllers/thoughtController.js';


router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought);

router
  .route('/:ThoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router.route('/:videoId/responses').post(addThoughtReaction);

router.route('/:videoId/responses/:responseId').delete(removeThoughtReaction);

export default router;

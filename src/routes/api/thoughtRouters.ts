import {Router} from 'express';
const router = Router();

import {
getThoughts,
getOneThought,
createThought,
deleteThought,
updateThought,
createReaction,
deleteReaction,
} from '../../controllers/thoughtController.js'

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getOneThought).delete(deleteThought).put(updateThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions/').post(createReaction);

// /api/thoughts/:thoughtId/reactions/reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

export { router as thoughtRouter} ;
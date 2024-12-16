import {Router} from 'express';
const router = Router();

import {
getUsers,
getUser,
createUser,
updateUser,
deleteUser,
addFriend,
deleteFriend,
} from '../../controllers/userController.js'

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getUser).delete(deleteUser).put(updateUser);

// /api/users/:userId/friends
router.route('/:userId/friends').post(addFriend);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').delete(deleteFriend);

export { router as userRouter} ;
const router = require('express').Router();
const {
  createUser, getAllUsers, getUserById, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');

router.get('/', getAllUsers);

router.get('/:userId', getUserById);

router.post('/', createUser);

router.patch('/me', updateUserProfile);

router.patch('/me/avatar', updateUserAvatar);

module.exports = router;

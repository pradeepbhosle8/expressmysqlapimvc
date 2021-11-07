const { 
	createUsers,
	getUsers,
	getUserByUserId,
	updatedUser,
	deleteUser,
	login

 } = require('./user.controller');
const router = require("express").Router();
const {checkToken} = require('../../auth/token_validation');


router.post('/', checkToken,  createUsers);
router.get('/', checkToken,  getUsers);
router.get('/:id', checkToken,  getUserByUserId);
router.patch('/:id', checkToken, updatedUser);
router.delete('/:id', checkToken, deleteUser);
router.post('/login', login)

module.exports = router;
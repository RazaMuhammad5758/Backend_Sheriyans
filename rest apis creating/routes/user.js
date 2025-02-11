const express = require('express');
const router = express.Router();
const {handleGetAllUsers,handleGetUserById, handleUpdateUserById, handleDeleteUserById, handleCreateUserById} = require("../controllers/user")




// api to get user with specific id
router.get('/', handleGetAllUsers )
router.get('/:id', handleGetUserById )
router.patch('/:id',handleUpdateUserById)
router.delete('/:id', handleDeleteUserById)
router.post('/', handleCreateUserById)

module.exports = router;

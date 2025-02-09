const express = require('express');
const router = express.Router();
const {handleGetAllUsers,handleGetUserById, handleUpdateUserById, handleDeleteUserById} = require("../controllers/user")




// api to get user with specific id
router.get('/', handleGetAllUsers )
router.get('/:id', handleGetUserById )
router.patch('/:id',handleUpdateUserById)
router.delete('/:id', handleDeleteUserById)

router.post('/', async (req, res)=>{
    const body = req.body

    if(
        !body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title
    ) {
        
        return res.status(400).json({msg: 'All fields are required'})
    }
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title
    })
    console.log("user created result", result);
    
    return res.status(201).json({msg: "Success"})

    
    
})

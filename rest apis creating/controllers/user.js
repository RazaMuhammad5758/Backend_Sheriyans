const User = require("../routes/user")

async function handleGetAllUsers(req, res){
    const AllDBUsers = await User.find({});
    return res.json(AllDBUsers);
}
async function handleGetUserById(req, res){
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({ error: "User not found"})
    return res.json(user);
}

async function handleUpdateUserById(req, res) {    
        await User.findByIdAndUpdate(req.params.id, {lastName: "Changed"})
        return res.json({status: "success"})
}

async function handleDeleteUserById(req, res) {    
    await User.findByIdAndDelete(req.params.id)
    return res.json({status: "success"})
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
}
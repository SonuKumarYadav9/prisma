const express = require("express")



const router = express.Router()

const { createAdmin,adminLogin,findAdmin} = require("../controllers/adminController");
const {createUser,updateUser,getUser,deleteUser }= require('../controllers/userController')
const {authMiddleware}=require("../middleware/auth")



// Create a new admin
router.post("/register", createAdmin);
router.get("/admin/:id",findAdmin);


//For Users
router.post("/register/user", authMiddleware,createUser);
router.put("/user-update/:id", authMiddleware,updateUser);
router.get("/users",authMiddleware,getUser);
router.delete("/user-delete/:id",authMiddleware,deleteUser);


// Admin login
router.post("/admin/login", adminLogin);

module.exports = router
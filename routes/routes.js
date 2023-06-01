const express = require("express")



const router = express.Router()

const { createAdmin,adminLogin } = require("../controllers/adminController");
const {createUser}= require('../controllers/userController')
const {authMiddleware}=require("../middleware/auth")



// Create a new admin
router.post("/register", createAdmin);
router.post("/register/user", authMiddleware,createUser);

// Admin login
router.post("/admin/login", adminLogin);

module.exports = router
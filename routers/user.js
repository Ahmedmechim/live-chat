let express=require('express')
const { signUp, login, getUser, createInterUser, getUsers } = require('../controllers/user.controller')
const  auth  = require('../middleware/auth')
const rolevalidator = require('../middleware/role')
let router=express.Router()

router.post("/signUp",signUp)
router.post('/login',login)
router.post('/internetUser',createInterUser)
router.get('/get',auth,getUser)
router.get('/getUsers',auth,rolevalidator(["admin"]),getUsers)
module.exports=router
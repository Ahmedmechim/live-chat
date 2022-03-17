let express=require('express')
const { signUp, login, getUser, createInterUser } = require('../controllers/user.controller')
const  auth  = require('../middleware/auth')
let router=express.Router()

router.post("/signUp",signUp)
router.post('/login',login)
router.post('/internetUser',createInterUser)
router.get('/get',auth,getUser)
module.exports=router
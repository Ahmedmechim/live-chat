let express=require('express')
const { getMessages, sendMessage } = require('../controllers/message.controller')
const  auth  = require('../middleware/auth')

let router=express.Router()
router.get('/getMessages/:conversationId',getMessages)
router.post('/sendMessage/:conversationId',auth,sendMessage)

module.exports=router
let express=require('express')
const { getMessages, sendMessage, getAllmessages, updateMessage } = require('../controllers/message.controller')
const  auth  = require('../middleware/auth')

let router=express.Router()
router.get('/getMessages/:conversationId',getMessages)
router.get('/getAllMessages/',getAllmessages)
router.post('/sendMessage/:conversationId',auth,sendMessage)
router.put('/upMessage/:id',updateMessage)

module.exports=router
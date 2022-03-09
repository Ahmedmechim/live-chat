let express=require('express')
const { getConversations, creatConversation } = require('../controllers/conversation.controller')

let router=express.Router()

router.get('/getConversation',getConversations)
router.post('/createConversation',creatConversation)
module.exports=router
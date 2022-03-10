let express=require('express')
const { getConversations, creatConversation, getOneConversation } = require('../controllers/conversation.controller')

let router=express.Router()

router.get('/getConversations',getConversations)
router.post('/createConversation',creatConversation)
router.get('/getOneConversation/:userId',getOneConversation)

module.exports=router
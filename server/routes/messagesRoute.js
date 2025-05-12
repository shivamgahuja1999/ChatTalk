const { addMessage, getAllMessage } =require('../controllers/messagesController');

const express = require("express");
const router = express.Router();
router.post('/addmessage',addMessage);
router.post('/getmessage',getAllMessage);


module.exports= router;
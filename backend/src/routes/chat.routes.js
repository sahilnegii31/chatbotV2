const express = require("express");
const router = express.Router();
const { getChats, createChat, getResponse } = require("../controllers/chat.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/chats", authMiddleware, getChats);
router.post("/chats", authMiddleware, createChat);
router.post("/response", authMiddleware, getResponse);

module.exports = router;
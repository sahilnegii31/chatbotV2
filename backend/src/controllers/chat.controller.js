const chatModel = require("../models/chat.schema");

const getChats = async (req, res) => {
    try {
        const chats = await chatModel.find({ userId: req.user.id });
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createChat = async (req, res) => {
    try {
        const { message, role } = req.body;
        if (!message || !role) {
            return res.status(400).json({ error: "message and role are required" });
        }

        const newChat = new chatModel({
            message,
            role,
            userId: req.user.id
        });
        await newChat.save();
        res.status(201).json(newChat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getResponse = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: "message is required" });
        }

        const apiKey = process.env.GROK_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: "Groq API key is not configured in .env" });
        }

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "openai/gpt-oss-120b",
                messages: [{ role: "user", content: message }]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({
                error: data.error?.message || "Error received from Groq API"
            });
        }
        const userchat = new chatModel({
            message,
            role: "user",
            userId: req.user.id
        });
        await userchat.save();
        const botReply = data.choices?.[0]?.message?.content || "No response received";
        const chat = new chatModel({
            message: botReply,
            role: "assistant",
            userId: req.user.id
        });
        await chat.save();
        res.status(200).json({ response: botReply ,
            chatId: chat._id
        });
    } catch (error) {
        res.status(500).json({ message : "error in getResponse" , error: error.message });
    }
};

module.exports = { getChats, createChat, getResponse };
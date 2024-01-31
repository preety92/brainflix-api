const express = require('express');
const router = express.Router();
const fs = require("fs");
const { v4: uuid4 } = require('uuid');


const FILE_PATH = "./data/video-details.json";

const ReadVideos = () => {
    try {
        const videosData = fs.readFileSync(FILE_PATH);
        const parsedVideos = JSON.parse(videosData);
        return parsedVideos;
    } catch (error) {
        console.error("Error reading JSON file:", error);
        return [];
    }
};

router.get("/", (req, res) => {
    const videosData = ReadVideos();
    res.json(videosData);
});

router.post("/", (req, res) => {
    try {
        const videoObj = req.body;
        const newPost = {
            id: uuid4(),
            title: videoObj.title,
            channel: videoObj.channel,
        };

        const videoData = ReadVideos();
        videoData.push(newPost);
        fs.writeFileSync(FILE_PATH, JSON.stringify(videoData));
        res.status(201).json(newPost);
    } catch (error) {
        console.error("Error while processing POST request:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const fs = require("fs");


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
module.exports = router;
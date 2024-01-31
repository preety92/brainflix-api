
const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuid4 } = require('uuid');

const VIDEO_DATA_FILE = './data/video-details.json';

const readVideoData = () => {
  try {
    const data = fs.readFileSync(VIDEO_DATA_FILE);
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading video data file:', error);
    return [];
  }
};

router.get('/', (req, res) => {
  const videos = readVideoData();
  res.json(videos);
});

router.get('/:id', (req, res) => {
  const videos = readVideoData();
  const video = videos.find(video => video.id === req.params.id);
  if (video) {
    res.json(video);
  } else {
    res.status(404).json({ error: 'Video not found' });
  }
});

router.post('/', (req, res) => {
  try {
    const { title, channel } = req.body;
    const newVideo = {
      id: uuid4(),
      title,
      channel,
    };

    const videoData = readVideoData();
    videoData.push(newVideo);
    fs.writeFileSync(VIDEO_DATA_FILE, JSON.stringify(videoData, null, 2));

    res.status(201).json(newVideo);
  } catch (error) {
    console.error('Error while processing POST request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;







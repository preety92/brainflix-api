const express = require('express');
const router = express.Router();
const fs = require('fs');
const cors = require('cors');
const { v4: uuid4 } = require('uuid');
const VIDEO_DATA_FILE = './data/video-details.json';
const STATIC_ASSETS_DIR = '../public/Images';
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(STATIC_ASSETS_DIR));
router.use(express.static(STATIC_ASSETS_DIR));

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
    const videos = readVideoData().map(({ id, title, channel, image }) => ({ id, title, channel, image }));
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
    const { title, description, image } = req.body;
    const newVideo = {
      id: uuid4(),
      title,
      description,
      duration:0,
      timestamp:0,
      image: '/Images/image0.jpeg', 
      views: 0,
      likes:0,
      comments: [],
    };

    const videoData = readVideoData();
    videoData.push(newVideo);
    fs.writeFileSync(VIDEO_DATA_FILE, JSON.stringify(videoData, null, 2));

    res.status(201).json(newVideo);
  } catch (error) {
    console.error('Error :', error);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;










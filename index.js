require("dotenv").config();
const express = require("express");
const cors=require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const videoRoutes = require("./routes/videos");

const PORT = process.env.PORT || 8081;
const CLIENT_URL = process.env.CLIENT_URL;

app.use(cors({
    origin: CLIENT_URL
  }));


app.use(express.json());
app.use("/videos", videoRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});


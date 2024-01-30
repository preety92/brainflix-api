require("dotenv").config();
const express = require("express");
const app = express();
const videoRoutes = require("./routes/videos")

const PORT = process.env.PORT || 8081;
app.use(express.json());

app.use("/videos", videoRoutes);
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

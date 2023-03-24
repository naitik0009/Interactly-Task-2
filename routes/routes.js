const express = require("express");
const router = express.Router();
const {downloadVideo,compressVideo} = require("../controller/compress.controller");


//for downloading the video
router.route("/download").get(downloadVideo);

//for uploading and compressing the video
router.route("/compress").post(compressVideo);

module.exports = router;
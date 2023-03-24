//let's use ffmpeg to compress our videos
const ffmpeg = require("fluent-ffmpeg");
//check out the fluent-ffmpeg documentation for more information
const command = new ffmpeg();
const path = require("path");
const fs = require("fs");

//let's create a function for downloading our compressed fie:
const downloadVideo = async(request,response,next)=>{
    const filename = request.headers.filename;
    const getFile = fs.ReadStream();
    console.log(filename);
};


//let's create a function for compressing the UHD file to HD?!:
const compressVideo = async(request,response,next)=>{
    //let's create unique name for our files
    let i = 0;
    //lets extract the extension from our file
    const ext = String(request.files.video.name.split(".")[1]);
    //let's set the file destination :
    const folder = String(path.join(__dirname,"..","/videos"));
    //let's extract the file name:
    const fileName = `${++i}.${ext}`;
    const compressedFileName = `${++i}.mp4`;
    console.log(folder);
    if(!fs.existsSync(folder)){
        fs.mkdirSync(folder);
    }
    const video = request.files.video;
    if(!video){
        return response.status(404).json({status:"error",message:"cannot find video "});
    }
    const uploadPath = path.join(__dirname,'..','/videos/',fileName);
    // var outStream = fs.createWriteStream(String(path.join(__dirname,'..','/videos/compression/',fileName)));
    const move = video.mv(uploadPath,function(error){
        if(error){
            return response.status(400).json({status:"error",message:error});
        }else{
            console.log(uploadPath);
           let command = ffmpeg(uploadPath)
           .output(path.join(__dirname,'..','/videos/compression/',compressedFileName))
           .videoCodec("libx264")
           .audioCodec('libmp3lame')
           .format("mp4")
           
           .setSize("1280x720")
           .on("error",function(error){
                return response.status(400).json({status:"error",message:error+"ffmpeg error"});
            }).on("progress",function(progress){
                console.log(progress.frames);
            }).on("end",function(){
                console.log("finished");
            }).run();
            // .save(path.join(__dirname,'..','/videos/compression/',compressedFileName));
            // command.save(path.join(__dirname,'..','/videos/compression/',"compressed.mp4"));

            // return response.status(200).json({status:"success",message:"file downloaded"});
        }
    });


};

module.exports = {downloadVideo,compressVideo};
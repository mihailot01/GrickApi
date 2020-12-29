var express = require('express');
var multer  = require('multer')
var router = express.Router();
const path = require("path");
var fs=require('fs');
var upload = multer({ dest: 'slike/' })

/* GET home page. */
router.post('/',upload.single('slika'), function(req, res, next) {
  console.log("fileTest")
  const tempPath = req.file.path;
  const targetPath = path.join(tempPath, "../slika.png");
  console.log(tempPath, targetPath);
  fs.rename(tempPath, targetPath, err => {
    if (err) 
      res
        .status(500)
        .contentType("text/plain")
        .end("Oops! Something went wrong!");
    else
      res
        .status(200)
        .contentType("text/plain")
        .end("File uploaded!");
  });
});

router.post('/multiple',upload.any(), function(req, res, next) {
  console.log("fileTest2", req.files)
  /*for(const file of req.files)
  {
    const tempPath = req.file.path;
    const targetPath = path.join(tempPath, "../slika.png");
    console.log(tempPath, targetPath);
    fs.rename(tempPath, targetPath, err => {
      if (err) 
        res
          .status(500)
          .contentType("text/plain")
          .end("Oops! Something went wrong!");
    
    });
  }*/
  res
    .status(200)
    .contentType("text/plain")
    .end("File uploaded!");
});

router.get('/',function(req,res){
  res.send("file Test GET")
})

module.exports = router;

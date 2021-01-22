var express = require('express');
var multer  = require('multer')
var router = express.Router();
const path = require("path");
var fs=require('fs');
var upload = multer({ dest: 'slike/' })
const recepti=require('../database/tabela-recepti');

/* GET home page. */
router.post('/',upload.single('slika'), function(req, res, next) {
  console.log("fileTest");
  const id_recepta= parseInt(req.body.id_recepta);
  console.log(req.body.id_recepta);
  const tempPath = req.file.path;
  const targetPath = path.join(tempPath, "../slika"+id_recepta+".png");
  console.log(tempPath, targetPath);
  fs.rename(tempPath, targetPath, err => {
    if (err) 
      res
        .status(500)
        .contentType("text/plain")
        .end("Oops! Something went wrong!");
    else
    {
      try {
        var response=recepti.upisiSliku(process.env.ADRESA+targetPath,id_recepta);
        res
        .status(200)
        .contentType("text/plain")
        .json(response);
      } catch (error) {
        res
        .status(500)
        .contentType("text/plain")
        .end("GRESKA PRI UPISIVANJU!");
      }
    }
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

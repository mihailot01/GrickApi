var express = require('express');
var multer  = require('multer')
var router = express.Router();
const path = require("path");
var fs=require('fs');
var upload = multer({ dest: 'slike/' })
const recepti=require('../database/tabela-recepti');
const koraci=require('../database/tabela-koraci');

/* GET home page. */
router.post('/',upload.single('slika'), function(req, res, next) {
  console.log("fileTest");
  const id_recepta= parseInt(req.body.id_recepta);
  const ind = parseInt(req.body.ind);
  console.log(req.body.id_recepta);
  const tempPath = req.file.path;
  let pom=""+id_recepta;
  if(ind!=-1)
    pom=pom+"k"+ind;
  const targetPath = path.join(tempPath, "../slika"+pom+".png");
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
        var response;
        if(ind==-1)
          response=recepti.upisiSliku(process.env.ADRESA+targetPath,id_recepta);
        else
          response=koraci.upisiSliku(process.env.ADRESA+targetPath,id_recepta,ind);
        res
        .status(200)
        .contentType("text/plain")
        .json(response);
      } catch (error) {
        res
        .status(500)
        .contentType("text/plain")
        .end("GRESKA PRI UPISIVANJU!"+err);
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

const express = require('express');
var app = express();
var upload = require('express-fileupload');
const http = require('http');
http.Server(app).listen(3000); // создаем сервер

app.use(upload()); // Настроить промежуточное ПО

console.log("Server Started at port 3000");

app.get('/',function(req,res){
  res.sendFile(__dirname+'/index.html');
})
app.post('/upload',function(req,res){//если отправляется запрос на /upload
  console.log(req.files);
  if(req.files.upfile){
    var file = req.files.upfile,
      name = file.name,
      type = file.mimetype;
    var uploadpath = __dirname + '/uploads/' + name;// путь куда сохранять файл
    file.mv(uploadpath,function(err){//https://www.npmjs.com/package/mv
      if(err){
        console.log("File Upload Failed",name,err);
        res.send("Произошла ошибка!")
      }
      else {
        console.log("File Uploaded",name);
        res.send('Done! Uploading files : '+name);
		
      }
    });
 
  }else {
    res.send("No File selected !");
    res.end();
  };
})

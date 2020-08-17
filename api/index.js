var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.listen(3000);

//body-parser 
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

//mongoose  admin-quang123
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:quang123@cluster0.ss48k.mongodb.net/QAlbum?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}, function(err) {
    if(err) {
        console.log("Mongodb connected error!");
    } else{
        console.log("Mongodb connected successfully!");
    }
});

//multer
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()  + "-" + file.originalname)
    }
});  
var upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        console.log(file);
        if(file.mimetype=="image/bmp" ||
           file.mimetype=="image/png" ||
           file.mimetype=="image/jpg" ||
           file.mimetype=="image/jpeg"||
           file.mimetype=="image/gif"
          ){
            cb(null, true)
        }else{
            return cb(new Error('Only image are allowed!'))
        }
    }
}).single("image");

const album = require("./Moduels/album");
const photo = require("./Moduels/photo");


app.post("/api/photo", function (req,res){
    photo.find (function(err, items){
        res.json(items);
    });
});





app.get("/", function(req, res){
    res.render("home");
});

app.get("/album", function(req, res){
    photo.find(function(err, items){
        if(err){
            res.send("Error");
        }else{
            console.log(items);
            res.render("album", {photos:items});
        }
    })
});

app.post("/album", function(req, res){
    var newAlbum = new album({
        name: req.body.txtAlbum,
        userId: "string",
        photos_Id: []
    })
    newAlbum.save(function(err){
        if(err){
            console.log("Save album error!!!" + err);
            res.json({kq:0});
        } else{
            console.log("Save successfully!");
            res.json({kq:1});
        }
    })
})

app.get("/photo", function(req, res){
    res.render("photo");
});


app.post("/photo", function(req,res){
    //unload Image
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          console.log("A Multer error occurred when uploading."); 
          res.json({kq:0, "err": err});
        } else if (err) {
          console.log("An unknown error occurred when uploading." + err);
          res.json({kq:0, "err": err});
        }else{
            console.log("Upload is okay");
            console.log(req.file); // Thông tin file đã upload
            // res.send({kq:1, "file": req.file})

            //save Photo
            var newPhoto = new photo({
            name: req.body.txtName,
            userId: "string",
            date: req.body.date,
            image: req.file.filename        
            });

            newPhoto.save(function(err){
                if(err){
                    console.log("Save photo error!!!" + err);
                    res.json({kq:0});
                } else{
                    console.log("Save photo successfully!");
                    res.json({kq:1});
                }
            })
        }
    });     

});
var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.listen(3000);

//body-parser admin-quang123
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

//mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:quang123@cluster0.ss48k.mongodb.net/QAlbum?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}, function(err) {
    if(err) {
        console.log("Mongodb connected error!");
    } else{
        console.log("Mongodb connected successfully!");
    }
});

const album = require("./Moduels/album");
const photo = require("./Moduels/photo");

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

app.post("/photo", function(req, res){
    var newPhoto = new photo({
        name: req.body.txtName,
        userId: "string",
        date: req.body.date,
        image: req.body.image        
    })
    newPhoto.save(function(err){
        if(err){
            console.log("Save photo error!!!" + err);
            res.json({kq:0});
        } else{
            console.log("Save photo successfully!");
            res.json({kq:1});
        }
    })
});
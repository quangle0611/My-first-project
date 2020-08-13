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

app.get("/", function(req, res){
    res.render("home");
});

app.get("/album", function(req, res){
    res.render("album");
});

app.post("/album", function(req, res){
    var newAlbum = new album({
        name: req.body.txtAlbum,
        photoId: []
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
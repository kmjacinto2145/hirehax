const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000;

app.use("/static", express.static('./static/'));

const emotions = ["angry", "disgusted", "fearful", "happy", "neutral", "sad", "surprised"];


function sampleWithoutReplacement() {
   var randomIndex = Math.floor(Math.random() * questionsJSON.length);
   return questionsJSON.splice(randomIndex, 1)[0];
}

function getRandomImage() {
    var randomEmotionIndex = Math.floor(Math.random() * emotions.length);
    var emotionSelected = emotions[randomEmotionIndex];

    var folderSelected = fs.readdirSync('static/train/' + emotionSelected);
    var randomImageIndex = Math.floor(Math.random() * folderSelected.length);

    return emotionSelected + "/im" + randomImageIndex + ".png";
}

app.listen(port, function() {
    console.log("Server started on port " + port);
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/start.html");
});

app.get("/emotify", function(req, res){
    res.sendFile(__dirname + "/emotify.html");
})

app.get("/questions", function(req, res) {
    // Import questions
    const xlsx = require("xlsx");

    var questions = xlsx.readFile("static/questions.xlsx");
    questions = questions.Sheets[questions.SheetNames[0]];
    questionsJSON = xlsx.utils.sheet_to_json(questions); //global variable

    numberOfQuestions = 8;

    res.sendFile(__dirname + "/questionReadyPage.html");
})

app.get("/question-ready", function(req, res) {
    res.sendFile(__dirname + "/questionReadyPage.html");
})

app.get("/question-page", function(req, res) {
    res.sendFile(__dirname + "/question.html");
})

app.get("/getface", function(req,res){
    var imageFile = getRandomImage();

    res.send("static/train/" + imageFile);
})

app.get("/get-question", function(req, res) {
    //console.log(questionsJSON);
    var currentQuestion = sampleWithoutReplacement();
    numberOfQuestions--;
    res.send(currentQuestion);

});

app.get("/games-menu", function(req, res){
    res.sendFile(__dirname + "/gamesMenu.html")
})

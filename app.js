const express = require("express");
const fs = require("fs");
const bodyParser = require('body-parser')

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use("/static", express.static('./static/'));

const emotions = ["angry", "disgusted", "fearful", "happy", "neutral", "sad", "surprised"];

function getRandomImage() {
    var randomEmotionIndex = Math.floor(Math.random() * emotions.length);
    var emotionSelected = emotions[randomEmotionIndex];

    var folderSelected = fs.readdirSync('static/train/' + emotionSelected);
    var randomImageIndex = Math.floor(Math.random() * folderSelected.length);

    return emotionSelected + "/im" + randomImageIndex + ".png";
}

app.listen(process.env.PORT || port, function() {
    console.log("Server is running");
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/start3.html");
});

app.get("/emotify", function(req, res){
    res.sendFile(__dirname + "/emotify2.html");
})

app.post("/questions", function(req, res) {
    // Import questions
    // console.log(req.body);
    const introQCount = req.body.intro;
    const motivQCount = req.body.motivational;
    const behavQCount = req.body.behavioural;

    const introQList = questionsJSON.filter(function(question) {
        return question.type === "intro";
    });
    var introQSelected = introQList.sort(() => Math.random() - Math.random()).slice(0, introQCount)

    const motivQList = questionsJSON.filter(function(question) {
        return question.type === "motivational";
    });
    var motivQSelected = motivQList.sort(() => Math.random() - Math.random()).slice(0, motivQCount)

    const behavQList = questionsJSON.filter(function(question) {
        return question.type === "behavioural";
    });
    var behavQSelected = behavQList.sort(() => Math.random() - Math.random()).slice(0, behavQCount)

    allQSelected = introQSelected.concat(motivQSelected).concat(behavQSelected);
    // console.log(allQSelected)

    res.sendFile(__dirname + "/questionReadyPage2.html");
})

app.get("/question-ready", function(req, res) {
    // console.log(allQSelected.length);

    if (allQSelected.length === 0) {
        res.sendFile(__dirname + "/endInterview2.html");
    } else {
        res.sendFile(__dirname + "/questionReadyPage2.html");
    }
})

app.get("/question-page", function(req, res) {
    res.sendFile(__dirname + "/question2.html");
})

app.get("/getface", function(req,res){
    var imageFile = getRandomImage();

    res.send("static/train/" + imageFile);
})

app.get("/get-question", function(req, res) {

    var currentQuestion = allQSelected.splice(0, 1)[0];
    res.send(currentQuestion);
});

app.get("/interview-menu", function(req, res){
    res.sendFile(__dirname + "/interviewMenu2.html")
});


app.get("/emotify-menu", function(req, res){
    res.sendFile(__dirname + "/emotifyMenu.html")
});

app.get("/get-question-sheet", function(req,res) {
    const xlsx = require("xlsx");

    var questions = xlsx.readFile("static/questions.xlsx");
    questions = questions.Sheets[questions.SheetNames[0]];
    questionsJSON = xlsx.utils.sheet_to_json(questions); //global variable

    res.send(questionsJSON);
})

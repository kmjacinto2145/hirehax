// Get sheet of questions
const getQuestionSheet = new XMLHttpRequest();
getQuestionSheet.open("GET", "/get-question-sheet", false);
getQuestionSheet.send();
var questionSheet = JSON.parse(getQuestionSheet.response); //JSON of all the questions

// Array of question types
const questionTypes = ["intro", "motivational", "behavioural"];

for (const qType in questionTypes) {
    // Get list of questions for each category
    var questionSet = questionSheet.filter(function(question) {
        return question.type === questionTypes[qType];
    });

    setLen = questionSet.length; //Number of questions in the category

    // Changes the text and input in the interview menu based on the number of questions
    $(".qmenu-label." + questionTypes[qType]).text("Number of " + questionTypes[qType] + " questions (max " + setLen + "):");
    $("#" + questionTypes[qType]).attr("max", setLen);
}

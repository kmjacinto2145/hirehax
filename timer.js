console.log("timer.js")
const currentQuestion = new XMLHttpRequest();
currentQuestion.open("GET", "/getquestion");
currentQuestion.send();

function timer() {
    timeSeconds--;

    // Time's up
    if (timeSeconds < 0) {
        $(".timer").html("Timer done");
        clearInterval(counter);
        return;
    }

    //Get minute and second figures
    var minutes = Math.floor(timeSeconds / 60);
    var seconds = timeSeconds % 60;

    // Updates the timer text
    $(".timer").html(minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0"))

    // Rolls over the seconds whenever a minute passes
    if (seconds == 0) {
        minutes--;
        seconds = 59;
    }
}

$(".question-name").html(currentQuestion.question);

// Preparation timer
var timeSeconds = currentQuestion.prep_time;
timer();
var counter = setInterval(timer, 1000);

// Question timer
timeSeconds = currentQuestion.q_time;
timer();
counter = setInterval(timer, 1000);

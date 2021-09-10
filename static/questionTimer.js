function newQuestion() {
    const getQuestion = new XMLHttpRequest();
    getQuestion.open("GET", "/get-question", false);
    getQuestion.send();

    var currentQuestion = JSON.parse(getQuestion.response);
    $(".question-name").html(currentQuestion.question);

    currentTimeSeconds = currentQuestion.q_time;
    timer();
    counter = setInterval(timer, 1000);

}

function timer() {
    currentTimeSeconds--;

    // Time's up
    if (currentTimeSeconds < 0) {
        $(".timer").html("Timer done, moving to next question...");
        clearInterval(counter);

        // Moves to the next question
        window.location.href = './question-ready';

        return;
    }

    //Get minute and second figures
    var minutes = Math.floor(currentTimeSeconds / 60);
    var seconds = currentTimeSeconds % 60;

    // Pads the minutes and seconds with zeroes to give the appearance
    // of an actual timer
    minutesTimer = minutes.toString().padStart(2, "0")
    secondsTimer = seconds.toString().padStart(2, "0")

    // Updates the timer text
    $(".timer").html(minutesTimer + ":" + secondsTimer)

    // Rolls over the seconds whenever a minute passes
    if (seconds == 0) {
        minutes--;
        seconds = 59;
    }
}

newQuestion();

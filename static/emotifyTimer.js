function timer() {
    timeSeconds--;

    // Time's up
    if (timeSeconds < 0) {
        $(".timer").html("Timer done");
        clearInterval(counter);
        alert("You scored " + correct + " out of " + total + "!");
        window.location = "/"
        return -1;
    }

    //Get minute and second figures
    var minutes = Math.floor(timeSeconds / 60);
    var seconds = timeSeconds % 60;

    // Updates the timer text
    $(".timer").html("Time remaining: " + minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0"))

    // Rolls over the seconds whenever a minute passes
    if (seconds == 0) {
        minutes--;
        seconds = 59;
    }

    return timeSeconds;
}

timeSeconds = 60;

timer();
counter = setInterval(timer, 1000);

correct = 0;
total = 0;

function newFace() {
    var request = new XMLHttpRequest();
    request.open("GET", "/getface", false);
    request.send();

    var imageFile = request.response;
    var currentEmotion = imageFile.split("/")[2];
    // console.log(imageFile);

    $(".emotify-image").attr("src", imageFile);

    // console.log(currentEmotion);

    $(".emotion-button").on("click", function(){
        total++;
        // console.log($(this).text().toLowerCase());
        if (currentEmotion === $(this).text().toLowerCase()) {
            console.log("Correct!");
            correct++;
        } else {
            console.log("Incorrect!");
        }
        return;
    })
}

newFace();

// while (counter >= 0) {
//     newFace();
// }

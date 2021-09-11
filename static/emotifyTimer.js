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

var timeSeconds = 60;

timer();
counter = setInterval(timer, 1000);

var correct = 0;
var total = 0;

function newFace() {
    var request = new XMLHttpRequest();
    request.open("GET", "/getface", false);
    request.send();

    var imageFile = request.response;
    currentEmotion = imageFile.split("/")[2];
    // console.log(imageFile);

    $(".emotify-image").attr("src", imageFile);

    // FIX THIS UP IN CSS
    $(".emotify-image").attr("width", "20%");
    $(".emotify-image").attr("height", "20%");

    return;
    // console.log(currentEmotion);
}

$(".emotion-button").on("click", function(){
    total++;
    console.log(currentEmotion);
    console.log($(this).text().toLowerCase())
    // console.log($(this).text().toLowerCase());
    if (currentEmotion === $(this).text().toLowerCase()) {
        // console.log("Correct!");
        correct++;
    } else {
        // console.log("Incorrect!");
    }

    newFace();

    // console.log("Total:", total);
    // console.log("Correct:", correct);
});

newFace();


// while (counter >= 0) {
//     newFace();
// }

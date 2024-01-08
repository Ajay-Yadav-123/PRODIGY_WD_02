let [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
let displayTime = document.getElementById("display");
let timer = null;
let lapTimes = [];

function stopwatch() {
    milliseconds++
    if (milliseconds == 100) {
        milliseconds = 0;
        seconds++
        if (seconds == 60) {
            seconds = 0;
            minutes++;
            if (minutes == 60) {
                minutes = 0;
                hours++;
            }
        }
    }

    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms = milliseconds < 10 ? "0" + milliseconds : milliseconds;
    displayTime.innerText = h + ":" + m + ":" + s  + ":" + ms;
}

function startStopwatch() {
    if (timer !== null) {
        clearInterval(timer);
    }
    timer = setInterval(stopwatch, 10);
}

function stopStopwatch() {
    clearInterval(timer);
}

function resetStopwatch() {
    clearInterval(timer);
    [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
    displayTime.innerText = "00:00:00:00";
    lapTimes = [];
    updateLapTimes();
}

function lapStopwatch() {
    const lapTime = { hours, minutes, seconds, milliseconds };
    lapTimes.push(lapTime);
    updateLapTimes();
}

function updateLapTimes() {
    const lapTimesContainer = document.getElementById("lapTimesContainer");
    lapTimesContainer.innerHTML = "<strong>Lap Times:</strong><br>";
    lapTimes.forEach((lap, index) => {
        lapTimesContainer.innerHTML += `Lap ${index + 1}: ${formatTime(lap)}<br>`;
    });
}

function formatTime(time) {
    const h = time.hours < 10 ? "0" + time.hours : time.hours;
    const m = time.minutes < 10 ? "0" + time.minutes : time.minutes;
    const s = time.seconds < 10 ? "0" + time.seconds : time.seconds;
    const ms = time.milliseconds < 10 ? "0" + time.milliseconds : time.milliseconds;
    return `${h}:${m}:${s}:${ms}`;
}
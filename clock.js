var timer_id = undefined;

var hostname = window.location.host;
var document_title = document.title;

var paused = false;
var prev_time = moment();

var secs = localStorage[hostname];
if (secs === undefined) {
    secs = 0;
    localStorage[hostname] = secs;
} else {
    secs = parseInt(secs);
}

String.prototype.toHHMM = function () {
    var sec_num = parseInt(this, 10); // don't forget the second parm
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    var time  = hours+':'+minutes;
    return time;
}

function startTimer() {
    console.log('Start timer: ' + timer_id);
    if (timer_id === undefined) {
        timer_id = window.setInterval('time()', 2000);
    }
}

function pauseTimer() {
    console.log('Pause timer');
    if (timer_id !== undefined) {
        window.clearInterval(timer_id);
        timer_id = undefined;
        paused = true;
    }
}


function time(){
  if (paused) {
      paused = false;
      prev_time = moment();
  }
  secs += Math.round((moment() - prev_time) / 1000);
  prev_time = moment();
  console.log(secs);

  showTime(secs);
}

function showTime(seconds) {
    document.title = seconds.toString().toHHMM() + ' ' + document_title;
}

window.addEventListener('focus', function(event) {
    startTimer();
})

window.addEventListener('load', function(event) {
    showTime(secs);
    startTimer();
})

window.addEventListener('blur', function(event) {
    pauseTimer();
    localStorage[hostname] = secs;
})


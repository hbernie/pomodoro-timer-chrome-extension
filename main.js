let ourTimer;
let restartTimer;
let timer;
let sound = new Audio('sound.mp3');
let working = true;
let hidden = false;

function startTimer(duration, display, working) {
  //populating everything to be duration
  timer = duration; 
  let minutes = duration;
  let seconds = duration;


  ourTimer = setInterval(function () {
    //need parseInt so numbers aren't crazy
      minutes = parseInt(timer / 60, 10)
      seconds = parseInt(timer % 60, 10);

      //if minute or second is single digit add the 0 in front
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      //populate display
      display.textContent = minutes + ":" + seconds;

      //if timer decremented is less than 0 then stop timer
      if (--timer < 0) stop(working);

  }, 1000);
  
  function stop(working){
    //stops the interval
    clearInterval(ourTimer);
    // readyForBreak();
    if (working) {
      working = false;
      sound.play();
      let title = document.getElementById("title");
      title.innerHTML = "Break Time!";
      startTimer(5, document.querySelector('#timerDisplay'), working);
    } else if (!working) {
      working = true;
      sound.play();
      let title = document.getElementById("title");
      title.innerHTML = "Back to Work!";
      startTimer(20, document.querySelector('#timerDisplay'), working);
    }
  }

}

document.getElementById('start').onclick = () => {
  restartTimer = timer;
  pause();
  startTimer(restartTimer, document.querySelector('#timerDisplay'), working)
};

document.getElementById('pause').onclick = () => {
  restartTimer = timer
  pause()
};

function pause() {
    clearInterval(ourTimer);
}

document.getElementById('hide').onclick = async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: hidebutton()
  });
}

function hidebutton() {
  const content = document.querySelector('body');
  content.style.display = 'none';
}



//extension starts here
document.addEventListener("DOMContentLoaded", function() {
  let duration = 20, // your time in seconds here
      display = document.querySelector('#timerDisplay');
  startTimer(duration, display, working);

});
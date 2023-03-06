//Timer class design;

class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }
        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);
    }

    start = () => {
        if (this.onStart) {
            this.onStart(this.timeRemaining);
        };
        this.tick();
        this.timer = setInterval(this.tick, 25);
    }

    pause = () => {
        clearInterval(this.timer);
        this.startButton.disabled = false;
    }

    tick = () => {
        if (this.timeRemaining <= 0) {
            this.pause();
            if (this.onComplete) {
                this.onComplete();
            }
        }
        else {
            this.timeRemaining = this.timeRemaining - .05;
            if (this.onTick) {
                this.onTick(this.timeRemaining);
            }
        }
    };

    get timeRemaining() {
        return parseFloat(this.durationInput.value);
    }

    set timeRemaining(time) {
        this.durationInput.value = time.toFixed(2)
    }
}


//execution starts here ;
const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const circle = document.querySelector('circle');


let duration = 0;
let callBackObjectThatHasFunctions = {
    onStart(totalDuration) {
        duration = totalDuration;
        startButton.disabled = true;
    },

    onTick(timeRemaining) {
        circle.setAttribute("stroke-dashoffset",
            perimeter * timeRemaining / duration - perimeter
        );
    },

    onComplete() {
        console.log("timer is completed! ");
        circle.setAttribute("stroke-dashoffset", "0")

    }
}

//start here
const timer = new Timer(durationInput, startButton, pauseButton,callBackObjectThatHasFunctions );

let perimeter = 0;
perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter); 
class StopWatch {
    constructor(callback, interval) {
        if (callback === void 0) { callback = function () { }; }
        if (interval === void 0) { interval = 1000; }
        this.intervalId = null;
        this.callback = callback;
        this.second = 0;
        this.minute = 0;
        this.interval = interval;
    }
    start() {
        var _this = this;
        if (this.intervalId !== null)
            return;
        this.intervalId = window.setInterval(function () {
            _this.increment();
            _this.callback();
        }, this.interval);
    }
    stop() {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
    reset() {
        this.stop();
        this.second = 0;
        this.minute = 0;
    }
    increment() {
        if (this.second === 59) {
            this.minute++;
        }
        this.second = ++this.second % 60;
    }
    getTime() {
        return [this.minute, this.second];
    }
}



var start_btn = document.getElementById("start");
var stop_btn = document.getElementById("stop");
var reset_btn = document.getElementById("reset");
var output = document.getElementById("time");
var stopwatch = new StopWatch(setTime, 1000);
function setTime() {
    var _a = stopwatch.getTime(), minute = _a[0], second = _a[1];
    if (output != null) {
        console.log(second, minute);
        output.innerText = "".concat(minute, " : ").concat(second);
    }
}
start_btn.addEventListener("click", function () { stopwatch.start(); });
stop_btn.addEventListener("click", function () { stopwatch.stop(); });
reset_btn.addEventListener("click", function () { stopwatch.reset(); setTime(); });

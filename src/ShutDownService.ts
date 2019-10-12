//const shutdown = require('electron-shutdown-command');

class ShutDownService{
    private timer: NodeJS.Timer;
    private isShuttingDown:boolean
    shutdownIn(timeoutInSecond: number) {
        if (!this.isShuttingDown) {
            this.timer = setTimeout(this.elapsed, timeoutInSecond * 1000)
            this.isShuttingDown = true;
        }
    }

    private elapsed() {
        //        shutdown.shutdown(); // simple system shutdown with default options

    }
}

export {ShutDownService}

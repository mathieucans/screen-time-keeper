import {ShutDownService} from "./ShutDownService";

import {Store} from "./Store";
import {ScreenTimeKeeper} from "./ScreenTimeKeeper";


const fileStore: Store = new Store({
    configName: "screen-time-keeper",
    defaults: {
        remainingTime: 5 * 60 * 60,
        updateDate: Date.now(),
        originalTime: 5 * 60 * 60,
        shutdownDelay: 60,
        doShutdown:false
    }
})

const timekeeper = new ScreenTimeKeeper(
    fileStore.get("remainingTime") as number,
    new Date(fileStore.get("updateDate") as number),
    fileStore.get("originalTime") as number)
// This file is required by the index.html file and will
// be executed in the renderer process for that window.

function remainingTimeInSecond() {
    let remainingTime = timekeeper.getRemainingTime();
    var reaminTimeInSecond = Math.abs(remainingTime);
    var hours = Math.floor(reaminTimeInSecond / 3600);
    var minutes = Math.floor((reaminTimeInSecond - hours * 3600) / 60);
    var seconds = Math.floor(reaminTimeInSecond - hours * 3600 - minutes * 60);
    let display = hours + ":" + minutes + ":" + seconds;
    if (remainingTime >= 0)
        return display;
    else
        return "-" + display
}

let updateTimer: NodeJS.Timer

function start() {
    updateTimer = setInterval(onTimer, 1000);
}

const shutDownService = new ShutDownService();
const shutdownDelay = fileStore.get('shutdownDelay') as number;
const doShutdown = fileStore.get('doShutdown') as boolean;
console.log("-shutdownDelay:"+shutdownDelay)
console.log("-doShutdown:"+doShutdown)

function onTimer() {
    timekeeper.update(new Date(Date.now()), 1)
    let remainingTime = timekeeper.getRemainingTime();
    document.getElementById("remainTemp").innerText = remainingTimeInSecond()
    fileStore.set("remainingTime", remainingTime)
    fileStore.set("updateDate", Date.now())

    if (remainingTime <= 0) {
        if (document.body.style.backgroundColor !== "red")
            document.body.style.backgroundColor = "red";
        else
            document.body.style.backgroundColor = "white"

        if (doShutdown) {
            shutDownService.shutdownIn(shutdownDelay)
        }
    }
}


document.getElementById("remainTemp").innerText = remainingTimeInSecond()
start()

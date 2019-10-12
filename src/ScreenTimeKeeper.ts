function hasPassedMonday(dateA: Date, dateB:Date) : boolean{
    const diffTimeInMs = Math.abs(dateA.getTime() - dateB.getTime());
    let day = dateB.getDay();
    if (day === 0) day = 7
    const midnightB = new Date(dateB.getFullYear(), dateB.getMonth(), dateB.getDate())
    let diffFromMidnight = Math.abs(dateB.getTime() - midnightB.getTime());
    let numberOfMilisecondToMondayMidnight = diffFromMidnight + (day-1)*24*60*60*1000
    return (diffTimeInMs > numberOfMilisecondToMondayMidnight);
}

class ScreenTimeKeeper{
    private remainingTime: number;
    private updateDate: Date;
    private originalTime: number;
    constructor(
        remainingTime:number,
        updateDate:Date,
        originalTime:number
    ){
        this.remainingTime = remainingTime;
        this.updateDate = updateDate;
        this.originalTime = originalTime;
    }

    getRemainingTime() : number {
        return this.remainingTime;
    }

    update(date: Date, elapsedTime: number) {
        if (hasPassedMonday(this.updateDate, date)) {
            this.remainingTime = this.originalTime
        }else{
            this.remainingTime -= elapsedTime
        }
        this.updateDate = date;
    }


}

export {ScreenTimeKeeper}
export {hasPassedMonday}

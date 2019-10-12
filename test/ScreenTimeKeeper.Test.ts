import {ScreenTimeKeeper, hasPassedMonday} from '../src/ScreenTimeKeeper';

const expect = require('chai').expect;
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line

describe('Screen time keeper', () => {
    it('should return the remaining time', () => {
        const result = new ScreenTimeKeeper(
            3600,
            new Date(Date.parse('2019-09-08')),
            5 * 60 * 60);

        expect(result.getRemainingTime()).to.equal(3600);
    });

    it('should return the remaining time in monday', () => {
        const result = new ScreenTimeKeeper(
            3600,
            new Date(Date.parse('2019-09-02 10:10:10.125')),
            5 * 60 * 60);
        result.update(new Date(Date.parse('2019-09-02 10:10:11.000')), 10)
        expect(result.getRemainingTime()).to.equal(3590);
    });

    it('on sunday should decrease time', () => {
        const result = new ScreenTimeKeeper(
            3600,
            new Date(Date.parse('2019-09-22 10:10:10.125')),
            5 * 60 * 60);
        result.update(new Date(Date.parse('2019-09-22 10:10:11.000')), 10)
        expect(result.getRemainingTime()).to.equal(3590);
    });

    it('stop playing on saturday, restart on monday should reset remaining time', () => {
        const result = new ScreenTimeKeeper(
            3600,
            new Date(Date.parse('2019-09-15 18:10:10.125')),
            5 * 60 * 60);
        result.update(new Date(Date.parse('2019-09-16 17:10:11.000')), 10)
        expect(result.getRemainingTime()).to.equal(5 * 60 * 60);
    });

    it('same monday but different times', () => {
        const date1 = new Date(Date.parse('2019-09-02 10:10:10'))
        const date2 = new Date(Date.parse('2019-09-02 10:10:10.125'))
        expect(hasPassedMonday(date1, date2)).to.equal(false)
    })

    it('sunday and monday should pass mon,day', () => {
        const date1 = new Date(Date.parse('2019-09-01 23:59:59'))
        const date2 = new Date(Date.parse('2019-09-02 00:00:00'))
        expect(hasPassedMonday(date1, date2)).to.equal(true)
    })

    it('new date is monday but more tha 24h shoud pass modnay', () => {
        const date1 = new Date(Date.parse('2019-09-01 23:59:59'))
        const date2 = new Date(Date.parse('2019-09-03 00:00:00'))
        expect(hasPassedMonday(date1, date2)).to.equal(true)
    })

    it('should reset to original value if update time is older than last monday', () => {
        const result = new ScreenTimeKeeper(
            3600,
            new Date(Date.parse('2019-09-08')),
            5 * 60 * 60);

        result.update(new Date(Date.parse('2019-09-13')), 10)

        expect(result.getRemainingTime()).to.equal(5 * 60 * 60);
    });

    it('should decrease the remaining time', () => {
        const result = new ScreenTimeKeeper(
            3600,
            new Date(Date.parse('2019-09-12')),
            5 * 60 * 60);

        result.update(new Date(Date.parse('2019-09-13')), 10)
        expect(result.getRemainingTime()).to.equal(3600 - 10);
    });


});


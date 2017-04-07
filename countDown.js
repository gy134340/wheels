/**
 * @param ele { dom element }
 * @param time { total time }
 * @param interval { interval }
 * 
 * @return promise done
 * @author  gy 
 */

var countDown = function(ele, time, interval) {
    this.ele = ele || undefined;
    this.time = time || 60000;
    this.interval = interval || 1000;
    this.isEnd = false;
    this.num = 0;
};
countDown.prototype = {
    getElement: function() {
        return this.ele;
    },
    getNumber: function() {
        return parseInt(this.time / this.interval);
    },
    add: function(t) {

        // note: number
        if (typeof t !== 'undefined') {
            var addTime = parseInt(t);
            this.num = this.num + t;
        }
        return this;
    },
    sub: function(t) {
        // note: number
        if (typeof t !== 'undefined') {
            var addTime = parseInt(t);
            this.num = (this.num - t) <= 0 ? 1 : (this.num - t);
        }
        return this;
    },
    process: function() {
        var num = this.getNumber();
        var that = this;
        this.num = num;
        return new Promise(function(resolve, reject){

            var down = setInterval(function(){
                if (that.num === 0 || that.isEnd) {
                    resolve();
                    clearInterval(down);
                    return;
                }
                that.num = that.num - 1;
                console.log('num', that.num);
                that.show(that.num);
            }, that.interval);
        });
    },
    end: function() {
        this.isEnd = true;
        return this;
    },
    show: function(num) {
        var ele = this.getElement();
        if(typeof ele !== 'undefined') {
            ele.innerHTML = num;
        }
    }
};
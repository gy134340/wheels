/**
 * 一个获取当前帧率,以及传interval时间内帧数的小轮子
 * @author gy 
 * https://github.com/gy134340
 */

var frameRate = function(interval){
	var lastFrameDate;
	var tmpFrameDate;
	var timePast = [];		// 用来存储t时间内经过的每一帧的时间间隔数组
	var pastFrames = 0;
	var totalTime = 0;

	// s => ms
	if(interval !== undefined && interval.indexOf('s') > -1){
		interval = 1000 * Math.abs(parseInt(interval));
	}

	this.name = 'frameRate';

	if(interval){
		this.interval = interval;
	}else{
		this.interval = 1000;
	}

	// 工具函数处理过去时间内的帧数
	function processPastFrames(interval){
		// if(timePast.length <= 0 || pastFrames <= 0){
		// 	return;
		// }
		var shift = timePast.shift();
		totalTime = totalTime - shift;
		pastFrames = pastFrames - 1;

		if(totalTime <= interval || timePast.length <= 0 || pastFrames <= 0){
			return;
		}else{	
			processPastFrames(interval);
		}
	}

	// return this 确保可以链式调用其他的get方法
	this.setInterval = function(time){
		this.interval = time;
		return this;
	};

	this.getInterval = function(){
		return this.interval;
	};

	this.update = function(){
		var date  = new Date();
		if(lastFrameDate === undefined){
			lastFrameDate = date.getTime();
			tmpFrameDate = lastFrameDate; 
		}else{
			lastFrameDate = tmpFrameDate;
			tmpFrameDate = date.getTime();

			var tmpInterVal = tmpFrameDate - lastFrameDate;
			pastFrames++;
			totalTime += tmpInterVal;
			timePast.push(tmpInterVal);

			if(totalTime > this.interval){
				processPastFrames(this.interval);
			} 
		}
	};

	// 获取当前帧率
	this.getFramesInTime =  function(){
		var tmp = tmpFrameDate - lastFrameDate;

		if(tmp){
			var rate = Math.round(this.interval / tmp);
			return rate;
		}	
	};

	// 获取每秒传输帧数
	this.getFramesInUnitTime =  function(){
		var tmp = tmpFrameDate - lastFrameDate;

		if(tmp){
			var rate = Math.round(1000 / tmp);
			return rate;
		}	
	};

	// 获取在interval时间内实际的经过的帧数
	this.getPastFrames = function(){
		return pastFrames;
	};
	
};
/**
 * shift the array per seconds
 * 
 * @param  {[type]} messages [description]
 * @return {[type]}          [description]
 */
var popop = function(messages) {
	this.number = messages.length || undefined;
	this.messages = messages || undefined;
};

popop.prototype = {
	validate: function() {
		if (typeof this.number === 'undefined' || typeof this.messages === 'undefined') {
			return false;
		} else {
			return true;
		}
	},
	pop: function(i) {
		return {
			time: i,
			message: this.messages.shift()
		};
	},
	exec:function() {
		var that = this;
		return new Promise(function(resolve, reject) {
			if (that.validate()) {
				var down = setInterval(function(){
					if (that.number !== 0) {
						var obj = that.pop(that.number);
						console.log('hah' + obj.time + obj.message);
						that.number = that.number - 1;
					} else {
						clearInterval(down);
						resolve();
					}
				}, 1000);
			}
		});
		
	}
};

// test

// var messages = ['开始了','真的开始了','真的真的开始了','真的真的真的开始了','boom']
// var pop = new popop(messages);
// pop.exec().then(function() {
// 	console.log('end');
// });
/**
 * 存储当前 dom 的样式、恢复
 * @author gy 
 * https://github.com/gy134340
 */

var storage = function() {
	this._stack = [];
};

storage.prototype = {
	isObject: function(obj) {
		return obj && Object.prototype.toString.call(obj) === '[object Object]';
 	},
 	isHtmlElement: function(o) {
 		return (
		    typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
		    o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
		);
 	},
	store: function(obj) {	
		if (!this.isObject(obj)) {
			return console.error('Type Error: argument isn\'t instance of object');
		}
		
		if (!this.isHtmlElement(obj.ele)) {
			return console.error('Dom Error: argument isn\'t html element');
		}
		this._stack.push(obj);
		return this;
	},
	restore: function() {
		var objs = this._stack;
		for (var i = 0, len = objs.length; i < len; i++) {
			var tmp = objs[i];
			var ele = objs[i].ele;
			var style = objs[i].style;
			// var tmpArr = Object.keys(style);
			// tmpArr.forEach(function(value) {
			// 	ele.style['value'] = style['value'];
			// 	console.log(ele.style);
			// });
			Object.assign(ele.style, style);		// >IE11
		}
		return this;
	},
	push: function() {
		var that = this;
		var args = Array.prototype.slice.call(arguments);
		args.map(function(value) {
			that.store(value);
		});
	},
	getAll: function() {
		return this._stack;
	},
	clear: function() {
		this._stack = [];
		return this;	
	}
};
// var test = new storage();
// var obj = {
// 	ele: document.querySelectorAll('#test')[0],
// 	style: {
// 		color: '#48FE2E',
// 		fontSize: '100px'
// 	}
// }
// test.store(obj);
// test.restore();
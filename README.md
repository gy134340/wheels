# wheels
轮子🚗   各种轮子🚗🚗🚗



### 一、frameRate.js
计算当前帧率，计算传入时间内将会变动的帧率，以及获取在过去的一段时间内总共变化帧数的小工具函数。
  因为自己在做项目时，发现由于fps老变，不是很好统计单位时间内到底过了多少帧，于是写了一个小玩意。
  当然后来发现自己naive了，因为不能预测未来的fps之类的，所以目前这个只能统计从当前时间点起传入时间内帧数。



1.传递需要获得统计帧数的时间

```
var fr = new frameRate(2000);
```

2.在requestAnimationFrame()或者setInterval()的函数内加入fr.update()。

```
function animate(){
  window.requestAnimationFrame( animate );
  fr.update()
}
```

3.返回传入时间内的统计帧数，会返回刚才2000ms内的帧数，当然这个每次调用都会反回最新的2000ms内的

```
fr.getPastFrames();
```
4.可以动态设置时间间隔，不过应该没法在animate()这样的函数中即时更新pastFrames。

```
fr.setInterval(3000);
```

5.不过可以在重新设置时间时重新获取这段时间内的帧数，注意这里是会返回5000内的帧数，不是单位时间的。

```
var frames = fr.setInterval(5000).getFramesInTime();
```

6.其他看源代码吧，其实很渣

### 二、countDown.js
> 倒计时并显示在 dom 中， 传入总时间和间隔，过程中支持 add() 和 sub(),支持链式调用，返回一个 promise

1.传入需要显示倒计时的 dom，总时间，时间间隔

```
var ele = document.getElementById('foo');
var cd = new countDown();      // return promise
cd.process();				// 开始倒计时
```

2.process 过程中支持 add 和 sub，支持链式调用

```
cd.add(5);

cd.sub(5);

cd.add(20).sub(12);
```

3.end()方法强制完成

```
cd.end();		// done
```

4.返回 promise，接着搞事情即可

```
var foo = cd.process();
foo.then(function(){
	console.log('callback here');
});
```










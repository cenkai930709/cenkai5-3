/*
 	obj:要运动的元素,obj
 	attr:样式，str
 	speed:每次运动多少，num
 	target：目标点，num
 	callBack：回调函数，运动完要执行的代码，function
 * 
 * */
function move(obj,attr,speed,target,callBack){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var b=css(obj,attr)
	},20)
	
}
function fn(obj,attr,val){
	if(arguments.length==2){
		var v=parseFloat(getComputedStyle(obj)[attr]);
		if(attr=='opacity'){
			v=Math.round(v*100)
		}
		return v;
	}
	//设置
	if(attr=='opacity'){
		val=val/100;
		obj.style[attr]=val;
	}else{
		obj.style[attr]=val+'px';
	}
}

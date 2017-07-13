var list = document.getElementById('list');
var inps = document.getElementsByTagName('input')
//最大id
var maxId = getMaxId(data);
//初始化
show(data);
//按年龄排序
inps[3].onclick = function(){
//先数据排序，再调用show()渲染
	data.sort(function(a,b){
		return a.age-b.age;
	})
	show(data)
}
inps[2].onclick = function(){
	//添加一条数据
	data.push({
		id:++maxId,
		name:inps[0].value,
		age:Number(inps[1].value)
	})
	//渲染页面
	show(data)
	//console.log(data)
}

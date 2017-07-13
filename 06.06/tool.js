//根据传入的数组，ul渲染
function show(arr){
	var str = '';
	arr.forEach(function(a){
		str += '<li>id:'+a.id+' 姓名：'+a.name+' 年龄：'+a.age+'</li>';
	})
	list.innerHTML = str;
	var lis = list.getElementsByTagName('li');
	for(var i=0;i<lis.length;i++){
		lis[i].data = arr[i];
		lis[i].onclick = function(){
			//console.log(this.data.id)
			//先删数据，再渲染
			removeById(this.data.id,data);
			show(data)
		}
	}
}
//找到数组内最大id
function getMaxId(arr){
	var n = 0;
	arr.forEach(function(a){
		if(a.id>n){
			n = a.id;
		}
	})
	return n;
}
//删除数组里指定id的数据
function removeById(id,arr){
	arr.forEach(function(a,b){
		if(a.id==id){
			arr.splice(b,1)
		}
	})
	console.log(data)
}

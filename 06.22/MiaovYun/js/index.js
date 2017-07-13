var btns = document.getElementsByTagName('input');
var content = document.getElementById('content');
//location.hash = '#path=/周杰伦/摩羯座';
//当前页面数据
var Data = getData(data);
console.log(Data)
//渲染页面
show(Data)
window.onhashchange = function(){
	//重新拿数据，重新渲染
	Data = getData(data);
    show(Data)
}

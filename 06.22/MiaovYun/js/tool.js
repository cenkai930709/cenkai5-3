//根据hash处理的路径，拿到页面要渲染的数据
function getData(data){
	var hash = location.hash.substr(1);
	//#path=/周杰伦/摩羯座
	if(hash){
		//['path','/周杰伦/摩羯座']
		//['','周杰伦','摩羯座']
		//['周杰伦','摩羯座']
		var path = hash.split('=')[1].split('/').slice(1);
		var target = null;
		fn(data,path)
		return target;
	}else{
		return data;
	}
	function fn(data,path){
		console.log(data.child)
		data.child.forEach(function(a){
			if(a.name==path[0]){
				path.shift();
				if(path.length==0){
					target = a;
				}else{
					fn(a,path);
				}
			}
		})
	}
}
//渲染文件夹
function show(data){
	content.innerHTML = '';
	data.child.forEach(function(a){
		createBox(a);
	})
}
//生成一个文件夹
function createBox(data){
	var box = document.createElement('div');
	box.className = 'box';
	box.innerHTML = `<div class="pic"></div>
		<p>${data.name}</p>`;
	var inp = document.createElement('input');
	inp.type = 'checkbox';
	box.appendChild(inp);
	content.appendChild(box);
	box.checked = false;
	box.onmouseenter = function(){
		if(!this.checked){
			this.classList.add('active');
		}
	}
	box.onmouseleave = function(){
		if(!this.checked){
			this.classList.remove('active');
		}
	}
	inp.onclick = function(){
		if(this.checked){
			box.checked = true;
		}else{
			box.checked = false;
		}
	}
}
/*
 	<div class="box">
		<div class="pic"></div>
		<p>新建文件夹</p>
		<input type="checkbox" />
	</div>
 * 
 * */
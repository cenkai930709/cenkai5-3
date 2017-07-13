/**
 * Created by lijin on 2017/6/22.
 */

function addFile(obj) {
    var div=document.createElement('div');
    div.innerHTML='<input type="checkbox"> ' +
        '<div class="fileIcon"></div> ' +
        '<div class="fileName"> ' +
        '<span>'+obj.name+'</span> ' +
        '</div>';
    div.className='fileStyle';
    div.checked=false;
    var hash=location.hash.split('=')[1] || '全部文件';
    var span=div.getElementsByTagName('span')[0];
    div.onmouseenter = function(){
        if(!this.checked){
            this.classList.add('checked');
        }
    };
    div.onmouseleave = function(){
        if(!this.checked){
            this.classList.remove('checked');
        }
    };
    div.onclick=function () {
        this.checked=!this.checked;
        this.firstElementChild.checked=this.checked;
    };
    div.ondblclick=function () {
        location.hash='path='+hash+'/'+span.innerHTML;
    };
    fileCont.appendChild(div);
}

function show(data){
    fileCont.innerHTML = '<div id="newInput"> ' +
        '<input type="text" value="" title="" class="input">' +
        '<em>√</em>' +
        '<em>X</em></div>';
    data.child.forEach(function(a){
        addFile(a);
    })
}


function getThis(path,data) {
    var arr=path.split('/');
    var obj=null;
    if(arr.length>=1&&data.name===arr[0]){
        obj=data;
        for(var i=1;i<arr.length;i++){
            var isFind=false;
            for(var j=0;j<obj.child.length;j++){
                if(obj.child[j].name===arr[i]){
                    obj=obj.child[j];
                    isFind=true;
                    break;
                }
            }
            if(!isFind){
                return null;
            }
        }
    }
    return obj;
}

function guide(path) {
    var arr=path.split('/');
    var str='<input id="allChecked" type="checkbox" title="all"> ' +
    '<span class="allCheck">全选</span> ';
    if(arr.length<=1){
        str+='<span class="word2">'+arr[0]+'</span>'
    }else {
        str+='<a href="javascript:" class="word" title="back">返回上一级</a> ' +
            '<span class="arrow"> | </span> ';
        var p=arr[0];
        for(var i=0;i<arr.length-1;i++){
            str+='<a href="javascript:" class="word" title="'+p+'">'+arr[i]+'</a> ' +
                '<span class="arrow"> > </span> ';
            p=p+'/'+arr[i+1];
        }
        str+='<span class="word2">'+arr[i]+'</span>'
    }
    guideBar.innerHTML=str;
    var as=guideBar.getElementsByTagName('a');
    for(var j=0;j<as.length;j++){
        as[j].onclick=function () {
            if(this.title==='back'){
                arr.pop();
                location.hash='path='+arr.join('/');
            }else {
                location.hash='path='+this.title;
            }
        }
    }
}

function newFile() {
    var newDiv=document.createElement('div');
    newDiv.className='fileStyle';
    newDiv.innerHTML='<div class="fileIcon"></div>';
    fileCont.appendChild(newDiv);
    var newInput=document.getElementById('newInput');
    var input=newInput.firstElementChild;
    var ems=newInput.getElementsByTagName('em');
    newInput.style.display='block';
    newInput.style.left=newDiv.offsetLeft+'px';
    newInput.style.top=newDiv.offsetTop+'px';
    // input.value=findNewName(Data);
    input.value='新建文件夹';
    input.select();
    newOnOff=false;
    ems[0].onclick=function () {
        if(nameOfRepeat(Data.child,input.value)){
            alert('文件名不能重复')
        }else {
            var newObj={
                id:++data.maxId,
                name:input.value,
                child:[]
            };
            fileCont.removeChild(newDiv);
            addFile(newObj);
            Data.child.push(newObj);
            newInput.style.display='';
            newOnOff=true;
        }
    };
    ems[1].onclick=function () {
        fileCont.removeChild(newDiv);
        newInput.style.display='';
        newOnOff=true;
    }

}

function nameOfRepeat(arr, name) {
    var re=false;
    for(var i=0;i<arr.length;i++){
        if(arr[i].name===name){
            re=true;
        }
    }
    return re;
}
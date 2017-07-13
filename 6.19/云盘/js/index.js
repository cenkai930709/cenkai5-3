/**
 * Created by lijin on 2017/6/22.
 */
var guideBar=document.getElementById('guideBar');
var fileCont=document.getElementById('fileContent');
var btnOfNew=document.getElementById('newFile');
var reName=document.getElementById('reName');
var removeFile=document.getElementById('remove');

// location.hash = 'path=全部文件/男歌手/周杰伦/摩羯座';
var hash=location.hash.split('=')[1] || '全部文件';
var Data=getThis(hash,data);
show(Data);
guide(hash);

var newOnOff=true;

window.onhashchange = function(){
    var hash=location.hash.split('=')[1] || '全部文件';
    Data = getThis(hash,data);
    show(Data);
    guide(hash);
    newOnOff=true;
};

btnOfNew.onclick=function () {
    if(newOnOff){
        newFile()
    }
};

reName.onclick=function () {
    if(newOnOff){
        var divs=fileCont.getElementsByClassName('fileStyle');
        var n=0,m=0;
        for(var i=0;i<divs.length;i++){
            if(divs[i].checked){
                n++;
                m=i;
            }
        }
        if(n===1){
            newOnOff=false;
            var newInput=document.getElementById('newInput');
            var input=newInput.firstElementChild;
            var ems=newInput.getElementsByTagName('em');
            var span=divs[m].getElementsByTagName('span')[0];
            newInput.style.display='block';
            newInput.style.left=divs[m].offsetLeft+'px';
            newInput.style.top=divs[m].offsetTop+'px';
            input.value=span.innerHTML;
            input.select();
            ems[0].onclick=function () {
                Data.child[m].name='';
                if(!input.value){
                    alert('文件名不能为空')
                }else if(nameOfRepeat(Data.child,input.value)){
                    alert('文件名不能重复')
                }else {
                    span.innerHTML=input.value;
                    Data.child[m].name=input.value;
                    newInput.style.display='';
                    newOnOff=true;
                }
            };
            ems[1].onclick=function () {
                Data.child[m].name=span.innerHTML;
                newInput.style.display='';
                newOnOff=true;
            }
        }
    }


};

removeFile.onclick=function () {
    var divs=fileCont.getElementsByClassName('fileStyle');
    var a=0;
    while (a<divs.length){
        if(divs[a].checked){
            fileCont.removeChild(divs[a]);
            Data.child.splice(a,1)
        }else {
            a++
        }
    }
};

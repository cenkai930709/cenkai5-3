//根据hash获取页面要渲染的数据
function getdata(data){
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
//清除内容区域，渲染全部文件夹
function show(data){
    var list=document.getElementsByClassName('list')[0];
    list.innerHTML='';
   for(var k in data.child){
       createBox(data.child[k]);
   }
}
//根据一条数据渲染一个文件夹,type不写就是正常渲染，写1，非false就是新建往第一位渲染
function createBox(data,type){
    var box=document.createElement('div');
    var ditt=document.createElement('div');
    var div=document.createElement('div');
    var p=document.createElement('div');
    var inps=document.createElement('input');
    inps.type='checkbox';
    box.className='box';
    ditt.className='ditt';
    div.className='cebox';
    inps.className='inep';
    box.check=false;
    box.data=data;
    p.className='boxs';
    p.innerHTML=data.name;
    box.appendChild(ditt);
    ditt.appendChild(div);
    ditt.appendChild(p);
    ditt.appendChild(inps);
    if(type){
        list.insertBefore(box,list.firstElementChild)
    }else{
        list.appendChild(box);
    }
    box.onmouseenter=function(){
        if(!this.check){
           this.classList.add('active');
        }
    }
    box.onmouseleave=function(){
        if(!this.check){
            this.classList.remove('active');
        }
    }


    inps.onclick=function(){
        if(this.checked){
            box.check=true;
        }else{
            box.check=false;
        }

    }


     //双击进入子级
    ditt.ondblclick=function(){
        var Neme=this.firstElementChild.nextElementSibling.innerHTML;
        console.log(Neme);
       // var hash = location.hash.substr(1);
         var hash = location.hash.split('=')[1]||[];
         location.hash ='path='+hash+'/'+Neme;
    }

}
//判断当前同级数据是否重名
function getName(data,name){
    var re=false;
      for(var i=0;i<data.child.length;i++){
          if(data.child[i].name===name){
                re=true;
          }
      }
    return re;
}
//找到id最大值
function getMaxId(data){
    var max=-Infinity;
    fn(data);
    function fn(data){
        data.child.forEach(function(a){
            if( max<a.id){
                max= a.id;
            }
            if(a.child!=0){
                fn(a);
            }
        })
    }
    return max;
}
//生成一条新数据
function newData(data,Name){
    var j;
    j = {
        id: ++maxId,
        name: Name,
        chlid: []
    };
    data.child.unshift(j);
    return j;
}

//新建系列名字
function newDiv(obj,y,data,maxId){


        var divs=document.createElement('div');
        divs.className='box';
        divs.innerHTML+='<div class="ditt">' +
        '<div class="cebox"></div><div class="boxs"></div><input type="checkbox" class="inep">'+
        '</div>';
        divs.onmouseenter=function(){
            if(!this.check){
                this.classList.add('active');
            }
        }
        divs.onmouseleave=function(){
            if(!this.check){
                this.classList.remove('active');
            }
        }
        obj.appendChild(divs);
        var ditt=divs.getElementsByClassName('ditt')[0];
        var boxe=divs.getElementsByClassName('boxs')[0];
        var iney=divs.getElementsByClassName('inep')[0];
        console.log(divs);
        boxe.style.display='none';
        //var Neme=ditt.firstElementChild.nextElementSibling.innerHTML;
        //var hash = location.hash.split('=')[1]||[];
        //location.hash ='path='+hash+'/'+Neme;
        var diva=document.createElement('div');
        var inpa=document.createElement('input');
        var se1=document.createElement('a');
        var se2=document.createElement('a');

        inpa.type='text';
        diva.className='tc';
        se1.innerHTML='确定';
        se2.innerHTML='取消';
        se1.className='as1';
        se2.className='as2';
        divs.check=true;
        ditt.appendChild(diva);
        diva.appendChild(inpa);
        diva.appendChild(se1);
        diva.appendChild(se2);
        diva.style.display = 'block';
        inpa.value = '';
        diva.onclick=function(){
            inpa.focus();
        }
        onOff=false;
        se1.onclick = function(){
            var val = inpa.value;
            //val.focus();
            if(!val){
                alert('不能为空');
            }else if(getName(data,val)){
                alert('重名了')
            }else{
                var newObj={
                    id:++maxId,
                    name:val,
                    child:[]
                };
                //data.child[y].name=val;
                boxe.innerHTML=val;
                onOff=true;

                divs.classList.add('active');

                Data.child.push(newObj);
                ditt.removeChild(diva);
                boxe.style.display = 'block';
                divs.check=false;

            }

        }
        se2.onclick = function(){
            obj.removeChild(divs);
            //divs.check=true;
            onOff=false;

        }
        iney.onclick=function(){
            if(this.checked){
                divs.check=true;
            }else{
                divs.check=false;
            }
        }
    tab();
    frame();
    tz();

}

//文件夹重命名
function reName(box,data,m){
        var div=document.createElement('div');
        var ps=box.getElementsByClassName('boxs')[0];
        var inp=document.createElement('input');
        var sa=document.createElement('a');
        var sb=document.createElement('a');
        inp.type='text';
        div.className='tc';
        sa.innerHTML='确定';
        sb.innerHTML='取消';
        sa.className='as1';
        sb.className='as2';
        box.appendChild(div);
        div.appendChild(inp);
        div.appendChild(sa);
        div.appendChild(sb);
        div.style.display = 'block';
        inp.value = '';
        div.onclick=function(){
            inp.focus();
        }
        sa.onclick = function(){

            var val = inp.value;
            if(!val){
               alert('不能为空') ;
            }else if(getName(data,val)){
                alert('重名了') ;
            }else{

                ps.innerHTML = val;
                box.removeChild(div);
                data.child[m].name=val;
                inp.style.display='none';
                ps.parentNode.check=false;
             }

        }

        sb.onclick = function(){
            box.removeChild(div);
            //obj.check=false;
        }


}

//面包屑导航生成
function nav_Bread(){
    str ='' ;
    str = '<li>'+
    '<a href="javascript:;">'+
    '<span>全部文件</span>'+
    '</a>'+
    '<i class="fz">></i>'+
    '</li>';
	var hash = location.hash;
    var path = hash?hash.substring(7).split('/'):[];
    if(path.length!=0){
        for(var i =0;i<path.length;i++){
            if(i == path.length-1){
                str += '<li>'+
                '<a href="javascript:;">'+
                '<span>'+(path[i])+'</span>'+
                '</a>'+
                '</li>';
            }else{
                str += '<li>'+
                '<a href="javascript:;">'+
                '<span>'+(path[i])+'</span>'+
                '</a>'+
                '<i class="fz">></i>'+
                '</li>';
            }
        }
    }
    bread.innerHTML = str;
}

//面包屑导航返回点击
function Nav(){
    var navs = bread.getElementsByTagName('a');
    var str = '';
    for(var i =0;i<navs.length;i++){
        navs[i].index = i;
        navs[i].onclick = function(){
            var hash = location.hash;
            var path = hash?hash.substring(7).split('/'):[];
            if(this.index != (navs.length-1)&&navs.length != 1){
                path.length = this.index;
                if(this.index == 0){
                    location.hash = '';
                }else{
                    for(var i =0;i<path.length;i++){
                        if(i == 0){
                            str = path[i];
                        }else{
                            str += '/'+path[i];
                        }
                    }
                    location.hash = '#path=/'+str;
                }
            }
        }

    }
}

//框选
function frame(){
    var list=document.getElementsByClassName('list')[0];
    var cencen=document.getElementById('cencen');
    //面包屑导航
    var bread = document.getElementsByClassName('nav_cons')[0];
    var boy=document.getElementById('boy');
    var boxy = document.getElementsByClassName('box');
    var nT,nL;
    var onOff=false;
    var xx = list.getBoundingClientRect().left;
    var yyy = list.getBoundingClientRect().top;
//面包屑导航的高度
    var hh = bread.getBoundingClientRect().height;
    var yy = bread.getBoundingClientRect().top;
    cencen.onmousedown=function(ev) {
        ev.preventDefault();
        boy.style.display = 'block';
        nT = ev.clientY;
        nL = ev.clientX;
        onOff = true;
        document.onmousemove = function (ev) {
            if (onOff) {
                var dL = ev.clientX;
                var dT = ev.clientY;
                var w = Math.abs(nL-dL);
                var h = Math.abs(nT-dT);
                boy.style.width = w + 'px';
                var l = nL>dL ? dL:nL;
                var t = nT>dT ? dT:nT;
                boy.style.left = l-xx+ 'px';
                if(nT <= yyy){
                    boy.style.top = hh+'px';
                    boy.style.height = h - (yyy - nT) + 'px';
                }else{
                    boy.style.top = t - yy + 'px';
                    boy.style.height = h + 'px';
                }
                for (var i = 0;i<checked.length;i++) {
                    checked[i].check = false;
                }
                checked = [];
                for (var i = 0; i < boxy.length; i++) {
                    if (duang(boxy[i], boy)) {
                        boxy[i].check = true;
                        boxy[i].getElementsByClassName('inep')[0].checked = 'checked';
                        checked.push(i);
                    } else {
                        boxy[i].check = false;
                        boxy[i].getElementsByClassName('inep')[0].checked = '';
                    }


                }


            }
        }
        document.onmouseup = function () {
            boy.style.cssText = '';
            onOff = false;
            document.onmousemove=null;
            document.onmouseup=null;
        }
    }

}


//碰撞函数
function duang(obj1,obj2){
    var pos1 = obj1.getBoundingClientRect();
    var pos2 = obj2.getBoundingClientRect();
    if(pos1.right<pos2.left || pos1.bottom<pos2.top || pos1.left>pos2.right || pos1.top>pos2.bottom){
        return false;
    }else{
        return true;
    }
}
//拖拽函数

function tz(){
    var list=document.getElementsByClassName('list')[0];
    var cencen=document.getElementById('cencen');
    //面包屑导航
    var bread = document.getElementsByClassName('nav_cons')[0];
    var boxy = list.getElementsByClassName('box');
    for(var i=0;i<boxy.length;i++){
        boxy[i].style.left = boxy[i].offsetLeft+'px';
        boxy[i].style.top = boxy[i].offsetTop+'px';
        setTimeout(function(i){
            boxy[i].style.position = 'absolute';
        },0,i)
        boxy[i].index =i;

        boxy[i].onmousedown = function(ev){console.log(checked);
            if(checked.includes(this.index)){
                //阻止冒泡（移动不框选）
                ev.preventDefault();
                ev.stopPropagation();
                var oldX = ev.clientX;
                var oldY = ev.clientY;
                checked.forEach(function(a){
                    boxy[a].l = parseFloat(getComputedStyle(boxy[a]).left);
                    boxy[a].t = parseFloat(getComputedStyle(boxy[a]).top);
                })
                document.onmousemove = function(ev){
                    var nowX = ev.clientX;
                    var nowY = ev.clientY;
                    checked.forEach(function(a){
                        boxy[a].style.left = boxy[a].l+(nowX-oldX)+'px';
                        boxy[a].style.top = boxy[a].t+(nowY-oldY)+'px';
                    })
                }
                document.onmouseup = function(ev){
                    console.log(checked);
                    document.onmousemove=null;

                    for(var i=0;i<boxy.length;i++){
                        if(!checked.includes(i)){
                            var pos=boxy[i].getBoundingClientRect();
                            if(ev.clientX>pos.left&&ev.clientY>pos.top&&ev.clientX<pos.right&&ev.clientY<pos.bottom){
                                console.log(ev,pos);
                                checked.forEach(function (a) {
                                    Data.child[i].child.push(Data.child[a]);
                                });
                                as[4].onclick();
                            }
                        }
                    }


                    for(var i=0;i<boxy.length;i++){
                        //boxy[i].style.position='';
                        boxy[i].check=false;
                    }

                    document.onmousemove = document.onmouseup = null;
                }
            }
        }

    }
}
function tab(){
    var boxy = list.getElementsByClassName('box');
    for(var i = 0;i<boxy.length;i++){
        boxy[i].style.left = boxy[i].offsetLeft+'px';
        boxy[i].style.top = boxy[i].offsetTop+'px';
        setTimeout(function(i){
            boxy[i].style.position = 'absolute';
        },0,i)
    }

}

//右键菜单
function youjian(){
    var you=document.getElementsByClassName('you')[0];
    var boxy = document.getElementsByClassName('box');
    var psa=you.getElementsByTagName('p');
    cencen.oncontextmenu = function(ev){
        ev.preventDefault();
        you.style.display = 'block';
        //限制范围
        var maxL = cencen.getBoundingClientRect().width-you.offsetWidth;
        var maxT = cencen.getBoundingClientRect().height-you.offsetHeight;
        var l = ev.clientX>maxL?maxL:ev.clientX-cencen.getBoundingClientRect().left;
        var t = ev.clientY>maxT?ev.clientY-you.offsetHeight:ev.clientY-bread.getBoundingClientRect().top;
        console.log(maxL,maxT);
        console.log(l,t)
        you.style.left = l+'px';
        you.style.top = t+'px';
        console.log(you);
        psa[0].onclick=function(){
            var n=0;
            for(var i=0;i<boxy.length;i++){
                boxy[i].style.position='';
                if(boxy[i].check){

                    n=i;
                }

            }
            newDiv(list,n,Data,maxId);
            you.style.display='none';
        }
        psa[1].onclick =function(){
            var y=0;
            var m=0;
            var boxs=list.getElementsByClassName('box');
            for(var i=0;i<boxs.length;i++){
                if(boxs[i].check){
                    y++;
                    m=i;
                }
            }
            if(y===1){
                var dtta=boxs[m].getElementsByTagName('div')[0];
                reName(dtta,Data,m)
            }
            you.style.display='none';
        }
        psa[2].onclick=function(){
            var boxs=list.getElementsByClassName('box');
            for(var i=0;i<boxs.length;i++){
                if(boxs[i].check){
                    Data.child.splice(i,1);
                    list.removeChild(boxs[i]);
                    i--;
                }
            }
            you.style.display='none';
        }
    }
    cencen.onclick=function(){
        you.style.display='none';
    }
}


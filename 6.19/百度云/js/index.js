
var centent=document.getElementsByClassName('centent')[0];
var as=centent.getElementsByTagName('a');
var list=document.getElementsByClassName('list')[0];
var cencen=document.getElementById('cencen');
//面包屑导航
var bread = document.getElementsByClassName('nav_cons')[0];
var hash = location.hash.split('=')[1]||'微云';
var onOff=true;
//当前页面的数据
var Data = getdata(data);
var maxId = getMaxId(data);
//渲染
show(Data);
tab();
window.onhashchange=function(){
    //hash改变，重新拿数据，重新渲染
    Data=getdata(data);
    show(Data);
    nav_Bread();
    //面包屑导航点击
    Nav();
    tab();
    tz();
    youjian();
    frame(list,bread)
    //新建文件夹按钮
    as[5].onclick = function(){
        var n=0;
        var boxy = list.getElementsByClassName('box');
        for(var i=0;i<boxy.length;i++){
            boxy[i].style.position='';
            if(boxy[i].check){

                n=i;
            }

        }
        newDiv(list,n,Data,maxId);
    }


}

//新建文件夹按钮
as[5].onclick = function(){
    var n=0;
    var boxy = list.getElementsByClassName('box');
    for(var i=0;i<boxy.length;i++){
        boxy[i].style.position='';
        if(boxy[i].check){

            n=i;
        }

    }
    newDiv(list,n,Data,maxId);
}

//删除选中
as[4].onclick = function(){
    var boxs=list.getElementsByClassName('box');
    for(var i=0;i<boxs.length;i++){
        boxs[i].style.cssText='';
        if(boxs[i].check){
            Data.child.splice(i,1);
            list.removeChild(boxs[i]);
            i--;
        }
    }
    console.log(boxs);
}
//重命名
as[3].onclick=function(){
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
};
var checked=[];
//框选
frame()
//拖拽
tz();

//右键导航菜单
youjian();


	

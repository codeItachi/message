
//1.兼容问题
//功能：解决IE8中类名(getElementsByClassName)
//参数说明：
   //obj:限定作用域
   //str:多个类名集合
   //val:找的类名
    function getClass(classname,obj){//作用域
    	var obj=obj||document
    	if(obj.getElementsByClassName){//判断是w3c
    		return obj.getElementsByClassName(classname);//结果返回
    	}else{//IE8
    		var all=obj.getElementsByTagName("*")//获取所有元素
    		var arr=[];
    		for(var i=0;i<all.length;i++){
    			if(checkRel(all[i].className,classname)){
    				arr.push(all[i]);
    			}
    		}
    		return arr;
    	}
    }
    function checkRel(str,val){//检测一个元素里是否有想要的类名 //str多个类名集合  //找的类名
    	var newarr=str.split(" ");//转换数组
    	for(var j=0;j<newarr.length;j++){//遍历数组
    		if(newarr[j]==val){//判断是否相同
    			return true;
    		}                    
    	}
    	return false;//没有相同的返回假
    }
    /*var box=getClass("bigbox")[0];
   //var inner=getClass("box")                                                    
    var inner=getClass("innerbox",box)
     alert(inner.length)*/

    /* ************************************************************/




/*2.获取设置纯文本兼容问题*/
//obj:那个对象就用那个
//val:接收第二实参,表示设置的文本
  function getText(obj,val){
    if(val==undefined){//如果val为undedfined,表示只有一个参数 实现获取文本功能
       if(obj.innerText){//IE8
        return obj.innerText;
       }else{
        return obj.textContent;
       }
    }else{
        if(obj.innerText||obj.innerText==""){//IE8 当浏览器有innerText属性时,或内容为空字符串时,都可以给对象设置文本
            obj.innerText=val;
        }else{
            obj.textContent=val;
        }
    }
    
  }
//3.*************************************************************
/*获取样式*/
//obj:那个对象   attr:那个属性
function getStyle(obj,attr){
  if(obj.currentStyle){
    return obj.currentStyle[attr];
  }else{
    return getComputedStyle(obj,null)[attr]
  }
}


//4.*********************************************
//功能:类名 id 标签名都可获取
// $(".类名")   $("#ID")   $("标签名")
function $(select,obj){
  var obj=obj||document;
  if(typeof select=="string"){
    select.replace(/^\s*|\s*$/g,"");//去字符串前后的空格
    if(select.charAt(0)=="."){
      return getClass(select.slice(1),obj);
    }else if(select.charAt(0)=="#"){//判断ID
      return obj.getElementById(select.slice(1))
    }else if(/^[a-z|1-6]{1,10}$/g.test(select)){
      return obj.getElementsByTagName(select)
    }
  }else if(typeof select=="function"){
    window.onload=function(){
      select();
    }
  }

}



//5.*************************************************
/*getchild(parent);
获取元素子节点的兼容函数
获取元素子节点的兼容函数
"a":元素;
"b":元素+文本;

原理:先获取所有儿子,然后根据节点的类型判断,如为1,表示元素节点保存到数组
*/

function getChilds(parent,type){
  var type=type||"a";
  var childs=parent.childNodes//所以儿子
  var  arr=[];
  for(var i=0;i<childs.length;i++){
    if(type=="a"){
      if(childs[i].nodeType==1){
      arr.push(childs[i]);
      }
    }else if(type=="b"){
      if(childs[i].nodeType==1||(childs[i].nodeType==3&&childs[i].nodeValue.replace(/^\s*|\s*$/g,""))){
      arr.push(childs[i]);
      }
    }
    
  }
  return arr;
}



//6.获得第一个节点

function getFirst(parent){
  return getChilds(parent)[0];
}



//7.获得最后一个节点

function getLast(parent){
  return getChilds(parent)[getChilds(parent).length-1];
}

//8.指定
function getNum(parent,num){
  return getChilds(parent)[num];
}

//9.获得下一个兄弟节点
function getNext(obj){
  var next=obj.nextSibling;
   if(next==null){
    return false;
  }
  while(next.nodeType==3||next.nodeType==8){
    next=next.nextSibling;
    if(next==null){
      return false;
    }
  }
  return next;
}

//10.上一个节点

function getUp(obj){
  var up=obj.previousSibling;
  if(up==null){
    return false;
  }
  while(up.nodeType==3||up.nodeType==8){
    up=up.previSibling;
    if(up==null){
      return false;
    }
  }
  return up;
}


//11.插入某个对象之后
 /*对象.insertBefore(obj1,obj2)
obj1:要插入的对象；
obj2:那个对象之后
 */
//插入到下一个对象之前
//给对象的原型添加方法
//原理：找到第二个参数的下一个兄弟节点 将第一个参数插入到此兄弟节点之前

Object.prototype.insertAfter=function(obj1,obj2){
  var newobj=getNext(obj2);
  if(newobj){
    this.insertBefore(obj1,newobj);
  }else{
    this.appendChild(obj1);
  }

}



//12.*****************************
//兼容
function getScrollT(){
  //三元
   /*obj=document.documentElement.scrollTop?document.documentElement:document.body;*/
  //或
  var scrollT=document.documentElement.scrollTop||document.body.scrollTop;
  return scrollT;

}


//13.*************************

//同一元素添加多个事件的方法
//obj:给那个对象添加
//ev:什么事件
//fun:事件处理程序
function addEvent(obj,ev,fun){
  if (obj.addEventListener){
    return obj.addEventListener(ev,function(){
      fun.call(obj)
    },false)
  }else{
    return obj.attachEvent("on"+ev,function(){
      fun.call(obj)
    },false)
  }
}

//14同一元素删除多个事件的方法

function removeEvent(obj,ev,fun){
  if (obj.addEventListener){
    return obj.addEventListener(ev,function(){
      fun.call(obj)
    },false)
  }else{
    return obj.attachEvent("on"+ev,function(){
      fun.call(obj)
    },false)
  }
}


//15浏览器宽高获取
function getCW(){
  return document.documentElement.clientWidth;
}

function getCH(){
  return document.documentElement.clientHeight;
}


//16拖拽
/*function drag(obj){
  var cw=getCW();
  var ch=getCH();

  var ow=obj.offsetWidth;
  var oh=obj.offsetHeight;
  var w=cw-ow;
  var h=ch-oh;                                                                          
  
  obj.onmousedown=function(e){
         var ev=e||window.event;//获取事件对象
         var ox=ev.offsetX;//到浏览器X轴
         var oy=ev.offsetY;

         if(ev.preventDefault){
          ev.preventDefault();//阻止默认浏览器动作(W3C)
         }else{
          ev.returnValue = false;//IE中阻止函数器默认动作的方式

         }
 


  document.onmousemove=function(e){
          var ev=e||window.event;
          var cx=ev.clientX;
          var cy=ev.clientY;

          var x=cx-ox;
          var y=cy-oy;
          if(x<=0){
            x=0;
          }
          if(x>=w){
            x=w;
          }
          if(y<=0){
            y=0;
          }
          if(y>=h){
            y=h;
          }
          obj.style.left=x+"px";
          obj.style.top=y+"px";

          
         }
  }
  obj.onmouseup=function(){
    document.onmousemove=null;

  }
}*/
//obj:要实现拖拽的对象
  //attrobj:
  //attrobj.fatherobj:必传
  //attrobj.x:true可以拖动  false:不让动
  //attrobj.y:true可以拖动  false:不让动
  //attrobj.animate:true有动画 false:没有动画  
  function drag(obj,attrobj){
    this.obj=obj;//把传进来的对象保存到构造函数的属性上
    if(typeof attrobj=="object"){
      var attrobj=attrobj;
    }else{
      return;
    }
    //var attrobj=attrobj||{};
    this.x=attrobj.x==undefined?true:attrobj.x;
    this.y=attrobj.y==undefined?true:attrobj.y;
    this.animate=attrobj.animate==undefined?true:attrobj.animate;
    this.fatherobj=attrobj.fatherobj==undefined?true:attrobj.fatherobj;
    if(this.fatherobj){
      if(this.fatherobj.nodeType==9){
      this.fatherobjW=document.documentElement.clientWidth;
      this.fatherobjH=document.documentElement.clientHeight;
    }else{
      this.fatherobjW=this.fatherobj.offsetWidth;
      this.fatherobjH=this.fatherobj.offsetHeight;
       }
    }
    this.objW=this.obj.offsetWidth;
    this.objH=this.obj.offsetHeight;
    this.ox=0;
    this.oy=0;
    this.cx=0;
    this.cy=0;
    this.startx=0;
    this.starty=0;
    this.endx=0;
    this.endy=0;
    this.lenx=0;
    this.leny=0;
    this.speed=0.8;
    this.drags;
  }
  drag.prototype={
    drags:function(){
      this.down();
    },
    event:function(e){
      return e||window.event;
    },
    down:function(){
      var that=this;
      this.obj.onmousedown=function(e){
        
               var ev=that.event(e);
               if(ev.preventDefault){
              ev.preventDefault();
            }else{
              ev.returnValue=false;
            }
               that.ox=ev.clientX-that.obj.offsetLeft;
               that.oy=ev.clientY-that.obj.offsetTop;
               that.startx=that.ox;
               that.starty=that.oy;
               that.move();
               that.up();
      }
    },
    move:function(){
      var that=this;
      document.onmousemove=function(e){
        var ev=that.event(e);
        that.cx=ev.clientX;
        that.cy=ev.clientY;
        var leftx=that.cx-that.ox;
        var topy=that.cy-that.oy;
        if(that.fatherobj){
          if(leftx<0){
            leftx=0;
          }
          if(leftx>that.fatherobjW-that.objW){
            leftx=that.fatherobjW-that.objW
          }
          if(topy<0){
            topy=0;
          }
          if(topy>that.fatherobjH-that.objH){
            topy=that.fatherobjH-that.objH
          }
          if(that.x){
            that.obj.style.left=leftx+"px";
          }
          if(that.y){
                        that.obj.style.top=topy+"px";
          }
        }
        that.endx=that.cx;
        that.endy=that.cy;
        that.lenx=that.startx-that.endx;
        that.leny=that.starty-that.endy;
        that.startx=that.endx;
        that.starty=that.endy;
      }
    },
    up:function(){
      var that=this;
      document.onmouseup=function(){
        if(that.animate){
          if(Math.abs(that.lenx)<1){
            clearInterval(t);
          }
          if(Math.abs(that.leny)<1){
            clearInterval(t);
          }
          var t=setInterval(function(){
            that.lenx*=that.speed;
            that.leny*=that.speed;
            var leftx=that.lenx+that.obj.offsetLeft;
            var topy=that.leny+that.obj.offsetTop;
            if(leftx<0){
            leftx=0;
            }
            if(leftx>that.fatherobjW-that.objW){
              leftx=that.fatherobjW-that.objW
            }
            if(topy<0){
              topy=0;
            }
            if(topy>that.fatherobjH-that.objH){
              topy=that.fatherobjH-that.objH
            }
            that.obj.style.left=leftx+"px";
            that.obj.style.top=topy+"px";
          },50)
        }
      document.onmousemove=null;
          document.onmousedown=null;
      }
      
    }
  }
//17滚轮事件
/*
obj:那个对象添加滚轮事件
up:处理滚轮向上的函数
downfun:向下
*/
function mouseWheel(obj,upfun,downfun){
    if(obj.attachEvent){
       obj.attachEvent("onmousewheel",scrollFn); //IE、 opera
    }else if(obj.addEventListener){
       obj.addEventListener("mousewheel",scrollFn,false);
     //chrome,safari -webkit-
       obj.addEventListener("DOMMouseScroll",scrollFn,false);
   //firefox -moz-
    }
    function scrollFn(e){
      var ev=e||window.event;
      if(ev.preventDefault ){
        ev.preventDefault(); //阻止默认浏览器动作(W3C)
      }
     else{
      ev.returnValue = false;//IE中阻止函数器默认动作的方式
     }


      var num=ev.detail||ev.wheelDelta;
      if(num==-3||num==120){
        if(upfun){
          upfun();
        }
      }
      if(num==3||num==-120){
        if(downfun){
          downfun();
        }
      }
    }
}

//hover事件

//18.hover

//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
    if(parent.contains){
       return parent.contains(child) && parent!=child;
    }else{
      return (parent.compareDocumentPosition(child)===20);
    }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }


//19距离某天的时间

 function getCha(news,now){
  var arr=[];
  var cha=(news.getTime()-now.getTime())/1000;
  var day=parseInt(cha/(60*60*24));
  arr.push(day);
  cha%=(60*60*24)
  var hour=parseInt(cha/(60*60));
  arr.push(hour);
  cha%=(60*60);
  var minutes=parseInt(cha/60);
  arr.push(minutes);
  cha%=60;
  var seconds=parseInt(cha);
  arr.push(seconds);
  return arr;
 }


//20判断  改名
function attr(obj){
  var obj=arguments[0];
  if(arguments.length==2){
        if(typeof arguments[1]=="string"){
          return obj.getAttribute(arguments[1]);
        }else if(typeof arguments[1]=="object"){
          for(var i in arguments[1]){
            if(i!="insertAfter"){
                    obj.setAttribute(i,arguments[1][i]);
            }
          }
        }
  }
  if(arguments.length==3){
    obj.setAttribute(arguments[1],arguments[2])
  }
}





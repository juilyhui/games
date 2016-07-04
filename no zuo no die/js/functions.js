/*
  版本:2014.3.29  14:35
  用来获取类名
  classname   要找的类名
  obj         要确定的范围 document    
*/               
function getClass (classname,obj) {
	 var obj=obj||document;
	 //FF\CHROM
	 var arr=[];
	   if(obj.getElementsByClassName){
	   return obj.getElementsByClassName(classname);
	   }else{
	     //ie6-8
		 var alls=obj.getElementsByTagName("*");
         for (var i=0; i<alls.length; i++) {
		    if(check(alls[i].className,classname)){
			  arr.push(alls[i]);
			}
         }
		 return arr;
	   }
     }
/*
   用来辅助getClass,用来检测类名是否包含在多个类名里面
   old   每一个元素的真实类名
   news   要找的类名
*/
function check (old,news) {
	    //old:cc one two ["cc","one","two"]
		//new： cc
		var arr=old.split(" ");
        for (var i=0; i<arr.length; i++) {
		  if(arr[i]==news){
		    return true;
		  }
        }
		return false;
	 }

//通过$来获取元素
function $ (selector,obj) {
  var obj=obj||document;
  if(typeof selector!=="string"){
     return false;
  }
//#one
  if(selector.charAt(0)=="#"){
    return obj.getElementById(selector.slice(1));
  }
  //.one
  if(selector.charAt(0)=="."){
    return getClass (selector.slice(1),obj)
  }
	//
   if(/^[a-z]{1,10}$/.test(selector)){
     return obj.getElementsByTagName(selector);
   }
   return false;
}


/*换值*/
function getText (obj,text) {
   if(obj.textContent||obj.textContent==""){
     if(text){
	   obj.textContent=text;
	 }
	 else{
	  return obj.textContent;
	 }
   }
   else{
      if(text){
	   obj.innerText=text;
	 }
	 else{
      return obj.innerText;
	 }
   }
}

//用来获取元素的实际的样式的值
//obj用来获取属性
//attr获取值
function getStyle(obj,attr) {
	  if(getComputedStyle){
	  return parseInt(getComputedStyle(obj,null)[attr]);
	}
	else{
	  return parseInt(obj.currenStyle[attr]);
	}
	}



//动画函数
//obj 要动画的对性
//attr 要动画的属性
//final 动画的最终值
//speed 动画的速度
function animate (obj,attr,final,speed) {
	var int=getStyle(obj,attr);
	obj.t=setInterval(function(){
	  if(final>int){
	    if(int>=final){
		  clearInterval(obj.t)
		}else{
		    int+=speed;
			obj.style[attr]=int+"px";
		  }
	  }
		else{
		  if(int<=final){
		    clearInterval(obj.t)
		  }
		  else{
		    int-=speed;
			obj.style[attr]=int+"px";
		  }
		}
		 
	},60)
}

//获取所有的子元素
/*
  obj  要获取的父元素
*/
function getChilds (obj) {
	   var childs=obj.childNodes;
	   var arr=[];
	   for (var i=0; i<childs.length; i++) {
	     if(childs[i].nodeType!==3){
		   arr.push(childs[i]);
		 }
	   }
	   return arr;
 }

 /*
   找到第几个子元素
   obj   要找的父元素
   num   要找的个数
 */
 function getIndex (obj,num) {
	   var childs=obj.childNodes;
	   var arr=[];
	   for (var i=0; i<childs.length; i++) {
	     if(childs[i].nodeType!==3){
		   arr.push(childs[i]);
		 }
	   }
	   return arr[num-1];
 }

 //获得第一个子元素
 function getFirst (obj) {
	return getChilds (obj)[0];
 }

 //获得最后一个子元素
function getLast (obj) {
	return getChilds (obj)[getChilds (obj).length-1];
 }

//获得上一个兄弟元素
function getUp (obj) {
	var up=obj.previousSibling;
	if(up==null){
	 return false;
	}
   while (up.nodeType==3) {
	   up=up.previousSibling; 
       if(up==null){
		 return false;
		}
   }
   return up;
	
}

//获得下一个兄弟元素
function getNext (obj) {
	var next=obj.nextSibling;
	if(next==null){
	 return false;
	}
   while (next.nodeType==3) {
	   next=next.nextSibling; 
       if(next==null){
		 return false;
		}
   }
   return next;
	
}

/*
  插入到某个元素之后
  obj1  准备要插入的元素
  obj2  要插入它之后的那个元素
*/
function insertAfter (obj1,obj2) {
    var parentObj=obj2.parentNode;
	var nextObj=getNext(obj2);
	if(nextObj){
	  parentObj.insertBefore(obj1,nextObj)
	}else{
	  parentObj.appendChild(obj1);
	}
  }

  /*让ie6兼容固定定位*/
  /*
    obj  要固定定位的对象
	top 对象初始的top值得
	left 对象初始的left值得
  */
   function setFixed (obj,top,left,aa) {
    if(window.ActiveXObject&&!window.XMLHttpRequest){
	    clearInterval(obj.t)
	   obj.style.position="absolute";
	   obj.t=setInterval(function(){
		   if(aa===false){
		     clearInterval(obj.t);
		   }else{
	    obj.style.top=document.documentElement.scrollTop+top+"px";
		obj.style.left=document.documentElement.scrollLeft+left+"px";
		   }
	  },200)
	}else{
	 obj.style.position="fixed";
	 obj.style.left=left+"px";
	 obj.style.top=top+"px";
	}
  }



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


//鼠标移入移除事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
	  if(overfun){
	    obj.onmouseover=function  (e) {
			  if(checkHover(e,obj)){
			     overfun.call(obj);
			  }
	    }
	  }
	  if(outfun){
	    obj.onmouseout=function  (e) {
			  if(checkHover(e,obj)){
			     outfun.call(obj);
			  }
	    }
	  }
}

//获得事件对象
  function getEvent (e) {
	    return e||window.event;
  }


  //添加多个事件
 /*
   obj   要添加事件的对象
   ev    要添加的事件
   fn    要处理的函数
 */
 function addEvent (obj,ev,fn) {
  if(obj.attachEvent){
    obj.attachEvent("on"+ev,fn)
  }else{
    obj.addEventListener(ev,fn,false);
  }
}

function removeEvent (obj,ev,fnName) {
	if(obj.detachEvent){
	  obj.detachEvent("on"+ev,fnName);
	}else{
	 obj.removeEventListener(ev,fnName,false)
	}
}


//拖拽

/*
  obj    要拖拽的对象
  x      布尔值 true为x方向拖动
  y       布尔值 true为y方向拖动
*/
function drag (obj,x,y,callback) {
   obj.onmousedown=function  (e) {
	   var ev=e||window.event;
       var lx=ev.offsetX||ev.layerX;
       var ly=ev.offsetY||ev.layerY;
	   document.onmousemove=function  (e) {
		   var ev=e||window.event;
		   var cx=ev.clientX;
		   var cy=ev.clientY;
		   if(x===true&&y===true){
			   obj.style.left=cx-lx+"px";
		   obj.style.top=cy-ly+"px";
		   
		   }else	if(y===true){
		   obj.style.top=cy-ly+"px";
		   }else	if(x===true){
		   obj.style.left=cx-lx+"px";
		   }
		   if(ev.preventDefault){
			ev.preventDefault();
		}else{
		ev.returnValue = false; 
			
		}
	   }
    document.onmouseup=function  () {
	    document.onmousemove=null;	
		if(obj.releaseCapture){
		  obj.releaseCapture();
		}
		if(callback){
		  callback.call(obj);
		}
    }
		if(ev.preventDefault){
			ev.preventDefault();
		}else{
		ev.returnValue = false; 
			
		}

		if(obj.setCapture){
	       obj.setCapture();
	      }
   }   
}

//滚轮事件
function mouseScroll (obj,upfun,downfun) {
	if(obj.attachEvent){
	obj.attachEvent("onmousewheel",scrollFn);  //IE、 opera
	}else if(obj.addEventListener){
	obj.addEventListener("mousewheel",scrollFn,false);  
	//chrome,safari    -webkit-
	obj.addEventListener("DOMMouseScroll",scrollFn,false); 
	//firefox     -moz-
	}
    function scrollFn (e) {
      var ev=e||window.event;
      var num=ev.wheelDelta||ev.detail;
	  if(num==3||num==-120){
        if(downfun){
		  downfun();
		}
	  }
	  if(num==-3||num==120){ 
		  if(upfun){
		    upfun();
		  }
	  }
	  
   }

}

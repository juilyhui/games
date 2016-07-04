/*
  �汾:2014.3.29  14:35
  ������ȡ����
  classname   Ҫ�ҵ�����
  obj         Ҫȷ���ķ�Χ document    
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
   ��������getClass,������������Ƿ�����ڶ����������
   old   ÿһ��Ԫ�ص���ʵ����
   news   Ҫ�ҵ�����
*/
function check (old,news) {
	    //old:cc one two ["cc","one","two"]
		//new�� cc
		var arr=old.split(" ");
        for (var i=0; i<arr.length; i++) {
		  if(arr[i]==news){
		    return true;
		  }
        }
		return false;
	 }

//ͨ��$����ȡԪ��
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


/*��ֵ*/
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

//������ȡԪ�ص�ʵ�ʵ���ʽ��ֵ
//obj������ȡ����
//attr��ȡֵ
function getStyle(obj,attr) {
	  if(getComputedStyle){
	  return parseInt(getComputedStyle(obj,null)[attr]);
	}
	else{
	  return parseInt(obj.currenStyle[attr]);
	}
	}



//��������
//obj Ҫ�����Ķ���
//attr Ҫ����������
//final ����������ֵ
//speed �������ٶ�
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

//��ȡ���е���Ԫ��
/*
  obj  Ҫ��ȡ�ĸ�Ԫ��
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
   �ҵ��ڼ�����Ԫ��
   obj   Ҫ�ҵĸ�Ԫ��
   num   Ҫ�ҵĸ���
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

 //��õ�һ����Ԫ��
 function getFirst (obj) {
	return getChilds (obj)[0];
 }

 //������һ����Ԫ��
function getLast (obj) {
	return getChilds (obj)[getChilds (obj).length-1];
 }

//�����һ���ֵ�Ԫ��
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

//�����һ���ֵ�Ԫ��
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
  ���뵽ĳ��Ԫ��֮��
  obj1  ׼��Ҫ�����Ԫ��
  obj2  Ҫ������֮����Ǹ�Ԫ��
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

  /*��ie6���ݹ̶���λ*/
  /*
    obj  Ҫ�̶���λ�Ķ���
	top �����ʼ��topֵ��
	left �����ʼ��leftֵ��
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



  //�ж�ĳ��Ԫ���Ƿ����������һ��Ԫ��
 function contains (parent,child) {
	if(parent.contains){
	   return parent.contains(child) && parent!=child;
	}else{
	  return (parent.compareDocumentPosition(child)===20);
	}
 }

 //�ж�����Ƿ������Ĵ��ⲿ���룬�������������Ƴ����ⲿ��

  function checkHover (e,target) {
	 if(getEvent(e).type=="mouseover"){
	    return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
		!((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
	 }else{
		return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
		!((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
		}
  }


//��������Ƴ��¼�
/*
  obj   Ҫ�����Ķ���
  overfun   ���������Ҫ����ĺ���
  outfun     ����Ƴ���Ҫ����ĺ���
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

//����¼�����
  function getEvent (e) {
	    return e||window.event;
  }


  //��Ӷ���¼�
 /*
   obj   Ҫ����¼��Ķ���
   ev    Ҫ��ӵ��¼�
   fn    Ҫ����ĺ���
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


//��ק

/*
  obj    Ҫ��ק�Ķ���
  x      ����ֵ trueΪx�����϶�
  y       ����ֵ trueΪy�����϶�
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

//�����¼�
function mouseScroll (obj,upfun,downfun) {
	if(obj.attachEvent){
	obj.attachEvent("onmousewheel",scrollFn);  //IE�� opera
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

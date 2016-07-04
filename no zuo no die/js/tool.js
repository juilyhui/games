//检测是否碰撞
function  hit(obj1,obj2) {
   //obj1多物体
   //obj2单物体
   for (var i=0; i<obj1.length; i++) {
		   var l1=obj1[i].offsetLeft;
		   var t1=obj1[i].offsetTop;
		   var r1=l1+obj1[i].offsetWidth;
		   var b1=t1+obj1[i].offsetHeight;
		   var l2=obj2.offsetLeft;
		   var t2=obj2.offsetTop;
		   var r2=l2+obj2.offsetWidth;
		   var b2=t2+obj2.offsetHeight;
		  if(!(l2>r1||t2>b1||r2<l1||b2<t1)){
			return obj1[i];
		   }
	   }
	   return false;
}


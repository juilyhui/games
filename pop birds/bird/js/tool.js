//检测是否碰撞
function  hit(obj1,obj2) {
   //obj1多物体
   //obj2单物体
   for (var i=0; i<obj1.length; i++) {
		   var l1=obj1[i].x;
		   var t1=obj1[i].y
		   var r1=l1+obj1[i].width;
		   var b1=t1+obj1[i].height;
		   var l2=obj2.x;
		   var t2=obj2.y;
		   var r2=l2+obj2.width;
		   var b2=t2+obj2.height;
		  if(!(l2>r1||t2>b1||r2<l1||b2<t1)){
			return obj1[i];
		   }
	   }
	   return false;
}


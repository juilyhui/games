//旋转函数
function rotate (obj,angle) {
	 obj.style["webkitTransform"]="rotate("+angle+"rad)";
	 obj.style["mozTransform"]="rotate("+angle+"rad)";
	 obj.style["oTransform"]="rotate("+angle+"rad)";
	 obj.style["msTransform"]="rotate("+angle+"rad)";
	 obj.style["transform"]="rotate("+angle+"rad)";
}
//检测是否碰撞
function  hit(obj1,obj2) {
   //obj1多物体
   //obj2单物体
   for (var i=0; i<obj1.length; i++) {
		   var l1=$(obj1[i]).position().left;
		   var t1=$(obj1[i]).position().top;
		   var r1=l1+$(obj1[i]).width();
		   var b1=t1+$(obj1[i]).height();
		   
		   var l2=obj2.position().left;
		   var t2=obj2.position().top;
		   var r2=l2+obj2.width();
		   var b2=t2+obj2.height();
		   if(!(l2>r1||t2>b1||r2<l1||b2<t1)){
			return $(obj1[i]);
		   }
	   }
	   return false;
}

function hitLine (obj1,obj2) {
	
  var tRange1=obj2.position().top;
  var tRange2=obj2.position().top+obj2.height();
  var lRange1=obj2.position().left;
  var lRange2=obj2.position().left+obj2.width();
  var t=obj1.position().top;
  var l=obj1.position().left;
  if((t>tRange1&&t<tRange2)||(l>lRange1&&l<lRange2)){  
   return true;
  }

}

//创建进度条
function createbar (obj,obj1,imgArr,callback) {
	 var num=0;
	for (var i=0; i<imgArr.length; i++) {
	  (function  (i) {
	     var imgobj=new Image();
		  imgobj.onload=function  () {
		   num++;
           obj.style.width=(100*(num/imgArr.length))+"%";
		   obj1.style.left=(100*(num/imgArr.length))+"%";
		   if(num==imgArr.length){
		     callback();
		   }
		  }
		  imgobj.error=function  () {
			  alert(1);
		  }
		  imgobj.src=imgArr[i];
	  })(i)
	  
    }
}

  //运行我坦克主函数
	/*
		  scene       主战场
          bosswalls   堡垒
		  boss        老大
		  mytank      我的坦克
		  tankhead    坦克头
	      myTankRun(scene,bosswalls,boss,mytank,tankhead);
      */
function myTankRun (scene,bosswalls,boss,tank,tankhead,trees,dtankarr) {
	//1.实现坦克移动
	   //键盘控制方向
	        var isrun=true; 
			$(document).bind("keydown",function  (event) {
				 switch (event.keyCode) {
				 case 65:
				 tank.data("tankdir","l");
				 tank.data("tankAngle",-90*Math.PI/180);
				 rotate(tank[0],tank.data("tankAngle"));
				 break;
				 case 87:
				 tank.data("tankdir","t");
				 tank.data("tankAngle",0*Math.PI/180);
				 rotate(tank[0],tank.data("tankAngle"));
				 break;
				 case 68:
				 tank.data("tankdir","r");
				 tank.data("tankAngle",90*Math.PI/180);
				 rotate(tank[0],tank.data("tankAngle"));
				 break;
				 case 83:
				 tank.data("tankdir","b");
				 tank.data("tankAngle",180*Math.PI/180);
				 rotate(tank[0],tank.data("tankAngle"));
				 break;
				 default:
				  tank.data("tankdir","");
				 }
				 if(isrun){
					 isrun=false;
				    checkrun(scene,tank,trees,bosswalls,isrun);
				 }
			})
		   $(document).bind("keyup",function  () {
              isrun=true;
			  clearInterval(dtankarr.t4);
		   })
	
	//2.坦克管旋转
      tankHeadRotate(tankhead,tank);
	//3.发射炮弹
	   //当鼠标点击时，发射炮弹
		 $(".mask").bind("click",function  (event) {
		  if(tank.data("fire")){
			 tank.data("fire",false);
			 var shell=$("<div>").css({
			width:13,height:13,background:"url(img/shell.png)",position:"absolute",
			top:tank.position().top+10,
			left:tank.position().left+15,
			"z-index":0
			}).appendTo(scene);
			 shell.data({
				//炮弹角度
				shellAngle:0,
				//炮弹速度
				shellSpeed:15
			   })
			   var lx=event.originalEvent.layerX;
			   var ly=event.originalEvent.layerY;
			   var nx=tank.position().left;
			   var ny=tank.position().top;
			   shell.data("shellAngle",Math.atan2((lx-nx),(ny-ly)));
			   sendShell(scene,bosswalls,boss,tank,trees,shell,dtankarr);	 	   
		  }
	 })
	  

}

function tankHeadRotate(tankhead,tank) {
	 $(".mask").bind("mousemove",function  (event) {
	       var lx=event.originalEvent.layerX;
		   var ly=event.originalEvent.layerY;
		   var nx=tank.position().left;
		   var ny=tank.position().top;
           tankhead.data("tanktHeadAngle",Math.atan2((lx-nx),(ny-ly)));
		   rotate (tankhead[0],tankhead.data("tanktHeadAngle")-tank.data("tankAngle"))
     })
		 //setInterval(function(){
		   
		 //},60)
}
function sendShell (scene,bosswalls,boss,tank,trees,shell,dtankarr) {
	var sceneW=scene.width();
	var sceneH=scene.height();
	var hits;//检测到的碰撞物
	// 炮弹运行
   dtankarr.t5=setInterval(function(){
	  if(shell){	  
	    shell.css("left",function  () {	
			var lefts=shell.position().left;
			lefts+=Math.sin(shell.data("shellAngle"))*shell.data("shellSpeed");
		return lefts;
	    }).css("top",function  () {
		return shell.position().top-=Math.cos(shell.data("shellAngle"))*shell.data("shellSpeed");
	    })
		}
   },80)
	 //炮弹检测
    dtankarr.t6=setInterval(function(){
       //检测炮弹碰撞树木
		 if(hit(trees,shell)){
			 clearInterval(dtankarr.t6);
			 var t;
			 clearTimeout(t);
			var fires=$("<div>").css({
			width:20,height:20,background:"url(img/fire.png)",position:"absolute",
			top:shell.position().top,
			left:shell.position().left,
			"z-index":5
			}).appendTo(scene);
		   shell.remove();
		   shell=null;
		   tank.data("fire",true);
		    t=setTimeout(function  () {
			   fires.remove();
		       fires=null;
		   },200)
		   //检测边界
		 }else	if(shell.position().left<=0||shell.position().left>=sceneW-13||shell.position().top<=0||shell.position().top>=sceneH-13){
		   clearInterval(dtankarr.t6);
		   shell.remove();
		   shell=null;
		   tank.data("fire",true);
		  }else	if((hits=hit(dtankarr,shell))&& dtankarr.length>0){ //检测敌坦克
            clearInterval(dtankarr.t6);
			for (var i=0; i<dtankarr.length; i++) {
				if(hits.data("index")==dtankarr[i].data("index")){
				  dtankarr.splice(i,1);
				  break;
				}
			} 
             if(dtankarr.next){
			  if(dtankarr.length==0){
			   next ()
			   }
			  }
			   if(hits){
				  hits.data("shell").remove();
				  hits.data("shell",null);
				  hits.remove();
				  hits=null;
			   }
			 var t;
			 clearTimeout(t);
			var fires=$("<div>").css({
			width:20,height:20,background:"url(img/fire.png)",position:"absolute",
			top:shell.position().top,
			left:shell.position().left,
			"z-index":5
			}).appendTo(scene);
		   shell.remove();
		   shell=null;
		   tank.data("fire",true);
		    t=setTimeout(function  () {
			   fires.remove();
		       fires=null;
		   },200)
		   
		  }else if(hits=hit(bosswalls,shell)){//检测boss墙
			  clearInterval(dtankarr.t6);
			 var num=hits.data("hits");
              hits.data("hits",++num);
			 if(hits.data("hits")<3){
			 hits.css("background","url(img/dbosswall.png)")
			 }else{
			 hits.remove();
			 hits=null;
			 }
			 var t;
			 clearTimeout(t);
			var fires=$("<div>").css({
			width:20,height:20,background:"url(img/fire.png)",position:"absolute",
			top:shell.position().top,
			left:shell.position().left,
			"z-index":5
			}).appendTo(scene);
		   shell.remove();
		   shell=null;
		   tank.data("fire",true);
		    t=setTimeout(function  () {
			   fires.remove();
		       fires=null;
		   },200)
		   
		  }else	if(hits=hit(boss,shell)){	
			  clearInterval(dtankarr.t6);
			 var num=hits.data("hits");
              hits.data("hits",++num);
			 if(hits.data("hits")<3){
			 hits.css("background","url(img/dboss.png)")
			 }else{
			 hits.remove();
			 hits=null;
				 var bossfires=$("<div>").css({
				width:104,height:64,background:"url(img/bossfire.png)",position:"absolute",
				top:420,
				left:330,
				"z-index":5
				}).appendTo(scene);
				replay();
			 }
			 var t;
			 clearTimeout(t);
			var fires=$("<div>").css({
			width:20,height:20,background:"url(img/fire.png)",position:"absolute",
			top:shell.position().top,
			left:shell.position().left,
			"z-index":5
			}).appendTo(scene);
		   shell.remove();
		   shell=null;
		   tank.data("fire",true);
		    t=setTimeout(function  () {
			   fires.remove();
		       fires=null;
			   if(bossfires){
			   bossfires.remove();
		       bossfires=null;
			   }
		   },200)
		   
		  }
    },80)
}

function checkrun (scene,tank,trees,bosswalls) {
	 var sceneW=scene.width();
	 var sceneH=scene.height();
	 dtankarr.t4=setInterval(function(){
		 var left=tank.position().left;
	     var top=tank.position().top;
	 switch (tank.data("tankdir")) {
		 case "l":
			 left-=tank.data("tankspeedx");
		 break;
		 case "r":
		     left+=tank.data("tankspeedx");
		 break;
		 case "t":
			 top-=tank.data("tankspeedy");
		 break;
		 case "b":
		     top+=tank.data("tankspeedy");
		 break;
		 }
         if(left<=0){
		   left=0;
		 }
		 if(left>=sceneW-45){ 
            left=sceneW-45;
		 }
		 if(top<=0){
		   top=0;
		 }
		 if(top>=sceneH-45){
		   top=sceneH-45;
		 }
		tank.css("left",left).css("top",top);
	 if(hit(trees,tank)||hit(bosswalls,tank)){
		switch (tank.data("tankdir")) {
		 case "l":
			 tank.css("left",left+tank.data("tankspeedx"))
		 break;
		 case "r":
		     tank.css("left",left-tank.data("tankspeedx"))
		 break;
		 case "t":
		     tank.css("top",top+tank.data("tankspeedy"))
		 break;
		 case "b":
		     tank.css("top",top-tank.data("tankspeedy"))
		 break;
		 }
       
	 }
	  
	
 },80)
}

//敌坦克运行主函数
         //dTankRun(scene,bosswalls,boss,mytank,trees,dtankarr);  
function dTankRun(scene,bosswalls,boss,mytank,trees,dtankarr){
	    //动态获取关卡数
		var guanka=$(window).data("guanka");
		//动态获取难度系数
		var step=$(window).data("step");
		//确定敌坦克数量
		var dnum=$(window).data("dnum")+guanka+step;
		//确定敌坦克速度
		var dspeed=$(window).data("dspeed")+guanka+step;
		//确定敌坦克子弹速度
		var dshellspeed=$(window).data("dshellspeed")+guanka+step;
       //动态创建敌坦克
	   createTank(dnum,dtankarr,scene)
	   //检测敌坦克运动
	  dtankarr.t=setInterval(function(){
		  if(dtankarr.length==0){
		    return;
		  }
		  $.each(dtankarr,function  (index,obj) {
			  if(!obj){
			   return;
			  }
              dcheckrun (scene,obj,trees,bosswalls,dspeed,mytank,boss,dshellspeed)//dspeed->5
		  })
	  },80)
	   //监测敌坦克转向
		  var randomtime=5000;
	  dtankarr.t1=setInterval(function(){
	     if(dtankarr.length==0){
		    return;
		  }
		  
			randomtime=3000+3000*Math.random();
		  $.each(dtankarr,function  (index,obj) {	
			  if(!obj){
			   return;
			  }
              dcheckdir (obj);
		  })
	  },randomtime)
	   //发射敌坦克炮弹
	  dtankarr.t2=setInterval(function(){
	     if(dtankarr.length==0){
		    return;
		  }
		  $.each(dtankarr,function  (index,obj) {	
			  if(!obj){
			   return;
			  }
		 // if(hitLine(obj,mytank)){
			   //创建敌人炮弹
		   if(obj.data("fire")){
			  obj.data("fire",false);
			  obj.data("shell",$("<div>").css({
			width:13,height:13,background:"url(img/foeshell.png)",position:"absolute",
			top:obj.position().top+10,
			left:obj.position().left+15,
			"z-index":0
			}).appendTo(scene));
		   }
            
			
		  // }
		  // if(obj.data("shell")){
		    dsendShell(scene,bosswalls,boss,obj,trees,obj.data("shell"),mytank,dshellspeed);//dshellspeed
			dcheckShell(scene,bosswalls,boss,obj,trees,obj.data("shell"),mytank);
		  // }
		  })
	  },80)

	//检测敌炮弹
	 dtankarr.t3=setInterval(function(){
		 if(dtankarr.length==0){
		    return;
		  }
		 $.each(dtankarr,function  (index,obj) {
           if(!obj){
		     return;
		   }
           dcheckShell(scene,bosswalls,boss,obj,trees,obj.data("shell"),mytank);
		 })
	 },80)
	 
  }

 function dcheckShell (scene,bosswalls,boss,tank,trees,shell,mytank) {
	    var sceneW=scene.width();
		var sceneH=scene.height();
		if(!shell){
		  return;
		}
		//检测炮弹碰撞树木
//		 if(hit(trees,shell)){
//			 var t;
//			 clearTimeout(t);
//			var fires=$("<div>").css({
//			width:20,height:20,background:"url(img/fire.png)",position:"absolute",
//			top:shell.position().top,
//			left:shell.position().left,
//			"z-index":5
//			}).appendTo(scene);
//		   shell.remove();
//		   shell=null;
//		   tank.data("fire",true);
//		   tank.data("flag",true);
//		    t=setTimeout(function  () {
//			   fires.remove();
//		       fires=null;
//		   },200)
//		   //检测边界
//		 }else	
          if(shell.position().left<=0||shell.position().left>=sceneW-13||shell.position().top<=0||shell.position().top>=sceneH-13){
		   shell.remove();
		   shell=null;
		   tank.data("fire",true);
		   tank.data("flag",true);
		  }else	if((hits=hit(mytank,shell))){ //检测敌坦克
			
			 hits.css("display","none");
			 var t;
			 clearTimeout(t);
			var fires=$("<div>").css({
			width:20,height:20,background:"url(img/fire.png)",position:"absolute",
			top:shell.position().top,
			left:shell.position().left,
			"z-index":5
			}).appendTo(scene);
		   shell.remove();
		   shell=null;
		   tank.data("fire",true);
		    t=setTimeout(function  () {
			   fires.remove();
		       fires=null;
		   },200)
		   replay ()
		  }else if(hits=hit(bosswalls,shell)){//检测boss墙
			 var num=hits.data("hits");
              hits.data("hits",++num);
			 if(hits.data("hits")<3){
			 hits.css("background","url(img/dbosswall.png)")
			 }else{
			 hits.remove();
			 hits=null;
			 }
			 tank.data("flag",true);
			 var t;
			 clearTimeout(t);
			var fires=$("<div>").css({
			width:20,height:20,background:"url(img/fire.png)",position:"absolute",
			top:shell.position().top,
			left:shell.position().left,
			"z-index":5
			}).appendTo(scene);
		   shell.remove();
		   shell=null;
		   tank.data("fire",true);
		    t=setTimeout(function  () {
			   fires.remove();
		       fires=null;
		   },200)
		   
		  }else	if(hits=hit(boss,shell)){	//检测boss
			 var num=hits.data("hits");
              hits.data("hits",++num);
			 if(hits.data("hits")<3){
			 hits.css("background","url(img/dboss.png)")
			 }else{
			 hits.css("display","none");
				 var bossfires=$("<div>").css({
				width:104,height:64,background:"url(img/bossfire.png)",position:"absolute",
				top:420,
				left:330,
				"z-index":5
				}).appendTo(scene);
			 }
			 var t;
			 clearTimeout(t);
			var fires=$("<div>").css({
			width:20,height:20,background:"url(img/fire.png)",position:"absolute",
			top:shell.position().top,
			left:shell.position().left,
			"z-index":5
			}).appendTo(scene);
		   shell.remove();
		   shell=null;
		   tank.data("fire",true);
		    tank.data("flag",true);
		    t=setTimeout(function  () {
			   fires.remove();
		       fires=null;
			   if(bossfires){
			   bossfires.remove();
		       bossfires=null;
			   }
		   },200)
		   replay ()
		  }
 }
function dsendShell (scene,bosswalls,boss,tank,trees,shell,mytank,dshellspeed) {
	var sceneW=scene.width();
	var sceneH=scene.height();
	var hits;//检测到的碰撞物
	if(tank.data("flag")){
		tank.data("flag",false);
	    tank.data("tempdir",tank.data("tankdir"));
	}
	if(shell){
	   if(tank.data("tempdir")=="l"){
	     shell.css("left",(shell.position().left)-=dshellspeed);
	   }else if(tank.data("tempdir")=="r"){
	     shell.css("left",(shell.position().left)+=dshellspeed);
	   }else if(tank.data("tempdir")=="t"){
	     shell.css("top",(shell.position().top)-=dshellspeed);
	   }else if(tank.data("tempdir")=="b"){
	     shell.css("top",(shell.position().top)+=dshellspeed);
	   }
	   }
	
}
function dcheckdir (tank) {
var arr=["l","r","t","b"];
tank.data("tankdir",arr[Math.floor(Math.random()*4)]);
}

function dcheckrun (scene,tank,trees,bosswalls,dspeed,mytank,boss,dshellspeed) {
	var sceneW=scene.width();
	var sceneH=scene.height();
	var left=tank.position().left;
	var top=tank.position().top;
	 switch (tank.data("tankdir")) {
		 case "l":
			 left-=dspeed;
		  rotate(tank[0],1.5707963267948966);
		 break;
		 case "r":
		     left+=dspeed;
		 rotate(tank[0],-1.5707963267948966);
		 break;
		 case "t":
			 top-=dspeed;
		 rotate(tank[0],3.141592653589793);
		 break;
		 case "b":
		     top+=dspeed;
		 rotate(tank[0],0);
		 break;
		 }
         if(left<=0){
		   left=0;
		   tank.data("side",true);
		 }
		 if(left>=sceneW-45){ 
            left=sceneW-45;
			tank.data("side",true);
		 }
		 if(top<=0){
		   top=0;
		   tank.data("side",true);
		 }
		 if(top>=sceneH-45){
		   top=sceneH-45;
		   tank.data("side",true);
		 }
		 if(tank.data("side")){
			 tank.data("side",false);
			var arr=["l","r","t","b"];
			for (var i=0; i<arr.length; i++) {
				if(arr[i]==tank.data("tankdir")){
				  arr.splice(i,1);
				  break;
				}
			}
			tank.data("tankdir",arr[Math.floor(Math.random()*3)]);
		 }
		tank.css("left",left).css("top",top);
	 if(hit(trees,tank)||hit(bosswalls,tank)){ 
		 tank.data("side",false);
		 switch (tank.data("tankdir")) {
		 case "l":
			 tank.css("left",left+dspeed)
		 break;
		 case "r":
		     tank.css("left",left-dspeed)
		 break;
		 case "t":
		     tank.css("top",top+dspeed)
		 break;
		 case "b":
		     tank.css("top",top-dspeed)
		 break;
		 }
		var arr=["l","r","t","b"];
		for (var i=0; i<arr.length; i++) {
			if(arr[i]==tank.data("tankdir")){
			  arr.splice(i,1);
			  break;
			}
		}
			tank.data("tankdir",arr[Math.floor(Math.random()*3)]);	
	 }
       
	 
}

function  createTank(dnum,dtankarr,scene) {
    var nums=0;
    var tt=setInterval(function(){
		if(dtankarr.length>3){
	       return false;
	    }
	if(nums==dnum){
	 clearInterval(tt);
	 dtankarr.next=true;
	}else{
	  var obj=$("<div>").css({
		width:45,height:45,background:"url(img/foetank.png) no-repeat",top:0,left:135+490*Math.random(),position:"absolute"
	  }).appendTo(scene);
	  obj.data({
			//坦克的角度
			tankAngle:0,
			//开火
			fire:true,
			//坦克方向
			tankdir:"b",
			//检测是否是敌坦克
			flag:true,
			//用于碰撞后删除的标记
			index:nums,
			//用于检测是否下一关
		});
		
	  nums++;
	  dtankarr.push(obj);
		}
	},6000)
}


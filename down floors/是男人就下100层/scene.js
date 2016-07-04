//欢迎界面
function wel (cobj,w,h) {
  this.width=w;
  this.height=h;
  this.cobj=cobj;
  this.name="wel";
  this.nail=new nail(cobj);
  this.floors=0;
  this.title="优逸客出品 http://sxuek.com";
  this.untitle="%u4F18%u9038%u5BA2%u51FA%u54C1%20http%3A//sxuek.com";
  if(escape(this.title)!==this.untitle){
    alert(unescape("%u8BF7%u5C0A%u91CD%u7248%u6743%2C%u4E0D%u5F97%u7BE1%u6539"));
  }
}
wel.prototype={
draw:function  () {
	 var cobj=this.cobj;
     cobj.fillStyle="#003399";
	 cobj.fillRect(0,0,this.width,this.height);
	 cobj.fillStyle="#4C71B8";
	 cobj.fillRect(10,10,this.width-20,this.height-20);
	 cobj.fillStyle="#555";
	 cobj.fillRect(10,190,this.width-20,2);
	 cobj.fillStyle="#fff";
	 cobj.font="30px 微软雅黑";
	 cobj.fillText("是男人就下100层",130,200)
	 cobj.font="20px 楷体";
	 cobj.fillText("上下键操作人物",170,300);
	 cobj.font="15px 楷体";
	 cobj.fillText(this.title,280,450);
	 cobj.font="13px 楷体";
	 cobj.fillText("作者:岳英俊",400,470);
	 cobj.font="20px 宋体";
	 cobj.strokeText("点击游戏窗口开始游戏",140,250)
	 
},
runDraw:function  (life,floors) {
	 var life=life?life:4;
	 var floors=floors?floors:this.floors;
     var cobj=this.cobj;
     cobj.fillStyle="#003399";
	 cobj.fillRect(0,0,this.width,this.height);
	 cobj.fillStyle="#000";
	 cobj.fillRect(20,20,this.width-40,this.height-40);
	 cobj.fillStyle="#010066";
	 cobj.fillRect(20,20,this.width-40,30);
     cobj.fillStyle="#FF6501";
	 cobj.fillRect(30,30,25*life,10);
	 cobj.font="10px 宋体";
	 cobj.fillText("life",140,38);
	 cobj.font="10px 宋体";
	 cobj.fillText("floors:",390,38);

	 cobj.font="25px 黑体";
	 cobj.fillText(floors,430,42);
	 for (var i=0; i<38; i++) {
		 cobj.save();
		 
		 cobj.translate(30+i*12,45);
		 cobj.rotate(45*Math.PI/180);
	     this.nail.drawTriangle(10);
	   cobj.restore();
	 }
     
}

}

//普通楼层
function floors (cobj,x,y) {
	 this.width=100;
	 this.height=12;
	 this.cobj=cobj;
	 this.name="floors";
	 this.save=true;
}
floors.prototype={
  int:function  () {
	  var cobj=this.cobj;
	  cobj.lineWidth=1;
	  cobj.fillStyle="#015ABE";
	  cobj.strokeStyle="#015ABE";
  },
  draw:function  (x,y) {
  var cobj=this.cobj;
  this.int();
  this.x=x;
  this.y=y;
  cobj.save();
  cobj.shadowColor="red";
  cobj.shadowBlur=2;
  cobj.shadowOffsetX=1; 
  cobj.translate(this.x,this.y);
  cobj.fillRect(0,0,this.width,this.height);
  cobj.restore();
  }
}

//塌陷楼层
function sink (cobj) {
     this.width=100;
	 this.height=12;
	 this.cobj=cobj;
	 this.name="sink";
	 this.flag=true;
	 this.isClose=false;
	 this.save=true;
	 this.speed=1;
}
sink.prototype={
	int:function  () {
	  cobj=this.cobj;
	  cobj.lineWidth=1;
	  cobj.fillStyle="#016362";
	  cobj.strokeStyle="#016362";
  },
 draw:function  (x,y) {
  var t=t||15;
  var cobj=this.cobj;
  this.int();
  this.x=x;
  this.y=y;
  cobj.save(); 
  cobj.translate(this.x,this.y);
  cobj.fillRect(0,0,this.width,this.height);
  cobj.restore();
 },
 moves:function  (x,y) {
	        if(this.speed<0.01){
			  return;
			}
	         cobj=this.cobj;
			  this.int();
			  this.flag=false;
			  var that=this;
			  this.randomRect();
			  that.drawRandom(this.speed*=0.8,x,y);  
 },
randomRect:function  () {
	 var cobj=this.cobj;
	 var arr=[];
    for (var i=0; i<3; i++) {
	  var obj={x:Math.random()*(this.width-5),y:Math.random()*(this.height-5),w:4,h:4}
      arr.push(obj);
    }
	this.randomArr=arr;
},
drawRandom:function  (filter,x,y) {
var cobj=this.cobj;
var arr=this.randomRect();

cobj.save();
cobj.translate(x,y);
for (var i=0; i<this.randomArr.length; i++) {
	cobj.fillStyle="rgba(0,103,104,"+filter+")"
	cobj.fillRect(this.randomArr[i].x,this.randomArr[i].y,this.randomArr[i].w,this.randomArr[i].y);
}

cobj.restore();
}
}
//钉子
function nail (cobj) {
	 this.width=100;
	 this.height=14;
	 this.heights=7
	 this.cobj=cobj;
	 this.name="nail";
	 this.kill=true;
}
nail.prototype={
	int:function  () {
		cobj=this.cobj;
	  cobj.lineWidth=1;
	  cobj.fillStyle="#CB6638";
	  cobj.strokeStyle="#CB6638";
  },
 draw:function  (x,y) {
  var cobj=this.cobj;
  this.int();
  this.x=x;
  this.y=y;
  cobj.save();
  cobj.translate(x,y);
  cobj.fillRect(0,0,this.width,this.heights);
  for (var i=0; i<6; i++) {
	 cobj.save()
     cobj.translate(i*16,-15);
	 this.drawTriangle(15)
	 cobj.restore();
  }
  cobj.restore();
 },
 drawTriangle:function  (num) {
	 this.int();
   var cobj=this.cobj;
   cobj.lineWidth=0;
   var colorObj=cobj.createLinearGradient(0,8,16,8);
   colorObj.addColorStop(0,"#fff");
   colorObj.addColorStop(0,"#eee");
   colorObj.addColorStop(0.5,"#ccc");
   colorObj.addColorStop(0,"#eee");
   colorObj.addColorStop(1,"#fff");
   cobj.fillStyle=colorObj;
   cobj.beginPath();
   cobj.moveTo(8,0);
   cobj.lineTo(0,num);
   cobj.lineTo(16,num);
   cobj.closePath();
   cobj.fill();
 }

}
//弹跳
function jump (cobj) {
     this.width=100;
	 this.height=15;
	 this.heights=7;
	 this.cobj=cobj;
	 this.name="jump";
	 //是否弹跳
	 this.flag=true;
	 this.t=3;
	 this.isClose=false;
	 this.save=true;
	 this.angle=90;
}
jump.prototype={
	int:function  () {
		cobj=this.cobj;
	  cobj.lineWidth=1;
	  cobj.fillStyle="#CB6638";
	  cobj.strokeStyle="#CB6638";
  },
 draw:function  (x,y,t) {
	  this.int();
	var t=t?t:this.t;
  var cobj=this.cobj;
  this.x=x;
  this.y=y;
  cobj.save(); 
  cobj.translate(x,y);
  cobj.fillRect(0,t,this.width,this.heights);
  cobj.fillRect(0,15,this.width,this.heights);
  cobj.fillRect(20,t,10,15-t);
  cobj.fillRect(70,t,10,15-t);
  cobj.restore();

 },
 moves:function  (x,y) {
	        this.x=x;
			this.y=y
	         cobj=this.cobj;
			 this.int();
			 var that=this;
			  this.flag=false;
			 that.angle+=20;
			 that.draw(that.x,that.y,that.t*Math.sin(that.angle*Math.PI/180));  
 }
}


//人物

function  person(cobj) {
	this.cobj=cobj;
	this.height=40;
	this.width=30;
	this.name="person";
	this.x=0;
	this.y=0
	this.intAngle=90;
	this.angle1=50;
	this.angle2=-50;
	this.angle3=-30;
	this.angle4=30;
	this.moves=0;
	//跑动速度
	this.speed=5;
	//跑动摆幅速度
	this.angleSpeed=100;
	//是否开跑
	this.run=false;
	//开跑方向
	this.dir="";
	//是否坠落
	this.drop=false;
	this.life=4;
	this.jumpSpeed=0;
	this.jump=true;
	this.dropSpeed=5;
}
person.prototype={
	int:function  () {
		cobj=this.cobj;
	  cobj.lineWidth=1;
	  cobj.fillStyle="rgba(255,255,255,1)";
	  cobj.strokeStyle="rgba(255,255,255,1)";
  },
  draw:function  (x,y,angle1,angle2,angle3,angle4) {
	  cobj=this.cobj;
	  this.int();
	  this.x=x;
	  this.y=y;
	  var angle1=angle1?angle1:this.angle1;
	  var angle2=angle2?angle2:this.angle2;
	  var angle3=angle3?angle3:this.angle3;
	  var angle4=angle4?angle4:this.angle4;
	              cobj.save();
				  cobj.translate(x,y);
				  
				//head
				  cobj.beginPath();
				  cobj.save();
				  cobj.translate(16,6);
                  cobj.arc(0,0,6,0,2*Math.PI);
				  cobj.fill();
				  cobj.restore();
				 //body
				  cobj.beginPath();
				  cobj.lineCap="round";
				  cobj.save();
				  cobj.lineWidth=6;
				  cobj.translate(14,11);
				  cobj.rotate(10*Math.PI/180);
				  cobj.moveTo(0,0);
				  cobj.lineTo(0,10);
				  cobj.stroke();
				  cobj.restore();
				 //hand right
				   cobj.beginPath();
				   cobj.save();
				   cobj.translate(14,8);
				   cobj.rotate(angle1*Math.PI/180);
				   cobj.lineCap="round";
				   cobj.lineWidth=3;
				   cobj.moveTo(0,0);
				   cobj.lineTo(0,15);
				   cobj.stroke();
				   cobj.restore();
				 //hand left
				   cobj.beginPath();
				   cobj.save();
				   cobj.translate(14,8);
				   cobj.rotate(angle2*Math.PI/180);
				   cobj.lineCap="round";
				   cobj.lineWidth=3;
				   cobj.moveTo(0,0);
				   cobj.lineTo(0,15);
				   cobj.stroke();
				   cobj.restore();
				 //foot right
				   cobj.beginPath();
				   cobj.save();
				   cobj.translate(12,22);
				   cobj.rotate(angle3*Math.PI/180);
				   cobj.lineCap="round";
				   cobj.lineWidth=4;
				   cobj.moveTo(0,0);
				   cobj.lineTo(0,16);
				   cobj.stroke();
				   cobj.restore();

				  //foot left
				   cobj.beginPath();
				   cobj.save();
				   cobj.translate(12,22);
				   cobj.rotate(angle4*Math.PI/180);
				   cobj.lineCap="round";
				   cobj.lineWidth=4;
				   cobj.moveTo(0,0);
				   cobj.lineTo(0,16);
				   cobj.stroke();
				   cobj.restore();
				   cobj.restore();
	   
  },
draw2:function  (x,y,angle1,angle2,angle3,angle4) {
	  cobj=this.cobj;
	  this.int();
	  this.x=x;
	  this.y=y;
	  var angle1=angle1?angle1:this.angle1;
	  var angle2=angle2?angle2:this.angle2;
	  var angle3=angle3?angle3:this.angle3;
	  var angle4=angle4?angle4:this.angle4;
	              cobj.save();
				  cobj.translate(x,y);
				  
				//head
				  cobj.beginPath();
				  cobj.save();
				  cobj.translate(15,6);
                  cobj.arc(0,0,6,0,2*Math.PI);
				  cobj.fill();
				  cobj.restore();
				 //body
				  cobj.beginPath();
				  cobj.lineCap="round";
				  cobj.save();
				  cobj.lineWidth=6;
				  cobj.translate(15,11);
				  cobj.rotate(-10*Math.PI/180);
				  cobj.moveTo(0,0);
				  cobj.lineTo(0,10);
				  cobj.stroke();
				  cobj.restore();
				 //hand right
				   cobj.beginPath();
				   cobj.save();
				   cobj.translate(15,8);
				   cobj.rotate(angle1*Math.PI/180);
				   cobj.lineCap="round";
				   cobj.lineWidth=3;
				   cobj.moveTo(0,0);
				   cobj.lineTo(0,15);
				   cobj.stroke();
				   cobj.restore();
				 //hand left
				   cobj.beginPath();
				   cobj.save();
				   cobj.translate(15,8);
				   cobj.rotate(angle2*Math.PI/180);
				   cobj.lineCap="round";
				   cobj.lineWidth=3;
				   cobj.moveTo(0,0);
				   cobj.lineTo(0,15);
				   cobj.stroke();
				   cobj.restore();
				 //foot right
				   cobj.beginPath();
				   cobj.save();
				   cobj.translate(16,22);
				   cobj.rotate(angle3*Math.PI/180);
				   cobj.lineCap="round";
				   cobj.lineWidth=4;
				   cobj.moveTo(0,0);
				   cobj.lineTo(0,16);
				   cobj.stroke();
				   cobj.restore();

				  //foot left
				   cobj.beginPath();
				   cobj.save();
				   cobj.translate(18,22);
				   cobj.rotate(angle4*Math.PI/180);
				   cobj.lineCap="round";
				   cobj.lineWidth=4;
				   cobj.moveTo(0,0);
				   cobj.lineTo(0,16);
				   cobj.stroke();
				   cobj.restore();
				   cobj.restore();
	   
  },
draw3:function  (x,y,angle1,angle2,angle3,angle4) {
	  cobj=this.cobj;
	  this.int();
	  this.x=x;
	  this.y=y;
	  var angle1=angle1?angle1:this.angle1;
	  var angle2=angle2?angle2:this.angle2;
	  var angle3=angle3?angle3:this.angle3;
	  var angle4=angle4?angle4:this.angle4;
	              cobj.save();
				  cobj.translate(x,y);
				//head
				  cobj.beginPath();
				  cobj.save();
				  cobj.translate(16,6);
                  cobj.arc(0,0,6,0,2*Math.PI);
				  cobj.fill();
				  cobj.restore();
				 //body
				  cobj.beginPath();
				  cobj.lineCap="round";
				  cobj.save();
				  cobj.lineWidth=6;
				  cobj.translate(7,11);
				  cobj.moveTo(0,0);
				  cobj.lineTo(3,15);
				  cobj.lineTo(15,15);
				  cobj.lineTo(18,0);
				  cobj.closePath();
				  cobj.fill();
				  //cobj.fillRect(0,0,18,15)
				  cobj.restore();
				 //hand right
				   cobj.beginPath();
				   cobj.save();
				   cobj.translate(8,14);
				   cobj.rotate(20*Math.PI/180);
				   cobj.lineCap="round";
				   cobj.lineWidth=3;
				   cobj.moveTo(0,0);
				   cobj.lineTo(0,12);
				   cobj.stroke();
				   cobj.restore();
				 //hand left
				   cobj.beginPath();
				   cobj.save();
				   cobj.translate(24,14);
				   cobj.rotate(-20*Math.PI/180);
				   cobj.lineCap="round";
				   cobj.lineWidth=3;
				   cobj.moveTo(0,0);
				   cobj.lineTo(0,12);
				   cobj.stroke();
				   cobj.restore();
				 //foot right
				   cobj.beginPath();
				   cobj.save();
				   cobj.translate(12,22);
				   cobj.lineCap="round";
				   cobj.lineWidth=4;
				   cobj.moveTo(0,0);
				   cobj.lineTo(0,16);
				   cobj.stroke();
				   cobj.restore();

				  //foot left
				   cobj.beginPath();
				   cobj.save();
				   cobj.translate(20,22);
				   cobj.lineCap="round";
				   cobj.lineWidth=4;
				   cobj.moveTo(0,0);
				   cobj.lineTo(0,16);
				   cobj.stroke();
				   cobj.restore();
				   cobj.restore();
	   
  }
}

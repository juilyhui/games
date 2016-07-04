function intInterface (cobj,clientW,clientH) {
	this.clientW=clientW;
	this.clientH=clientH;
	//关卡
	this.step=0;
	//关卡容器
	this.div=$("<div>").css({
		 width:50,height:50,position:"absolute",left:"50%",top:"50%",
		 color:"#fff",fontWeight:"bold",fontSize:"35px"
		}).appendTo("body");
	this.name="intInterface";
	//下落速度
	this.speedDrop=3;
	//上升速度
	this.speedUp=30;
	//小鸟x
	this.cobj=cobj;
	//管道数组
	this.funnelUp=[];
	this.funnelDown=[];
	//创建管道数组
	this.createFunnel();
	//运行界面
	this.run();
	//开始按钮
	this.startPlay();
	//是否开始游戏
	this.start=false;

	//创建选项卡
	//this.option()
	
    
}
intInterface.prototype={
	option:function  () {
     var div=document.createElement("div");
	 div.style.cssText="border:4px solid #ccc;border-radius:20px;position:absolute;z-index:1;background:rgba(19,140,171,0.5)";
	 div.style.width="40%";
	 div.style.height="30%";
     div.style.left=(this.clientW-this.clientW*0.4)/2+"px";
	 div.style.top=-this.clientH*0.4+"px";
	 var startBtn=document.createElement("div");
	 startBtn.style.cssText="border:1px solid #ccc;border-radius:4px;text-align:center;line-height:40px;cursor:pointer;margin-left:10%;margin-top:20%;float:left;";
     startBtn.style.width="100px";
	 startBtn.style.height="40px";
	 startBtn.innerHTML="重新游戏";
     this.startBtn=startBtn;
	 var score=document.createElement("div");
	 score.style.cssText="border:1px solid #ccc;border-radius:4px;text-align:center;line-height:30px;cursor:pointer;margin-right:10%;margin-top:18%;float:right;";
     score.style.width="120px";
	 score.style.height="60px";
	 score.innerHTML="score:";
	 
	 div.appendChild(startBtn);
	 div.appendChild(score);
	 document.body.appendChild(div);
	 animate(div,{top:(this.clientH-this.clientH*0.4)/2},500);
	 this.score=score;
	 startBtn.onclick=function  () {
		 location.reload();
	 }
	},
	//创建建筑
    house:function  () {
	 var cobj=this.cobj;
	 cobj.beginPath();
	 var colorObj=cobj.createPattern(document.getElementById("house"),"repeat-x")
	 cobj.fillStyle=colorObj;
	 cobj.save();
	 cobj.translate(0,this.clientH-180);
	 cobj.fillRect(0,0,this.clientW,180);
	 cobj.restore();

    },
	createFunnel:function  () {
     var funnelObj=new funnel(this.cobj,this.clientW,this.clientH);
	 var spacex=funnelObj.spacex;
	 //动态计算管道的数量
	 var num=Math.ceil(this.clientW/(funnelObj.width+spacex));
			//上
			 for (var i=0; i<num; i++) {
			   var obj=new funnel(this.cobj,this.clientW,this.clientH);
			   obj.x=this.clientW+i*(obj.width+obj.spacex);
			   obj.y=0;
			   obj.height=parseInt(this.clientH*(0.2+0.4*Math.random()));
               this.funnelUp.push(obj);
			 }

			  //下
			 for (var i=0; i<num; i++) {
			   var obj=new funnel(this.cobj,this.clientW,this.clientH);
			   obj.x=this.clientW+i*(obj.width+obj.spacex);
			   obj.y=this.funnelUp[i].height+obj.spacey;
			   obj.height=this.clientH-this.funnelUp[i].height-obj.spacey-50;
               this.funnelDown.push(obj);
			 }


	},
	run:function  () {
		var cobj=this.cobj;
		var self=this;
		var wayObj=new way(cobj,this.clientW,this.clientH);
		var birdObj=new bird(cobj,this.clientW,this.clientH);
		this.birdObj=birdObj;
        var intAngle=birdObj.intAngle;
		var angleSpeed=birdObj.speedAngle;
		var wayx=wayObj.x;
		var waySpeed=wayObj.speedx;
		this.t=setInterval(function(){
			cobj.clearRect(0,0,self.clientW,self.clientH);
			//创建房子
			self.house();	
			 //重绘道路
			 wayx+=waySpeed;
			 if(wayx>=self.clientW){
			   wayx=0;
			 }

			 //重绘管道
			 wayObj.draw(-wayx);
			  //重绘小鸟
			  intAngle+=angleSpeed;
			  var num=Math.sin(intAngle*Math.PI/180)*20;
			  birdObj.flayx=10+num;
			  birdObj.flayy=30+num;
			  birdObj.draw();
			 if(!self.start){
			   return;
			 }
			  
              self.speedDrop*=1.05;
			  birdObj.y+=self.speedDrop;

			 for (var i=0; i<self.funnelUp.length; i++) {
				 if(self.funnelUp[i].x<-30){
				   var obj=new funnel(self.cobj,self.clientW,self.clientH);
			   obj.x=self.clientW+(obj.spacex);
			   obj.y=0;
			   obj.height=parseInt(self.clientH*(0.2+0.4*Math.random()));
				   self.funnelUp.splice(i,1,obj);
                   var obj1=new funnel(self.cobj,self.clientW,self.clientH);
			   obj1.x=self.clientW+(obj.spacex);
			   obj1.y=self.funnelUp[i].height+obj.spacey;
			   obj1.height=self.clientH-self.funnelUp[i].height-obj.spacey-50;
				   self.funnelDown.splice(i,1,obj1);
				  }else{
					  if(self.funnelUp[i].x<=birdObj.x&&!self.funnelUp[i].flag){
                        self.funnelUp[i].flag=true;
					    self.step++;
						self.showStep(self.step);
					  }
				      self.funnelUp[i].x-=self.funnelUp[i].speedx;
					  self.funnelDown[i].x-=self.funnelDown[i].speedx;
					  self.funnelUp[i].drawUp()
					  self.funnelDown[i].drawDown();
				  }
			  }
			 
		      if(birdObj.y<40){
			   birdObj.y=40;
			  }
			  if(hit(self.funnelUp,birdObj)||hit(self.funnelDown,birdObj)||birdObj.y>self.clientH-80){
			    clearInterval(self.t);
                $.ajax({
				url:"php/1.php",
				data:{step:self.step},
				type:"post",
				success:function  (data) {
					self.option();
					self.score.innerHTML="score:"+self.step+"<br>best:"+data;
				}
				})
			  }
			  
			  
		},35)
	},
	showStep:function  (step) {
		this.div.show();
		this.div.html(step);
		 this.div.hide(2000);

		
	},
    startPlay:function  () {
		var self=this;
		var div=$("<div>").css({
		 width:100,height:40,position:"absolute",left:"40%",top:"47%",
		 border:"1px solid #aaa","border-radius":"10px",fontSize:"30px",
			 fontWeight:"bold",textAlign:"center",cursor:"pointer"
		}).html("START").appendTo("body");
		div.one("click",function  () {
         self.start=true;
		 div.hide(200);
		})

    }
}

//绘制小鸟
function bird (cobj,clientW,clientH) {
	this.clientW=clientW;
	this.clientH=clientH;
	this.cobj=cobj;
	this.width=50;
	this.height=40;
	this.name="bird";
	//小鸟平移的x y
	this.x=this.clientW*0.35;
	this.y=(this.clientH-this.height)/2;
	//x速度
	this.speedx=5;
	//y速度
	this.speedy=5;
	//翅膀初始值
	this.intAngle=90;
	//翅膀卷动速度
	this.speedAngle=20;
	//翅膀阀值点初始值
	this.flayx=25;
	this.flayy=40;
   //小鸟过关数
    this.step=0;
   //小鸟是否死亡
    this.die=false;
}
bird.prototype={
  int:function  () {
   var cobj=this.cobj;
   cobj.fillStyle="#fff";
   cobj.strokeStyle="#000";
  },
  draw:function  (x,y) {
   this.x=x?x:this.x;
   this.y=y?y:this.y;
   var cobj=this.cobj;
	 cobj.save();
	 cobj.translate(this.x,this.y);
	 cobj.beginPath();
	 var colorObj=cobj.createPattern(document.getElementById("bird"),"no-repeat")
	 cobj.fillStyle=colorObj;
	 cobj.rect(0,0,50,40);
	 cobj.fill();
	 //cobj.stroke();
	 //翅膀
	 cobj.beginPath();
	 cobj.fillStyle="#fff";
	 cobj.moveTo(18,20);
	 cobj.lineTo(30,20);
	 cobj.bezierCurveTo(40,30,this.flayx,this.flayy,18,20);
	 cobj.fill();
	 cobj.closePath();
	 cobj.restore();
  }
}

//绘制道路
function way (cobj,clientW,clientH) {
	this.clientW=clientW;
	this.clientH=clientH;
	this.cobj=cobj;
	this.width=this.clientW*2;
	this.height=15;
	this.name="way";
	//道路平移的x 
	this.x=0;
	this.y=this.clientH-50;
	//x速度
	this.speedx=3;
}
way.prototype={
  int:function  () {
   var cobj=this.cobj;
   cobj.fillStyle="#fff";
   cobj.strokeStyle="#000";
  },
  draw:function  (x,y) {
   this.x=x?x:this.x;
   this.y=y?y:this.y;
   var cobj=this.cobj;
	 cobj.save();
	 cobj.translate(this.x,this.y);
	 cobj.beginPath();
	 var colorObj=cobj.createPattern(document.getElementById("way"),"repeat-x")
	 cobj.fillStyle=colorObj;
	 cobj.fillRect(0,0,this.width,this.height);
	 cobj.restore();
  }
}

//绘制管道
function funnel (cobj,clientW,clientH) {
	this.name="funnel";
	this.clientW=clientW;
	this.clientH=clientH;
	this.width=70;
    this.height=0;
	this.cobj=cobj;
    this.x=0;
	this.y=0;
	this.spacey=160;
	this.spacex=parseInt(this.width*2.2);
	this.speedx=3;
}

funnel.prototype={
  int:function  () {
   var cobj=this.cobj;
   var colorObj=cobj.createLinearGradient(0,0,70,0);
   colorObj.addColorStop(0,"#84a945");
   colorObj.addColorStop(0.2,"#a5c55c");
   colorObj.addColorStop(0.4,"#dcf685");
   colorObj.addColorStop(0.6,"#b5d368");
   colorObj.addColorStop(0.8,"#699130");
   colorObj.addColorStop(1,"#558022");
   cobj.fillStyle=colorObj;
   cobj.strokeStyle="#000";
  },
  drawUp:function  (x,y) {
	  this.int();
	  var cobj=this.cobj;
	  this.x=x?x:this.x;
	  this.y=y?y:this.y;
	 
	  cobj.save();
	  cobj.translate(this.x,this.y);
	  cobj.beginPath();
	  cobj.rect(0,0,this.width,this.height);
	  cobj.fill();
	  cobj.stroke();
      cobj.restore();
	  cobj.save();
	  cobj.translate(this.x-10,this.height);
	  cobj.beginPath();
	  cobj.rect(0,0,this.width+20,15);
	  cobj.fill();
	  cobj.stroke();
	  cobj.restore();
  },
  drawDown:function  (x,y) {
	  this.int();
	  var cobj=this.cobj;
	  this.x=x?x:this.x;
	  this.y=y?y:this.y;
	  cobj.save();
      cobj.translate(this.x,this.y);
	  cobj.beginPath();
	  cobj.rect(0,0,this.width,this.height); 
	  cobj.fill();
	  cobj.stroke();
      cobj.restore();
	  cobj.save();
	  cobj.translate(this.x-10,this.y);
	  cobj.beginPath();
	  cobj.rect(0,0,this.width+20,15);
	  cobj.fill();
	  cobj.stroke();
	  cobj.restore();
  }
}
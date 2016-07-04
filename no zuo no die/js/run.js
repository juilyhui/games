window.addEventListener("load",function  () {
	//开始界面
var heights=document.documentElement.clientHeight;
//开始界面
var widths=document.documentElement.clientWidth;
var scene=document.getElementsByClassName("scene")[0];
var interface=document.getElementsByClassName("interface")[0];
var startBtn=document.getElementsByClassName("start")[0];
scene.style.height=heights+"px";
interface.style.top=(heights-interface.offsetHeight)/2+"px";
var box=document.getElementsByClassName("box")[0];
var cards=box.getElementsByClassName("card");
hover(box,function  () {
	 for (var i=0; i<cards.length; i++) {
           setCss3(box,{"transition":"all 0.8s ease ","transform":"rotateY(15deg)"})
		   setCss3(cards[i],{"transition":"all 0.5s ease "+i*0.2+"s","transform":"rotateX(0)","margin-top":"15px"});
	      cards[i].style.visibility="visible";
	 }
},function  () {
	 for (var i=0; i<cards.length; i++) {
           setCss3(box,{"transition":"all 0.8s ease ","transform":"rotateY(0deg)"})
		   setCss3(cards[i],{"transition":"all 0.5s ease "+(0.6-i*0.2)+"s","transform":"rotateX(-179deg)","margin-top":0});
	      //cards[i].style.visibility="visible";
	 }
}
)
  
  //难度系数
  var step=1;
   var cards=document.getElementsByClassName("card");
   for (var i=0; i<cards.length; i++) {
	     cards[i].index=i+1;
	     cards[i].onclick=function  (e) {
			 e.stopPropagation();
	       step=this.index;
	      alert(step);
		 }
   }
	startBtn.onclick=function  () {
		
	  scene.style.display="none";
	  //new main()
	  for (var i=0; i<step; i++) {
		   scenes.push(new main(widths,heights));
	  }
	}
},false)

	//游戏主体
//所有的场景
   var scenes=[];
function main (widths,heights) {
	this.widths=widths;
	this.heights=heights;
	 //场景对象
	this.scene=null;
	//创建场景
	this.createScene();
   //人物对象
	this.person=null;
	//创建人物
	this.createPerson();
	//石头的集合
	this.stones=[];
	//创建石头
	//当前时间
    this.now=new Date().getTime();;
	//时间差;
	this.cha;
	//运行游戏
	this.run();
}
main.prototype={
 createScene:function  () {
	  var div=document.createElement("div");
	  div.style.cssText="width:100%;height:30%;border-bottom:10px solid  #000;background:#cfcfcf url(img/hourse.png) repeat-x 0 bottom;position:relative;";
	  document.body.appendChild(div);
      this.scene=div;
 },
createPerson:function  () {
     var div=document.createElement("div");
	 div.style.cssText="width:42px;height:50px;;position:absolute;left:10px;bottom:0";
	 div.innerHTML="<img src='img/run.gif' height=50>"
     this.scene.appendChild(div);
     this.person=div;
},
	run:function  () {
	var that=this;
	  that.time();2014/9/23
      this.jump();
	  
      
	    var randomTime=900+500*Math.random();
		var time=60;
		var currentTime=0;
	 that.t2=setInterval(function(){
		  //计算时间
		  that.cha=((new Date().getTime()-that.now)/1000).toFixed(2)+"'";
	      that.timeBox.innerHTML=that.cha;
		  //让人到屏幕的中间
		   if(that.person.offsetLeft<document.documentElement.clientWidth/3){
		   that.person.style.left=that.person.offsetLeft+1+"px";
		   }
		    currentTime+=time;
		   if(currentTime>randomTime){
		     currentTime=0;
			 randomTime=2000+2000*Math.random();
			 that.createStone();
		   }
           
					  
           //让石头动起来
		   document.title=that.stones.length
		   for (var i=0; i<that.stones.length; i++) {
			    that.stones[i].style.left=that.stones[i].offsetLeft-10+"px";
				if(that.stones[i].offsetLeft<=-that.stones[i].offsetWidth){
				  that.stones.shift();
				}
		   }

		   if(hit(that.stones,that.person)){
		    that.over();
			for (var i=0; i<scenes.length; i++) {
				 clearInterval(scenes[i].t1)
					  clearInterval(scenes[i].t2)
			}
		   }
	  },60)
	},
	time:function  () {
	 var div=document.createElement("div");
	 div.style.cssText="width:100px;height:50px;font-size:25px;color:#000;position:absolute;right:10px;top:10px;";
     this.scene.appendChild(div);
	 this.timeBox=div;
	},
    jump:function  () {
		var that=this;
		var flag=true;
	  that.scene.onclick=function  () {
		if(!flag){
		 return;
		}
		flag=false;
		var speed1=10;
		var speed2=15;
		var initT=that.person.offsetTop;
		var step=100;
		var initA=0;
		that.t1= setInterval(function(){
		   if(initA<90){
		     initA+=speed1;
		   }else{
		    initA+=speed2;
		   }
		   var currentT=Math.sin(initA*Math.PI/180)*step;
		   if(currentT<0){
		    currentT=0;
		   }
		   that.person.style.bottom=currentT+"px";
		   if(initA>=180){
		     clearInterval(that.t1);
			 flag=true;
		   }

		 },60)
	    
	  }
    },
	createStone:function  () {
		 var stoneW=10+15*Math.random();
		 var stoneH=10+40*Math.random();
		 var div=document.createElement("div");
		 div.style.cssText="width:"+stoneW+"px;height:"+stoneH+"px;background:#000;position:absolute;right:0px;bottom:0px;border-top-left-radius:"+(2+4*Math.random())+"px;border-top-right-radius:"+(2+4*Math.random())+"px;";
		 this.scene.appendChild(div);
		 this.stones.push(div);
	},
    over:function  (scene) {
      var mask=document.createElement("div");
	  mask.style.cssText="width:"+this.widths+"px;height:"+this.heights+"px;background:rgba(0,0,0,0.2);position:absolute;left:0;top:0;z-index:2";
	  document.body.appendChild(mask);

	  var options=document.createElement("div");
      options.style.cssText="width:40%;height:"+this.heights/2.5+"px;font-size:20px;text-align:center;position:absolute;left:30%;top:35%;border:1px solid #aaa;border-radius:15px;z-index:3";

	  var reBtn=document.createElement("div");
      reBtn.style.cssText="width:60px;height:30px;text-align:center;line-height:30px;borer:1px solid #aaa;border-radius:5px;font-size:15px;cursor:pointer;";
	  reBtn.innerHTML="重新开始";
	  options.appendChild(reBtn);
	  document.body.appendChild(options);
	  reBtn.onclick=function  () {
        location.reload();
	  }
    }

}
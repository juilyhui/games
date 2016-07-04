function interFace (clientW,clientH) {
	this.clientW=clientW;
	this.clientH=clientH;
	this.single=20;
	this.rows=Math.ceil(this.clientH/2/this.single);
	this.cols=Math.ceil(this.clientW/2/this.single);
    this.createFace();
	//蛇的初始长度
	this.initL=3;
	//蛇身体的数组
	this.snakeArr=[];
	this.createSnake();

	//方向
	this.d="";
	//速度
	this.speed=200;
	//吃食物的开关
	this.flag=true;
    this.move();

}
interFace.prototype={
  createFace:function  () {
	  var div=document.createElement("div");
	      div.style.cssText="width:"+this.single*this.cols+"px;height:"+this.single*this.rows+"px;position:absolute;border-top:1px solid #ccc;border-left:1px solid #ccc";
		  this.scene=div;
		  document.body.appendChild(div);
		  div.style.left=(this.clientW-div.offsetWidth)/2+"px";
		  div.style.top=(this.clientH-div.offsetHeight)/2+"px";

		  for (var i=0; i<this.rows; i++) {
			    for (var j=0; j<this.cols; j++) {
					var smalldiv=document.createElement("div");
					smalldiv.style.cssText="float:left;width:"+(this.single-1)+"px;height:"+(this.single-1)+"px;border-right:1px solid #ccc;border-bottom:1px solid #ccc";
                    this.scene.appendChild(smalldiv);
			    }
		  }
		 
		  var that=this;
		document.onkeydown=function  (e) {
			 var ev=e||window.event;
			 switch (ev.keyCode) {
			  case 37:
			   if(that.d=="r"){
			    that.d="r"
			  }else	if(that.d==""){
			   that.d="";
			  }else{
			    that.d="l";
			  }
			  break;
			  case 38:
               if(that.d=="b"){
			    that.d="b"
			  }else{
			   that.d="t";
			  }

			  break;
			  case 39:
				  if(that.d=="l"){
			    that.d="l"
			  }else{
			   that.d="r";
			  }
	
			  break;
			  case 40:
		   if(that.d=="t"){
			    that.d="t"
			  }else{
			   that.d="b";
			  }
			  break;
			 }
		}

  },
  createSnake:function  () {  
	  for(var i=0; i<this.initL; i++) {
	    var div=document.createElement("div");
        div.x=Math.ceil((this.cols)/2)-i;
		div.y=Math.ceil((this.rows)/2);
		this.setStyle(div,i);
        this.snakeArr.push(div);
	  }
  },
  setStyle:function  (obj,index) {
	   if(index==0){
	    var bg="red";
	   }else{
	    var bg="blue";
	   }
	   obj.style.cssText="width:"+this.single+"px;height:"+this.single+"px;position:absolute;background:"+bg;
	   obj.style.left=obj.x*this.single+"px";
	   obj.style.top=obj.y*this.single+"px";
      this.scene.appendChild(obj);
  },
  check:function  () {
	   for (var i=0; i<this.snakeArr.length; i++) {
		    if(this.snakeArr[i].x==this.foot.x&&this.snakeArr[i].y==this.foot.y){
			  return true;
			}
	   }
	   return false;
  },
  createFoot:function  () {
    var foot=document.createElement("div");
	this.foot=foot;
	foot.y=Math.floor(Math.random()*this.rows);
	foot.x=Math.floor(Math.random()*this.cols);
	while (this.check()) {
		  foot.y=Math.floor(Math.random()*this.rows);
	foot.x=Math.floor(Math.random()*this.cols);
	}
   
	foot.color="rgb("+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+")";
	foot.style.cssText="width:"+this.single+"px;height:"+this.single+"px;background:"+foot.color+";position:absolute;left:"+this.single*foot.x+"px;top:"+this.single*foot.y+"px;"
	this.scene.appendChild(foot)
  },
  move:function  () {
	var that=this;
   this.t=setInterval(function(){
	  if(that.d){
      that.reset();
	  }
	  switch (that.d) {
	  case "l":
	  that.snakeArr[0].x--;
	  break;
	  case "r":
	  that.snakeArr[0].x++;
	  break;
	  case "t":
	  that.snakeArr[0].y--;
	  break;
	  case "b":
	  that.snakeArr[0].y++;
	  break;
	  }
	    if(that.flag){
	      that.createFoot();
	      that.flag=false;
		}
      if(that.snakeArr[0].x==that.foot.x&&that.snakeArr[0].y==that.foot.y){
	    that.flag=true;
	    that.scene.removeChild(that.foot);
        that.add();
	  }
   
	  if(that.snakeArr[0].x+1<=0||that.snakeArr[0].x>=that.cols||that.snakeArr[0].y+1<=0||that.snakeArr[0].y>=that.rows||that.hit()){
	    clearInterval(that.t);
        alert("重新游戏");
		location.reload();
	  }
	},this.speed)
  },
	add:function  () {
   	var newdiv=document.createElement("div");
		newdiv.x=this.snakeArr[this.snakeArr.length-1].x;
		newdiv.y=this.snakeArr[this.snakeArr.length-1].y;
		this.snakeArr.push(newdiv);
	},
	hit:function  () {
	  

		  for (var i=1; i<this.snakeArr.length; i++) {
			    if(this.snakeArr[i].x==this.snakeArr[0].x&&this.snakeArr[i].y==this.snakeArr[0].y){
				  return true;
				}
		  }
		  return false;
	},
  reset:function  () {
        for (var i=0; i<this.snakeArr.length; i++) {
		   this.setStyle(this.snakeArr[i],i);
		 }

		 for (var i=this.snakeArr.length-1; i>0; i--) {
		   this.snakeArr[i].x=this.snakeArr[i-1].x;
     	   this.snakeArr[i].y=this.snakeArr[i-1].y;
		 }
		 
  }
}

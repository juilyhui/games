
function person(x,y,w,h,cobj,runs,jumps){
  this.initx=x;
  this.inity=y;
  this.speed=5;
  this.w=w;
  this.h=h;
  this.cobj=cobj;
  this.runs=runs;
  this.jumps=jumps;
  this.width=parseInt(this.runs[0].width);
  this.height=parseInt(this.runs[0].height);
  this.y=this.inity-this.height;
  this.x=this.initx;
  this.status="runs";
  this.state=0;

}
person.prototype={
    draw:function(){
       this.cobj.save();
       this.cobj.translate(this.x, this.y);
       this.cobj.drawImage(this[this.status][this.state],0,0,827,1181,0,0,this.width,this.height);
       this.cobj.restore();
    }
}




function hinder(x,y,w,h,cobj,hinders){
    this.initx=x;
    this.inity=y;
    this.speed=5;
    this.w=w;
    this.h=h;
    this.cobj=cobj;
    this.hinderArr=hinders
    this.width=parseInt(this.hinderArr[0].width);
    this.height=parseInt(this.hinderArr[0].height);
    this.y=this.inity-this.height;
    this.x=this.initx;
    this.state=7;

}
hinder.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x, this.y);
        this.cobj.drawImage(this.hinderArr[this.state],0,0,564,400,0,0,this.width,this.height);
        this.cobj.restore();
    }
}

function game(canvas,cobj,back,runs,jumps,hinders){
    this.w=document.documentElement.clientWidth;
    this.h=document.documentElement.clientHeight;
    this.canvas=canvas;
    this.cobj=cobj;
    this.back=back;
    this.runs=runs;
    this.jumps=jumps;
    this.hinders=hinders;
    this.speed=5;
    this.initScene();
    this.runHinder=[];
    this.stepTime=50;
    this.person=new person(this.x,this.y,this.w,this.h,cobj,this.runs,this.jumps);
    this.person.draw();


}
game.prototype={
    initScene:function(){
      this.canvas.style.display="block";
      this.canvas.width=this.w;
      this.canvas.height=this.h;
      this.backw=this.back.width;
      this.backh=this.back.height;
      if(this.backh>this.h){
      this.backh=this.h;
      }
        this.canvas.style.backgroundSize=this.backw+"px "+this.backh+"px";
      this.x=0;
      this.y=this.backh;
    },
    run:function(){
        var num=0;
        var that=this;
        var  num1=0;
        that.key();
        var time=5000;
        var backInit=0;
        setInterval(function(){
            console.log(that.stepTime)
        that.cobj.clearRect(0,0,that.w,that.h);
         //人物
        num++;

        if(that.person.status=="runs") {
            that.person.state = num % 7;
        }
        if(that.person.x<that.w/3) {
            that.person.x += that.person.speed;
        }
        that.person.draw();

         //障碍物
         var speed2=5;
         if(num1%time==0){
             time=5000+parseInt(2+5*Math.random())*1000;
             var obj=new hinder(that.w,that.y,that.w,that.h,that.cobj,that.hinders);
                 obj.state=Math.floor(that.hinders.length*Math.random());
             if(that.runHinder.length==0){
                 obj.flag=true;
             }
             that.runHinder.push(obj);
         }

         for(var i=0;i<that.runHinder.length;i++){
             //if(that.runHinder[i].x<-that.runHinder[i].width){
                // that.runHinder.shift();
                // break;
            // }
             that.runHinder[i].x-=that.speed;

             that.runHinder[i].draw();
              if(that.runHinder[i].flag){
                  if(that.person.x>that.runHinder[i].x+that.runHinder[i].width){

                      if(that.runHinder[i+1]) {
                          that.runHinder[i].flag="";
                          that.runHinder[i + 1].flag = true;
                      }
                  }
                  if( hitPix(that.canvas,that.cobj,that.person,that.runHinder[i])){
                      alert(1);
                      location.reload();
                  }

              }

         }


            backInit-=that.speed;
         that.canvas.style.backgroundPosition=backInit+"px 0";

            num1+=50;

        },that.stepTime)
    },
    key:function(){
        var that=this;
        var flag=true;
        document.onkeydown=function(){
            if(!flag){
                return;
            }
            flag=false;
            var speeda=6;
            var inita=0;
            var step=180/speeda;
            var gao=100;
            var starty=that.person.y;
            var num=0;
            var oldspeed=that.speed;
            that.speed+=2;
            var t=setInterval(function(){

             if(inita>180){
                clearInterval(t);
                 flag=true;
                 that.person.status="runs";
                 that.person.state=0;
                 that.speed=oldspeed;
             }else {

                 that.person.status="jumps";

                     that.person.state =2;

                 inita += speeda;
                 var val=starty-Math.sin(inita * Math.PI / 180) * gao;
                 if(val>starty){
                     val=starty
                 }
                 that.person.y =val;


             }
            },50)
        }
    }

}
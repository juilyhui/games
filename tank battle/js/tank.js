$(function  () {
	//主程序运行
	$(window).data("play",function  () {
	   //初始化接界面
        init();
	   //初始化数据设置
	    initData();
	/*获得基本操作元素*/
      //战场场景
	var scene=$(".war-scene");//
	//树
	var trees=$(".tree");
	//草坪
	var grasses=$(".grass");
	//boss墙
	var bosswalls=$(".boss-wall");//
	//boss墙受伤次数
	bosswalls.data("hits",0);
	//boss
	var boss=$(".boss");//
	//boss受伤的次数
	boss.data("hits",0);
	//自己的坦克
	var mytank=$(".tank");//
	mytank.data({
		//自己坦克的速度
	    tankspeedx:6,
		tankspeedy:6,
		//坦克运动的方向
        tankdir:"",
		//坦克的角度
	    tankAngle:0,
		//是否开火
	    fire:true
	}); 
	//坦克筒
	var tankhead=$(".tankhead");
    tankhead.data({
	//坦克筒角度
	 tanktHeadAngle:0
	})
   
      //运行我坦克
	    /*
		  scene       主战场
          bosswalls   堡垒
		  boss        老大
		  mytank      我的坦克
		  tankhead    坦克头
          dtankarr    敌坦克数组
		*/	
	    myTankRun(scene,bosswalls,boss,mytank,tankhead,trees,dtankarr);
	  //运行敌坦克
	    dTankRun(scene,bosswalls,boss,mytank,trees,dtankarr);
		 //再来一次
	$(".agianbtn").click(function  () {
        $(".agian").animate({top:-470},500);
		location.reload();
	})
	//下一关
	$(".nextbtn").click(function  () {
		$(".backmask").animate({opacity:0},500)
		$(".next").animate({top:-470},500);
		 myTankRun(scene,bosswalls,boss,mytank,tankhead,trees,dtankarr);
	  //运行敌坦克
	    dTankRun(scene,bosswalls,boss,mytank,trees,dtankarr);
	})
	})
})

 //敌坦克数组

     var dtankarr=[];
	 //检测是否进行下一关
	 dtankarr.next=false;
//重新玩
function replay () {
   clearInterval(dtankarr.t);
   clearInterval(dtankarr.t1);
   clearInterval(dtankarr.t2);
   clearInterval(dtankarr.t3);
   clearInterval(dtankarr.t4);
   clearInterval(dtankarr.t5);
   clearInterval(dtankarr.t6);
   $(".backmask").animate({opacity:1},500)
    $(".mask").unbind("mousemove");
   for (var i=0; i<dtankarr.length; i++) {
	dtankarr[i].data("shell").remove();
	dtankarr[i].remove();
	dtankarr[i]=null;
   }
   dtankarr.length=0;
   $(".agian").css({
    left:($(window).width()-635)/2,
	top:-470,
	display:"block",
   }).animate({top:($(window).height()-470)/2},500);
   $(window).data("guanka",1);
}

//下一关
function next () {
   clearInterval(dtankarr.t);
   clearInterval(dtankarr.t1);
   clearInterval(dtankarr.t2);
   clearInterval(dtankarr.t3);
   clearInterval(dtankarr.t4);
   clearInterval(dtankarr.t5);
   clearInterval(dtankarr.t6);
   $(".backmask").animate({opacity:1},500)
   for (var i=0; i<dtankarr.length; i++) {
    dtankarr[i].data("shell").remove();
	dtankarr[i].remove();
	dtankarr[i]=null;
   }
   dtankarr.length=0;
   $(".mask").unbind();
   $(document).unbind();
   $(".next").css({
    left:($(window).width()-635)/2,
	top:-470,
	display:"block",
   }).animate({top:($(window).height()-470)/2},500);
   $(window).data("guanka",$(window).data("guanka")+1);
   dtankarr.next=false;
}

function init () {
	 //我坦克归位
	 $(".tank").css({left:"358px",top:"362px",display:"block"});
	 $(".boss").css({display:"block"});
	 //敌坦克销毁
	 if($(".dtank").length!==0){
	    $(".dtank").remove();
	 }

	 //所有在动画的清除
//	 if($(":animate").length!==0){
//	 $(":animate").stop().remove();
//	 }
}
function initData () {
	//获得当前关卡数
	$(window).data("guanka",!$(window).data("guanka")?1:$(window).data("guanka"))
	//敌坦克初始速度
	$(window).data("dspeed",3);
	//敌坦克初始数量
	$(window).data("dnum",2);
	//敌坦克子弹初始运行速度
	$(window).data("dshellspeed",10);
	//递增频率
	 var level=$(window).data("level");
	if(!$(window).data("step")){
		if(level=="ease"){
		  $(window).data("step",1);
		}else	if(level=="normal"){
		  $(window).data("step",2);
		}else	if(level=="hard"){
		  $(window).data("step",3);
		}
	}
}

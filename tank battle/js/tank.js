$(function  () {
	//����������
	$(window).data("play",function  () {
	   //��ʼ���ӽ���
        init();
	   //��ʼ����������
	    initData();
	/*��û�������Ԫ��*/
      //ս������
	var scene=$(".war-scene");//
	//��
	var trees=$(".tree");
	//��ƺ
	var grasses=$(".grass");
	//bossǽ
	var bosswalls=$(".boss-wall");//
	//bossǽ���˴���
	bosswalls.data("hits",0);
	//boss
	var boss=$(".boss");//
	//boss���˵Ĵ���
	boss.data("hits",0);
	//�Լ���̹��
	var mytank=$(".tank");//
	mytank.data({
		//�Լ�̹�˵��ٶ�
	    tankspeedx:6,
		tankspeedy:6,
		//̹���˶��ķ���
        tankdir:"",
		//̹�˵ĽǶ�
	    tankAngle:0,
		//�Ƿ񿪻�
	    fire:true
	}); 
	//̹��Ͳ
	var tankhead=$(".tankhead");
    tankhead.data({
	//̹��Ͳ�Ƕ�
	 tanktHeadAngle:0
	})
   
      //������̹��
	    /*
		  scene       ��ս��
          bosswalls   ����
		  boss        �ϴ�
		  mytank      �ҵ�̹��
		  tankhead    ̹��ͷ
          dtankarr    ��̹������
		*/	
	    myTankRun(scene,bosswalls,boss,mytank,tankhead,trees,dtankarr);
	  //���е�̹��
	    dTankRun(scene,bosswalls,boss,mytank,trees,dtankarr);
		 //����һ��
	$(".agianbtn").click(function  () {
        $(".agian").animate({top:-470},500);
		location.reload();
	})
	//��һ��
	$(".nextbtn").click(function  () {
		$(".backmask").animate({opacity:0},500)
		$(".next").animate({top:-470},500);
		 myTankRun(scene,bosswalls,boss,mytank,tankhead,trees,dtankarr);
	  //���е�̹��
	    dTankRun(scene,bosswalls,boss,mytank,trees,dtankarr);
	})
	})
})

 //��̹������

     var dtankarr=[];
	 //����Ƿ������һ��
	 dtankarr.next=false;
//������
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

//��һ��
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
	 //��̹�˹�λ
	 $(".tank").css({left:"358px",top:"362px",display:"block"});
	 $(".boss").css({display:"block"});
	 //��̹������
	 if($(".dtank").length!==0){
	    $(".dtank").remove();
	 }

	 //�����ڶ��������
//	 if($(":animate").length!==0){
//	 $(":animate").stop().remove();
//	 }
}
function initData () {
	//��õ�ǰ�ؿ���
	$(window).data("guanka",!$(window).data("guanka")?1:$(window).data("guanka"))
	//��̹�˳�ʼ�ٶ�
	$(window).data("dspeed",3);
	//��̹�˳�ʼ����
	$(window).data("dnum",2);
	//��̹���ӵ���ʼ�����ٶ�
	$(window).data("dshellspeed",10);
	//����Ƶ��
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

//Ƭͷ����
$(function  () {
	$(".wall-scene").css("margin-top",function  () {
		 return($(window).height()-$(this).height())/2
	})
	var imglist=["img/boss.png","img/bossfire.png","img/bosswall.png","img/dboss.png","img/dbosswall.png","img/fire.png","img/foeshell.png","img/foetank.png","img/grass.jpg","img/pian1.jpg","img/pian2.jpg","img/shell.png","img/small-tank.png","img/tankbody.png","img/tankhead.png","img/tree.png","img/wall.png"];
    var pian1;
	var pian2;
	var pian3;
//Ƭͷ1
   //����ͼƬ
	 pian1=$("<img>").attr("src","img/pian1.jpg").css({
	  width:456,height:443,position:"absolute",top:($(window).height()-443)/2,left:($(window).width()-456)/2
	});
	  pian1.appendTo(".backmask");
	//����������
	$(".outbar").css({
	top:($(window).height()-443)/2+450,left:($(window).width()-456)/2
	})
	 createbar($(".innerbar")[0],$(".smalltank")[0],imglist,function  () {
     
	 //Ƭͷ2
        //1ɾ��Ƭͷһ
		pian1.animate({opacity:0},2000,function  () {
			$(this).remove();
		})
		$(".outbar").animate({opacity:0},2000,function  () {
			$(this).remove();

			//2.���Ƭͷ2
             pian2=$("<img>").attr("src","img/pian2.jpg").css({
			  width:1299,height:251,position:"absolute",top:($(window).height()-251)/2,left:($(window).width()-1299)/2
			});
			  pian2.appendTo(".backmask");

			  var t=setTimeout(function (){
                      pian2.animate({top:1000,opacity:0},500,"swing",function  () {
						$(this).remove();
					  //Ƭͷ3
					     //1.���Ƭͷ3
						  pian3=$("<img>").attr("src","img/pian3.jpg").css({
						  width:1146,height:347,position:"absolute",top:-347,left:($(window).width()-1146)/2
						  });
						  pian3.appendTo(".backmask");
						  pian3.animate({top:($(window).height()-347)/2},800,"swing",function  () {
							 //2.���Ƭ3
							  $(window).bind("click",function  () {
								  $(window).unbind("click");
								  pian3.animate({left:-1150},1000,"swing",function  () {
									  $(this).remove;
									  //Ƭͷ4
									     //1.���Ƭͷ4
										 var pian4=$("<img>").attr("src","img/pian4.jpg").css({
										  width:692,height:292,position:"absolute",top:($(window).height()-292)/2,left:1800
										  });
										  pian4.appendTo(".backmask");
										  pian4.animate({left:($(window).width()-692)/2},500,"swing",function  () {
											  $(window).one("click",function  () {
													pian4.animate({left:-700},1000,"swing",function  () {
														$(this).remove();
														//Ƭͷ5(ѡ���Ѷ�)
														//1.���Ƭͷ5
														var pian5=$(".selectease")
														pian5.css({
														 top:($(window).height()-292)/2,left:1800,display:"block"
														})
														pian5.animate({left:($(window).width()-692)/2},500,"swing",function  () {
															//ѡ�����׳̶�
															$(window).data("level","ease");
															pian5.find("dd").click(function  () {
																	pian5.find("dd").css("border","none");
																	$(this).css("border","2px solid #957209");
																	var index=pian5.find("dd").index($(this));
																	if(index==0){
																	  $(window).data("level","ease");
																	}else	if(index==1){
																	  $(window).data("level","normal");
																	}else{
																	  $(window).data("level","hard");
																	}
																	
															})
															//��ʼ��Ϸ
															$(".playgame").click(function  () {
																pian5.animate({opacity:0},200,function  () {
																	$(this).remove();
																});
																$(".backmask").animate({opacity:0},500,function  () {
																	//$(this).remove();
																	if($(window).data("play")){
																	   $(window).data("play")();
																	}
																})
															})
														})
													})
											  })
										  })
								  });
							  })
						  });
						  
                      });
					  clearTimeout(t)
			  },2000)
		})
	
	 })
		

})
$(function(){
	//全选动作
		$(".jie .jie_svg").find(".goued_svg").on("tap",function(){
			$(this).addClass("dis").siblings().removeClass("dis");
			var index = $(this).index();   //获取点击的全选svg下标
			if(index==0){   //如果点击第一个全选svg就全部选中
         	    $.each($(".center_lt"), function(i,elem) {
                    $(elem).find(".goued_svg").eq(0).addClass("dis");
                    $(elem).find(".goued_svg").eq(1).addClass("checked").removeClass("dis");
				});
             }else{
         	   $.each($(".center_lt"), function(i,elem) {
         	     	$(elem).find(".goued_svg").eq(0).removeClass("dis");
					$(elem).find(".goued_svg").eq(1).removeClass("checked").addClass("dis");
				});
            }
			getTotal();
		});

	  //单选动作
	  $(".center_lt").find(".goued_svg").on("tap",function(){
	  	$(this).addClass("dis").siblings().removeClass("dis");
         if($(this).index()==0){
         	$(this).siblings().addClass("checked");
         }else{
         	$(this).removeClass("checked");
         }
         getTotal();   
	  });
		

		//数量加减动作
		   $.each($(".center_rps_u"), function(i,elem) {
		   	//减
		   	$(elem).find(".center_rps_uli").eq(0).on("tap",function(){
				if($(this).siblings(".center_rpsi").text()<=1){
					$(this).siblings(".center_rpsi").text(1);
				}else{
					$(this).siblings(".center_rpsi").text(parseInt($(this).siblings(".center_rpsi").text())-1);
				}
				getTotal();
			});
			$(elem).find(".center_rps_uli").eq(2).on("tap",function(){
				$(this).siblings(".center_rpsi").text(parseInt($(this).siblings(".center_rpsi").text())+1);
				getTotal();
			})
		   	
		   });

		//点击结算执行动作		
		$(".btn_jie").on("tap",function(e){
            e.preventDefault();
            if($(".jie_col").eq(1).text()==0){
            	alert("您还没有选中商品了！！！");
            	return false;
            }
			alert("总价：" + $(".jie_col").eq(1).text());
		})

		//计算合计总价方法
		function getTotal(){
			counts=0;
			$.each($(".center_lt"), function(i,elem) {
				if($(elem).find(".goued_svg").eq(1).hasClass("checked")){
				  counts+=$(this).parent().find(".padded").find(".center_rps").find("span").text()*parseInt($(this).parent().find(".padded").find("li.center_rpsi").text());  
			   }
			});
			$(".jie_col").eq(1).text(counts);    //填入合计总价
		}

		//点击顶部箭头返回上一页
		$(".header svg").on("tap",function(){
			history.back();
		})
})
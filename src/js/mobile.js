$(function(){
	
	    change();  
	    function change(){
	         document.documentElement.style.fontSize = document.documentElement.clientWidth*20/320 + 'px';  
	    }    
	  window.addEventListener('resize',change,false);
	  
	
	$(".logo ul li").eq(0).on("tap",function(){
		
		$(this).addClass("highlight").siblings().removeClass();
		$("#login-box").show();
		$("#regist-box").hide();
	
	});
	$(".logo ul li").eq(1).on("tap",function(){
		
		$(this).addClass("highlight").siblings().removeClass();
		$("#regist-box").show();
		$("#login-box").hide();
		
	});

	//登陆表单验证
	$("#signForm").Validform({
		btnSubmit:"#signBtn",     //表单提交按钮btnReset:"",
		btnReset:"#resetBtn",    //表单重置按钮
		tiptype:1,               //提示信息方式
		ignoreHidden:false,     //默认为false，当为true时对:hidden的表单元素将不做验证
		dragonfly:false,       //可用值： true | false。默认false，当为true时，值为空时不做验证；
		tipSweep:false,    //默认为false，在各种tiptype下， 为true时提示信息将只会在表单提交时触发显示，各表单元素blur时不会触发信息提示；
		label:".label",    //在没有绑定nullmsg时查找要显示的提示文字，默认查找".Validform_label"下的文字；
		showAllError:false,   //默认为false，true：提交表单时所有错误提示信息都会显示；false：一碰到验证不通过的对象就会停止检测后面的元素，只显示该元素的错误信息；
		postonce:true,   //默认为false，指定是否开启二次提交防御，true开启，不指定则默认关闭；为true时，在数据成功提交后，表单将不能再继续提交。
		ajaxPost:false,  //默认为false，使用ajax方式提交表单数据，将会把数据POST到config方法或表单action属性里设定的地址；
		datatype:{
			"tel": /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/i,
			"*6-20": /^[^\s]{6,20}$/,
			"z2-4" : /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/,
			"user":function(gets,obj,curform,regxp){
				var reg1=/^[\w\.]{4,16}$/,
					reg2=/^[\u4E00-\u9FA5\uf900-\ufa2d]{2,8}$/;
				if(reg1.test(gets)){return true;}
				if(reg2.test(gets)){return true;}
				return false;
			}
		},
		usePlugin:{   //目前已整合swfupload、datepicker、passwordstrength和jqtransform四个插件，在这里传入这些插件使用时需要传入的参数。datepicker在Validform内调用时另外扩展了几个比较实用的参数，具体请参考demo页；
			swfupload:{},
			datepicker:{},
			passwordstrength:{},
			jqtransform:{
				selector:"select,input"
			}
		},
		beforeCheck:function(curform){  //在表单提交执行验证之前执行的函数，curform参数获取到的是当前表单对象。
		},
		beforeSubmit:function(curform){  //在表单验证通过，提交表单数据之前执行的函数，data参数是当前表单对象。函数return false的话表单将不会提交;
		},
		callback:function(data){
			// 在使用ajax提交表单数据时，数据提交后的回调函数。返回数据data是Json对象：
			// {"info":"demo info","status":"y"}
			// info: 输出提示信息，
			// status: 返回提交数据的状态,是否提交成功，"y"表示提交成功，"n"表示提交失败，
	        var username =$("#usernames input").val().trim();
	        var password =$("#passwords input").val().trim();
			$.ajax({
                type : "POST",
                url : "/product.php",
                data :{username:username,password:password},
                success : function(msg) {
                    alert("表单验证通过提交数据！");
                },
                error : function(){

                }
            });

		}
   });
    //mock.js接收登陆请求
	Mock.mock("/product.php","post",function (e) {
		console.log(e.body);
	})
 	

})
	

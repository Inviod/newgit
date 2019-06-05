$(function(){
	$("#login-top ul li:nth-child(1)").click(function(){
		$(this).addClass("highlight").siblings().removeClass();
		$("#login-box").show();
		$("#regist-box").hide();
		$("#login").css({"height":"364px"});
	})
	$("#login-top ul li:nth-child(2)").click(function(){
		$(this).addClass("highlight").siblings().removeClass();
		$("#regist-box").show();
		$("#login-box").hide();
		$("#login").css({"height":"384px"});
	})
 	
 
	jQuery.validator.addMethod("isuser", function(value, element) {
        var length = value.length;
        var user =  /^1[34578]\d{9}$/;
        var emai=  /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        return this.optional(element) || (emai.test(value) || user.test(value));
    }, "请正确输入");

	jQuery.validator.addMethod("ischenum", function(value, element) {

        var length = value.length;
        var chenum = /^\d{6}$/;
        return this.optional(element) || (chenum.test(value));
    }, "请正确输入");

	jQuery.validator.addMethod("ispass", function(value, element) {
	        var length = value.length;
	      	var pass = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/; //由6-21字母和数字组成，不能是纯数字或纯英文
	        return this.optional(element) || (pass.test(value));
	    }, "请正确输入");
	
	$("#regist-btn").click(function() {
	    $("#login").validate({
            rules:{
                pho:{
                    required: true,
                    isuser: true
                },
             	chenum:{
                    required: true,
                    minlength:6,
                    maxlength:6,
                    ischenum: true
               },
               setpass:{
                    required: true,
                    minlength:6,
                    maxlength:18,
                    ispass: true
               },
               checkbox:{
               	required:true
               },
                messages:{
                    pho:{
                        required:"不能为空",
                        minlength: "不得少于4为数字",
                        maxlength: "不得多于9位数字",
                        number: "必须是数字",
                        isuser: "格式错误",
                    },
                    chenum:{
                        required:"不能为空",
                        ischenum:"验证码错误"
                	},
                	setpass:{
                        required:"不能为空",
                        minlength:"不得少于6位",
                        maxlength:"不得多于16位",
                        ispass:"格式错误"
                   },
                   checkbox:{
               			required:"请先阅读协议"
               		}
                }
                 
           },
             errorPlacement: function(error, elemen) { 
             	console.log(elemen)
    					error.appendTo($(elemen).parent().find(".cont"));  
				}
            
	});
})
})
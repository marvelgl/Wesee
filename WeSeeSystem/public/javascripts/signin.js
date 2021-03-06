$(function ($) {
	//弹出登录
	$("#Login").on('click', function () {
		$("body").append("<div id='mask'></div>");
		$("#mask").addClass("mask").fadeIn("slow");
		$("#LoginBox").fadeIn("slow");
		$(".inputBox input").val("");
	});

	$("#Register").on('click', function () {
		$("body").append("<div id='mask'></div>");
		$("#mask").addClass("mask").fadeIn("slow");
		$("#RegisterBox").fadeIn("slow");
		$(".inputBox input").val("");
	});

	//按钮的透明度
	$("#loginbtn").hover(function () {
		$(this).stop().animate({
			opacity: '1'
		}, 500);
	}, function () {
		$(this).stop().animate({
			opacity: '0.8'
		}, 500);
	});

	//登陆按钮时间,包括判断是否为空
	$("#loginbtn").on('click', function () {
		var txtName = $("#txtName").val();
		var txtPwd = $("#txtPwd").val();
		var temp = {
			username: txtName,
			password: txtPwd
		}
		if (txtName == "" || txtName == undefined || txtName == null) {
			if (txtPwd == "" || txtPwd == undefined || txtPwd == null) {
				$(".warning").css({ display: 'block' });
			}
			else {
				$("#warn").css({ display: 'block' });
				$("#warn2").css({ display: 'none' });
			}
		}
		else {
			if (txtPwd == "" || txtPwd == undefined || txtPwd == null) {
				$("#warn").css({ display: 'none' });
				$(".warn2").css({ display: 'block' });
			}
			else {
				//两者都不为空
				$(".warning").css({ display: 'none' });
				$.post('signin_valid', temp, function(data) {
					if (data == "false") {
						$("#login_error_tips").css({ display: 'block' });
					} else {
						$("#LoginBox").fadeOut("fast");
						$("#mask").css({ display: 'none' });
						$("#mask").remove();
						$("#Login span").text(txtName);
					}
				});
			}
		}
	});

	//登陆文本框不允许为空---单个文本触发
	$("#txtName").on('blur', function () {
		var txtName = $("#txtName").val();
		if (txtName == "" || txtName == undefined || txtName == null) {
			$("#warn").css({ display: 'block' });
		}
		else {
			$("#warn").css({ display: 'none' });
		}
	});
	$("#txtName").on('focus', function () {
		$("#login_error_tips").css({ display: 'none' });
		$("#warn").css({ display: 'none' });
	});
	//
	$("#txtPwd").on('blur', function () {
		var txtName = $("#txtPwd").val();
		if (txtName == "" || txtName == undefined || txtName == null) {
			$("#warn2").css({ display: 'block' });
		}
		else {
			$("#warn2").css({ display: 'none' });
		}
	});
	$("#txtPwd").on('focus', function () {
		$("#login_error_tips").css({ display: 'none' });
		$("#warn2").css({ display: 'none' });
	});


	//注册提交
	$("#registerbtn").on("click", function (e) {
		e.preventDefault();
		var txtName = $("#register_txtName").val();
		var password_1 = $("#register_txtPwd").val();
		var password_2 = $("#again_txtPwd").val();
		var phone = $("#register_phone").val();
		var email = $("#register_email").val();
		if (!judge_username(txtName) ||
			!judge_phone(phone) ||
			!judge_mail(email)) {
			$("#register_error_tips").css({ display: 'block' });
	    } else {
			if (password_1 != password_2) {
				$("#judge_same_password").css({display:"block"});
				return false;
			} else {
				//所有注册项符合格式要求，提交到后台：
				var register_username = $("#register_txtName").val();
				var register_password = $("#register_txtPwd").val();
				var register_email = $("#register_email").val();
				var register_phone = $("#register_phone").val();
				var body_data = {
					username: register_username,
					password: register_password,
					mail: register_email,
					phone: register_phone,
				}
				
				$.post('regist', body_data, function(data) {
					if (data == "false") {
						$("#register_error_tips").css({ display: 'block' });
					} else {
						$("#RegisterBox").fadeOut("fast");
						$("#mask").css({ display: 'none' });
						$("#mask").remove();
						$("#Login span").text(txtName);
						alert("注册成功！");
					}
				});
			}    	
	    }
	});

	$(".RegisterBox_content input").on('focus', function () {
		$("#judge_same_password").css({display:"none"});
		$("#register_error_tips").css({ display: 'none' });
	});



	//关闭
	$(".close_signin").hover(function () { 
		$(this).css({ color: 'rgb(250,111,87)' })
	}, function () {
		$(this).css({ color: '#999' })
	}).on('click', function () {
		$("#LoginBox").fadeOut("fast");
		$("#mask").css({ display: 'none' });
		$("#mask").remove();
	});

	$(".close_register").hover(function () { 
		$(this).css({ color: 'rgb(250,111,87)' })
	}, function () {
		$(this).css({ color: '#999' })
	}).on('click', function () {
		$("#RegisterBox").fadeOut("fast");
		$("#mask").css({ display: 'none' });
		$("#mask").remove();
	});
});

var judge_username = function (str) { 
	var re = /^[a-zA-z_0-9]{6,15}$/;
	return re.test(str);
}

var judge_phone = function (str) {
	var re = /^[^0]\d{10}$/;
	return re.test(str);
}

var judge_mail = function (str) {
	var re = /^[a-zA-z_0-9]+@(([a-zA-z_0-9])+\.)+[a-zA-z]{2,4}$/;
	return re.test(str);
}
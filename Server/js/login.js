/**
 * HKG login
 */
var login_data = [
	{"FORUM": 1, "VIEWSTATE": "/wEPDwUKLTEwMjI4OTE3OA9kFgJmD2QWBGYPZBYCAgYPFgIeBGhyZWYFES4vanNjc3MvbGFyZ2UuY3NzZAIBD2QWBAIBDw8WAh4LTmF2aWdhdGVVcmwFGGh0dHA6Ly93d3cuaGtnb2xkZW4uY29tL2QWAmYPDxYCHghJbWFnZVVybAUdL2ltYWdlcy9pbmRleF9pbWFnZXMvbG9nby5qcGdkZAICD2QWBGYPFgIfAAUtaHR0cDovL2ZvcnVtMS5oa2dvbGRlbi5jb20vbG9naW4uYXNweD9mYW50aT0xZAICDxYCHwAFLWh0dHA6Ly9mb3J1bTEuaGtnb2xkZW4uY29tL2xvZ2luLmFzcHg/ZmFudGk9MGQYAQUeX19Db250cm9sc1JlcXVpcmVQb3N0QmFja0tleV9fFgEFK2N0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkY2JfcmVtZW1iZXJfbG9naW4XeXLw/pcuhJ5b+iqoNJmlOmSCUQ==", "EVENTVALIDATION": "/wEWBQKmg+ylCQLIgaDXBQK/7a/7AgKtjfOnCgL6vZ/mCLSG3MkfocACTpFy4u0ADhi4CaNP"},
	{"FORUM": 2, "VIEWSTATE": "/wEPDwUKLTEwMjI4OTE3OA9kFgJmD2QWBGYPZBYCAgYPFgIeBGhyZWYFES4vanNjc3MvbGFyZ2UuY3NzZAIBD2QWBAIBDw8WAh4LTmF2aWdhdGVVcmwFGGh0dHA6Ly93d3cuaGtnb2xkZW4uY29tL2QWAmYPDxYCHghJbWFnZVVybAUdL2ltYWdlcy9pbmRleF9pbWFnZXMvbG9nby5qcGdkZAICD2QWBGYPFgIfAAUtaHR0cDovL2ZvcnVtMi5oa2dvbGRlbi5jb20vbG9naW4uYXNweD9mYW50aT0xZAICDxYCHwAFLWh0dHA6Ly9mb3J1bTIuaGtnb2xkZW4uY29tL2xvZ2luLmFzcHg/ZmFudGk9MGQYAQUeX19Db250cm9sc1JlcXVpcmVQb3N0QmFja0tleV9fFgEFK2N0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkY2JfcmVtZW1iZXJfbG9naW4A3Ho2/u/qVlKt2zU4zHVcOKomDA==", "EVENTVALIDATION": "/wEWBQKfjryPBgLIgaDXBQK/7a/7AgKtjfOnCgL6vZ/mCP86WdBFOfxPM/gQIJ+qe0Q0jSSh"},
	{"FORUM": 3, "VIEWSTATE": "/wEPDwUKLTEwMjI4OTE3OA9kFgJmD2QWBGYPZBYCAgYPFgIeBGhyZWYFES4vanNjc3MvbGFyZ2UuY3NzZAIBD2QWBAIBDw8WAh4LTmF2aWdhdGVVcmwFGGh0dHA6Ly93d3cuaGtnb2xkZW4uY29tL2QWAmYPDxYCHghJbWFnZVVybAUdL2ltYWdlcy9pbmRleF9pbWFnZXMvbG9nby5qcGdkZAICD2QWBGYPFgIfAAUtaHR0cDovL2ZvcnVtMy5oa2dvbGRlbi5jb20vbG9naW4uYXNweD9mYW50aT0xZAICDxYCHwAFLWh0dHA6Ly9mb3J1bTMuaGtnb2xkZW4uY29tL2xvZ2luLmFzcHg/ZmFudGk9MGQYAQUeX19Db250cm9sc1JlcXVpcmVQb3N0QmFja0tleV9fFgEFK2N0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkY2JfcmVtZW1iZXJfbG9naW7Hh14jmN3uVwpbOOIH1RlVSrtL0w==", "EVENTVALIDATION": "/wEWBQKX78TtDgLIgaDXBQK/7a/7AgKtjfOnCgL6vZ/mCOpXbEzLfsg57TzTV+1ZrHIj8CXg"},
	{"FORUM": 4, "VIEWSTATE": "/wEPDwUJLTU3OTUzOTQwD2QWAmYPZBYEZg9kFgICBg8WAh4EaHJlZgURLi9qc2Nzcy9sYXJnZS5jc3NkAgEPZBYEAgEPDxYCHgtOYXZpZ2F0ZVVybAUYaHR0cDovL3d3dy5oa2dvbGRlbi5jb20vZBYCZg8PFgIeCEltYWdlVXJsBR0vaW1hZ2VzL2luZGV4X2ltYWdlcy9sb2dvLmpwZ2RkAgIPZBYEZg8WAh8ABS1odHRwOi8vZm9ydW00LmhrZ29sZGVuLmNvbS9sb2dpbi5hc3B4P2ZhbnRpPTFkAgIPFgIfAAUtaHR0cDovL2ZvcnVtNC5oa2dvbGRlbi5jb20vbG9naW4uYXNweD9mYW50aT0wZBgBBR5fX0NvbnRyb2xzUmVxdWlyZVBvc3RCYWNrS2V5X18WAQUrY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRjYl9yZW1lbWJlcl9sb2dpbrgAMSIhJb8ntC8fe3POXbLv1LZp", "EVENTVALIDATION": "/wEWBQL/sqtUAsiBoNcFAr/tr/sCAq2N86cKAvq9n+YIduPcSy+W0kGxCi5VMTLaN6YNB00="},
	{"FORUM": 5, "VIEWSTATE": "/wEPDwUKMTM0NTM1MDI4OA9kFgJmD2QWBGYPZBYCAgYPFgIeBGhyZWYFES4vanNjc3MvbGFyZ2UuY3NzZAIBD2QWBAIBDw8WAh4LTmF2aWdhdGVVcmwFGGh0dHA6Ly93d3cuaGtnb2xkZW4uY29tL2QWAmYPDxYCHghJbWFnZVVybAUdL2ltYWdlcy9pbmRleF9pbWFnZXMvbG9nby5qcGdkZAICD2QWBGYPFgIfAAUtaHR0cDovL2ZvcnVtNS5oa2dvbGRlbi5jb20vbG9naW4uYXNweD9mYW50aT0xZAICDxYCHwAFLWh0dHA6Ly9mb3J1bTUuaGtnb2xkZW4uY29tL2xvZ2luLmFzcHg/ZmFudGk9MGQYAQUeX19Db250cm9sc1JlcXVpcmVQb3N0QmFja0tleV9fFgEFK2N0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkY2JfcmVtZW1iZXJfbG9naW7MnbkKMuV+P6aXe77o1u5SMiO2Yg==", "EVENTVALIDATION": "/wEWBgKj2bW3CQLIgaDXBQK/7a/7AgLr/8a7AQKtjfOnCgL6vZ/mCHLT5zkzPr9f16Jf2btWAzaW+Aqc"},
	{"FORUM": 6, "VIEWSTATE": "/wEPDwUKLTEwMjI4OTE3OA9kFgJmD2QWBGYPZBYCAgYPFgIeBGhyZWYFES4vanNjc3MvbGFyZ2UuY3NzZAIBD2QWBAIBDw8WAh4LTmF2aWdhdGVVcmwFGGh0dHA6Ly93d3cuaGtnb2xkZW4uY29tL2QWAmYPDxYCHghJbWFnZVVybAUdL2ltYWdlcy9pbmRleF9pbWFnZXMvbG9nby5qcGdkZAICD2QWBGYPFgIfAAUtaHR0cDovL2ZvcnVtNi5oa2dvbGRlbi5jb20vbG9naW4uYXNweD9mYW50aT0xZAICDxYCHwAFLWh0dHA6Ly9mb3J1bTYuaGtnb2xkZW4uY29tL2xvZ2luLmFzcHg/ZmFudGk9MGQYAQUeX19Db250cm9sc1JlcXVpcmVQb3N0QmFja0tleV9fFgEFK2N0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkY2JfcmVtZW1iZXJfbG9naW5aG6PxJtWQUMx9IB4oyxaAQ+2bLQ==", "EVENTVALIDATION": "/wEWBQLY7dbxCQLIgaDXBQK/7a/7AgKtjfOnCgL6vZ/mCPx1tXdc6k5/jX+WPQ71EpjTRJrU"},
	{"FORUM": 7, "VIEWSTATE": "/wEPDwUKLTEwMjI4OTE3OA9kFgJmD2QWBGYPZBYCAgYPFgIeBGhyZWYFES4vanNjc3MvbGFyZ2UuY3NzZAIBD2QWBAIBDw8WAh4LTmF2aWdhdGVVcmwFGGh0dHA6Ly93d3cuaGtnb2xkZW4uY29tL2QWAmYPDxYCHghJbWFnZVVybAUdL2ltYWdlcy9pbmRleF9pbWFnZXMvbG9nby5qcGdkZAICD2QWBGYPFgIfAAUtaHR0cDovL2ZvcnVtNy5oa2dvbGRlbi5jb20vbG9naW4uYXNweD9mYW50aT0xZAICDxYCHwAFLWh0dHA6Ly9mb3J1bTcuaGtnb2xkZW4uY29tL2xvZ2luLmFzcHg/ZmFudGk9MGQYAQUeX19Db250cm9sc1JlcXVpcmVQb3N0QmFja0tleV9fFgEFK2N0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkY2JfcmVtZW1iZXJfbG9naW7a76SQhA2r3h2H5aJhcnOmvTvK3g==", "EVENTVALIDATION": "/wEWBQKX8tK7CwLIgaDXBQK/7a/7AgKtjfOnCgL6vZ/mCPvGz4DtpCu8vBu5g35AhpppkqsL"},
	{"FORUM": 8, "VIEWSTATE": "/wEPDwUKLTEwMjI4OTE3OA9kFgJmD2QWBGYPZBYCAgYPFgIeBGhyZWYFES4vanNjc3MvbGFyZ2UuY3NzZAIBD2QWBAIBDw8WAh4LTmF2aWdhdGVVcmwFGGh0dHA6Ly93d3cuaGtnb2xkZW4uY29tL2QWAmYPDxYCHghJbWFnZVVybAUdL2ltYWdlcy9pbmRleF9pbWFnZXMvbG9nby5qcGdkZAICD2QWBGYPFgIfAAUtaHR0cDovL2ZvcnVtOC5oa2dvbGRlbi5jb20vbG9naW4uYXNweD9mYW50aT0xZAICDxYCHwAFLWh0dHA6Ly9mb3J1bTguaGtnb2xkZW4uY29tL2xvZ2luLmFzcHg/ZmFudGk9MGQYAQUeX19Db250cm9sc1JlcXVpcmVQb3N0QmFja0tleV9fFgEFK2N0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkY2JfcmVtZW1iZXJfbG9naW7e0RZNYHflHHaEOfznAeJ8KDXkBg==", "EVENTVALIDATION": "/wEWBQLy1J6wDwLIgaDXBQK/7a/7AgKtjfOnCgL6vZ/mCBRg9AuyJKFrONgBBMxViR6VGqiL"},
	{"FORUM": 9, "VIEWSTATE": "/wEPDwUKLTEwMjI4OTE3OA9kFgJmD2QWBGYPZBYCAgYPFgIeBGhyZWYFES4vanNjc3MvbGFyZ2UuY3NzZAIBD2QWBAIBDw8WAh4LTmF2aWdhdGVVcmwFGGh0dHA6Ly93d3cuaGtnb2xkZW4uY29tL2QWAmYPDxYCHghJbWFnZVVybAUdL2ltYWdlcy9pbmRleF9pbWFnZXMvbG9nby5qcGdkZAICD2QWBGYPFgIfAAUtaHR0cDovL2ZvcnVtOS5oa2dvbGRlbi5jb20vbG9naW4uYXNweD9mYW50aT0xZAICDxYCHwAFLWh0dHA6Ly9mb3J1bTkuaGtnb2xkZW4uY29tL2xvZ2luLmFzcHg/ZmFudGk9MGQYAQUeX19Db250cm9sc1JlcXVpcmVQb3N0QmFja0tleV9fFgEFK2N0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkY2JfcmVtZW1iZXJfbG9naW5Api/oDUAWgFa9wvyryijtGhv0pA==", "EVENTVALIDATION": "/wEWBQL2hNOxAQLIgaDXBQK/7a/7AgKtjfOnCgL6vZ/mCBNgK3U7xYrl/MBfk8HgW/TRPcdL"},
	{"FORUM": 10, "VIEWSTATE": "/wEPDwUKLTEwMjI4OTE3OA9kFgJmD2QWBGYPZBYCAgYPFgIeBGhyZWYFES4vanNjc3MvbGFyZ2UuY3NzZAIBD2QWBAIBDw8WAh4LTmF2aWdhdGVVcmwFGGh0dHA6Ly93d3cuaGtnb2xkZW4uY29tL2QWAmYPDxYCHghJbWFnZVVybAUdL2ltYWdlcy9pbmRleF9pbWFnZXMvbG9nby5qcGdkZAICD2QWBGYPFgIfAAUuaHR0cDovL2ZvcnVtMTAuaGtnb2xkZW4uY29tL2xvZ2luLmFzcHg/ZmFudGk9MWQCAg8WAh8ABS5odHRwOi8vZm9ydW0xMC5oa2dvbGRlbi5jb20vbG9naW4uYXNweD9mYW50aT0wZBgBBR5fX0NvbnRyb2xzUmVxdWlyZVBvc3RCYWNrS2V5X18WAQUrY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRjYl9yZW1lbWJlcl9sb2dpbhIdfa6wqeB0B0i+a9s6qKa+qCIg", "EVENTVALIDATION": "/wEWBQL88viTCwLIgaDXBQK/7a/7AgKtjfOnCgL6vZ/mCAkRGAcToFlNQ5koKNGgWceUZCo7"},
	{"FORUM": 11, "VIEWSTATE": "/wEPDwUKLTEwMjI4OTE3OA9kFgJmD2QWBGYPZBYCAgYPFgIeBGhyZWYFES4vanNjc3MvbGFyZ2UuY3NzZAIBD2QWBAIBDw8WAh4LTmF2aWdhdGVVcmwFGGh0dHA6Ly93d3cuaGtnb2xkZW4uY29tL2QWAmYPDxYCHghJbWFnZVVybAUdL2ltYWdlcy9pbmRleF9pbWFnZXMvbG9nby5qcGdkZAICD2QWBGYPFgIfAAUuaHR0cDovL2ZvcnVtMTEuaGtnb2xkZW4uY29tL2xvZ2luLmFzcHg/ZmFudGk9MWQCAg8WAh8ABS5odHRwOi8vZm9ydW0xMS5oa2dvbGRlbi5jb20vbG9naW4uYXNweD9mYW50aT0wZBgBBR5fX0NvbnRyb2xzUmVxdWlyZVBvc3RCYWNrS2V5X18WAQUrY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRjYl9yZW1lbWJlcl9sb2dpbgpLbdN/WyufEmqOZ9Wt2KQfbIzd", "EVENTVALIDATION": "/wEWBQLD5oI6AsiBoNcFAr/tr/sCAq2N86cKAvq9n+YIj3EptawIj0QTQYe99yAXbZKmb5I="}
];
var VIEWSTATE,EVENTVALIDATION;
function get_login_data(server){
	/*for(var k in login_data){
		if(login_data[k].FORUM==forum){
			return login_data[k];
		}
	}*/
	$.ajax({
		url: 'http://forum'+server+'.hkgolden.com/login.aspx',
		success: function(response){
			VIEWSTATE=$(response).find("#__VIEWSTATE").val();
			EVENTVALIDATION=$(response).find("#__EVENTVALIDATION").val();
		}
	});
}

function allServer(email){
	console.log('login.allServer()',email);
	var expire=Math.round(+new Date()/1000)+((3600*24)*30);
	for(var i=1;$i<=11;i++){
		var subdomain='forum'+i;
		console.log('subdomain',subdomain);
		//set username
		chrome.cookies.set({
			url: 'http://'+subdomain+'.hkgolden.com/topics.aspx?type=BW&page=1',
			path: '/',
			name: 'username',
			value: email,
			expirationDate: expire
		});
		//set remember
		chrome.cookies.set({
			url: 'http://'+subdomain+'.hkgolden.com/topics.aspx?type=BW&page=1',
			path: '/',
			name: 'remember_pass',
			value: 'Y',
			expirationDate: expire							
		});
		//set ep		
		chrome.cookies.set({
			url: 'http://'+subdomain+'.hkgolden.com/topics.aspx?type=BW&page=1',
			path: '/',
			name: 'ep',
			value: 'c426901f39f763fc519e2068db827e0b',
			expirationDate: expire			
		});
	}

}

function login(server){

	document.location.hash='';
	//document.location.href=document.location.href.replace('#','');
	$("#login_box").remove();
	if($("#login_box").length==0){
	var html='<div id="login_box" class="modal hide fade">';
		html+='<div class="modal-header">';
		html+='<button type="button" class="close" data-dismiss="modal">×</button>';
		html+='<h3>HKG Login (Server '+server+')</h3>';
		html+='</div>';
		html+='<div class="modal-body">';
		html+='<table class="table noborder">';
		html+='<tr><td class="title">Email</td><td><input type="text" id="login_email" value="" /></td></tr>';
		html+='<tr><td class="title">Password</td><td><input type="password" id="login_password" value="" /></td></tr>';
		html+='<tr><td class="title">Captcha</td><td><input type="text" id="login_captcha" value="" maxlength="4" /></td></tr>';
		html+='<tr><td class="title">All server<input type="checkbox" id="all_server" value="1" /></td><td><img id="captcha" src="http://forum'+server+'.hkgolden.com/CheckImageCode.aspx" class="pointer hide"><img id="login_loading" src="img/loading.gif"></td></tr>';
		html+='</table>';
		html+='</div>';
		html+='<div class="modal-footer">';
		html+='<a href="#" class="btn btn-primary" disabled="true" id="do_login">Login</a>';
		html+='<a href="#" class="btn" data-dismiss="modal">Close</a>';
		html+='</div>';
		html+='</div>';
		$(html).appendTo($("body"));
	}
	$("#login_box").modal();
	
	$("#login_captcha").keyup(function(){
		$(this).val($(this).val().toUpperCase());
	});
	$("#captcha").load(function(){
		console.log('captcha load success');
		$("#login_loading").hide();
		$("#captcha").show();
		$("#do_login").attr('disabled',false);
		setTimeout(function(){$("#login_email").focus();},1000);
	}).error(function(){
		noty({
			text: 'Load captcha fail, server no response / timeout',
			layout: 'bottomRight',
			type: 'error',
			timeout: 12000
		});
		setTimeout(function(){
			$("#login_box").modal('hide').remove();
		},10000);
	});
	
	$("#captcha").click(function(){
		$(this).attr('src',$(this).attr('src')+'?time='+(new Date().getTime()));
	});
	
	//	var params=
		get_login_data(server);
	$("#do_login").click(function(){
		if($("#do_login").attr('disabled')){
			return false;
		}
		var email=$("#login_email").val();//'lauyatsun@hkbn.net';
		var password=$("#login_password").val();
		//server=8;
		var data={
			'ctl00$ContentPlaceHolder1$txt_email':email,
			'ctl00$ContentPlaceHolder1$txt_pass':password,
			'ctl00$ContentPlaceHolder1$txtChkCode': $("#login_captcha").val(),
			'__VIEWSTATE':VIEWSTATE,//'/wEPDwUKMTM0NTM1MDI4OA9kFgJmD2QWBGYPZBYCAgYPFgIeBGhyZWYFES4vanNjc3MvbGFyZ2UuY3NzZAIBD2QWBAIBDw8WAh4LTmF2aWdhdGVVcmwFGGh0dHA6Ly93d3cuaGtnb2xkZW4uY29tL2QWAmYPDxYCHghJbWFnZVVybAUdL2ltYWdlcy9pbmRleF9pbWFnZXMvbG9nby5qcGdkZAICD2QWBGYPFgIfAAUtaHR0cDovL2ZvcnVtOC5oa2dvbGRlbi5jb20vbG9naW4uYXNweD9mYW50aT0xZAICDxYCHwAFLWh0dHA6Ly9mb3J1bTguaGtnb2xkZW4uY29tL2xvZ2luLmFzcHg/ZmFudGk9MGQYAQUeX19Db250cm9sc1JlcXVpcmVQb3N0QmFja0tleV9fFgEFK2N0bDAwJENvbnRlbnRQbGFjZUhvbGRlcjEkY2JfcmVtZW1iZXJfbG9naW6PrvUDMF6sYCl+ioWVw3A0dttlxA==',
			'__EVENTVALIDATION':EVENTVALIDATION,//'/wEWBgKdppTiDQLIgaDXBQK/7a/7AgLr/8a7AQKtjfOnCgL6vZ/mCJgsDiRF9HAflpxmh99CgmiM8XHU',
			'ctl00$ContentPlaceHolder1$cb_remember_login': 'on',
			'ctl00$ContentPlaceHolder1$linkb_login': '登入'
		};
		console.log('post data',server,data);
		$.ajax({
			url: 'http://forum'+server+'.hkgolden.com/login.aspx',
			type: 'POST',
			data: data,
			timeout: 30000,
			beforeSend: function(){
				$("#login_loading").show();
				$("#do_login").attr('disabled',true);
				$("#login_box").find('input').attr('disabled',true);
			},
			complete: function(xhr,status){
				console.log('complete',xhr,status);
				//alert('You are now atcomplete URL: ' + xhr.getResponseHeader("Location"));
					
			},
			success: function(response,status,xhr){
			
				//if(xhr.status > 300) {
				//}
				//var iserror=false;
				var error='';
				if(response.match(/bluebulb\.gif/i)){				
					//iserror=true;
					error='Login error';
				}
				else if(response.match(/驗證碼錯誤/i)){
					error='驗證碼錯誤';
				}
				else if(response.match(/帳戶或密碼錯誤/i)){
					error='帳戶或密碼錯誤';
				}		
				
				if(error!=''){
				$("#login_loading").hide();
				$("#do_login").attr('disabled',false);
				$("#login_box").find('input').attr('disabled',false);
				
					noty({
						text: error,
						layout: 'bottomRight',
						type: 'error',
						timeout: 3000
					});
				}
				else{
					console.log('success',xhr,status);
					
					
					if($(response).find("a[href*='ProfilePage.aspx']").length!=0){
						var user=$(response).find("a[href*='ProfilePage.aspx']");
						var username=$(user).html();
						var userid=$(user).attr('href').replace('ProfilePage.aspx?userid=','');
						$("#username").html(username);
						$("#login").html('Logout');
					}
					
					
					
					if($("#all_server").is(":checked")){
						allServer(email);
					}
					
					noty({
						text: username+' login success on server '+server,
						layout: 'bottomRight',
						type: 'success',
						timeout: 3000,
						callback:{
							afterShow: function(){
								$("#login_box").modal('hide').remove();
								//self.topic();
							}
						}
					});
				}
			},
			error: function(){
				$("#login_box").modal('hide').remove();
				
				noty({
					text: 'Login fail, server no response / timeout',
					layout: 'bottomRight',
					type: 'error',
					timeout: 3000
				});
			}
		});
	});
}

function logout(server){
	$.ajax({
		url: 'http://forum'+server+'.hkgolden.com/logout.aspx',
		success: function(response){
			$("#username").html('CD-ROM');
			$("#login").html('Login').attr('data-action','login');
			noty({
				text: 'Logout success on server '+server,
				layout: 'bottomRight',
				type: 'success',
				timeout: 3000
			});
		}
	});
}
/**
 * Verify HKG account
 */
var verify_url = host+"verify";

function verifyLoading(show){
	if(show){		
		$("#verify_box").find('input, a').attr('disabled', false);
		$("#verify_box").find('.modal-loading').hide();
		$("#verify_box").find('.close').show();
	}
	else{
		$("#verify_box").find('input, a').attr('disabled', true);
		$("#verify_box").find('.modal-loading').show();
		$("#verify_box").find('.close').hide();
	}
}

function verifyBox(extid) {	
	var body = '<table class="table noborder">';
	body += '<tr><td>Email</td><td><input type="text" id="verify_email" name="verify_email" value="" /></td></tr>';
	body += '<tr><td>Password</td><td><input type="password" id="verify_password" name="verify_password" value="" /></td></tr>';
	body += '<tr><td>Extension ID</td><td>' + extid + '</td></tr>';
	body += '<tr><td colspan="2"></td></tr>';
	body += '</table><div class="alert">認證過程中不會保留輸入的帳號/密碼等資料，只作登入確認是否擁有高登帳號。</div>';
	var html = buildModal({
			id : 'verify_box',
			header : 'Verify HKGFG extension application',
			body : body,
			confirm : {
				text : 'Verify'
			},
			close : {
				text : 'Close'
			}
		});
	
	$(html).modal();
	setTimeout(function () {
		$("#verify_email").focus();		
		$("#verify_box").find('.modal-confirm').click(function () {
			if($("#verify_email").val()=="" || $("#verify_password").val()==""){
				noty({
					text : 'Please input email and password',
					layout : 'bottomRight',
					type : 'error',
					timeout : 3000,
					callback : {
						afterShow : function () {
						$("#verify_email").focus();
						}
					}
				});
				return;
			}
			var time = new Date().getTime();
			$.ajax({
				url : verify_url,
				type : 'POST',
				data : 'login=' + time + '&email=' + $("#verify_email").val() + '&password=' + $("#verify_password").val() + '&extid=' + extid,
				timeout : 30000,
				beforeSend : function () {
					verifyLoading(false);
				},
				success : function (response) {
					var _data = $.parseJSON(response);
					if (_data.status == 200 || _data.status==201) {
						var value = {
							'username' : _data.username,
							'time' : _data.time,
							'extid' : _data.extid
						};
						var _text=(_data.status==200)?' verify success':' '+_data.message;
						localStorage.setItem('verify', JSON.stringify(value));
						noty({
							text : _data.username + _text,
							layout : 'bottomRight',
							type : 'success',
							timeout : 3000,
							callback : {
								afterShow : function () {
									$("#verify_box").modal('hide').remove();
									document.location.reload();
								}
							}
						});
					} else {
						verifyLoading(true);
						noty({
							text : 'Verify fail<br />' + _data.error,
							layout : 'bottomRight',
							type : 'error',
							timeout : 3000,
							callback : {
								afterShow : function () {}
							}
						});
					}
				},
				error : function () {
					verifyLoading(true);
					noty({
						text : 'Verify fail<br />Timeout',
						layout : 'bottomRight',
						type : 'error',
						timeout : 3000
					});
				}
				});
			});
			}, 500);
		}
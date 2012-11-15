/**
 * index init
 */
var host="http://lochen.my.phpcloud.com/hkgfc/";
var hkgfc_extid="";
var hkgfc;

function init() {

	$("#search").click(function(){funcNotReady(); return false;});
	$("#about").click(function () {
		$.getJSON('about.json', function (data) {
			var content =data.content;
			if(data.list.length!=0){
				console.log(data.list);
				var list="";
				$.each(data.list,function(i,d){
					list+='<div class="well box">';
					list+=d.title;
					list+='<ul>';
					$.each(d.item,function(j,item){
						list+='<li>'+item+'</li>';
					});
					list+='</ul>';					
					list+='</div>';
				});
				content+=list;
			}
			var value = {
				id : 'about_box',
				header : data.title+' ('+data.version+') License: '+data.license,
				body : content,
				confirm : false,
				close: false
			}
			$(buildModal(value)).modal();
		});
	});
	
	$("#open_setting").click(function () {
		$("#setting_box").modal();
		$("#save_setting").click(function () {
			var setting = $("#setting_box").find('form').serializeArray();
			var data = {};
			$.each(setting, function (i, d) {
				var key = d.name.substr(0, d.name.indexOf('['));
				var name = d.name.substr(d.name.indexOf('[') + 1, (d.name.indexOf(']') - d.name.indexOf('[')) - 1);
				if (!data[key])
					data[key] = {};
				data[key][name] = d.value;
			});
			console.log("save settings", data);
			localStorage.setItem('settings', JSON.stringify(data));
			$("#setting_box").modal('hide');
			noty({
				text : 'Settings save complete',
				layout : 'bottomRight',
				type : 'success',
				timeout : 3000
			});
		});
		
		$("#channel_list").find('a').each(function () {
			var value = $(this).attr('data-type');
			var name = $(this).text();
			$('<li data-value="' + value + '" value="' + value + '"><a href="#">' + name + '</a></li>').appendTo($("#dropdown_channel"));
		});
		$(".chkbox").click(function () {
			console.log($(this).attr('class'));
			if ($(this).find('i').attr('class').indexOf('ok') != -1) {
				$($(this).next('input')).val(0);
			} else {
				$($(this).next('input')).val(1);
			}
			$(this).find('i').toggleClass('icon-ok').toggleClass('icon-remove');
			return false;
		});
		
		$(".combobox").click(function () {
			var combo = $(this);
			$(this).next('ul').find('li').click(function () {
				var value = $(this).attr('data-value') ? $(this).attr('data-value') : $(this).attr('value');
				$(combo).find('span.text').html($(this).text());
				$(combo).find('input').val(value);
			});
		});
		
		$("#setting_tab").find('li').click(function () {
			$("#setting_tab").find('li').removeClass('active');
			$("#setting_box").find('table').hide();
			$(this).addClass('active');
			console.log('setting tab id', "#" + $(this).attr('data-value') + "_setting");
			$("#" + $(this).attr('data-value') + "_setting").show();
			
			if($(this).attr('data-value')=="verify"){
				var data=localStorage.getItem('verify');
				console.log(data);
				if(data){
					data=JSON.parse(data);
					$("#verify_username").html(data.username);
					$("#verify_key").html(data.extid);
					$("#verify_status").addClass('label-success').removeClass('label-important').html('Success');
					$("#verify_date").html($.format.date(new Date((data.time*1000)).getTime(), "yyyy-MM-dd"));
					$("#verify_version").html(chrome.app.getDetails().version);
				}
			}
			
		});
		return false;
	});
	
	$("#open_history").click(function () {
		var data = [];
		var len = unescape(encodeURIComponent(JSON.stringify(localStorage))).length;
		console.log('l', len);
		var size = (len != 2) ? bytesToSize(len) : 0 + 'MB';
		for (var i = 0; i < localStorage.length; i++) {
			var item = localStorage.getItem(localStorage.key(i));
			if (localStorage.key(i).match(/view\_/i)) {
				var value = JSON.parse(item);
				data.push({
					'key' : localStorage.key(i),
					'id' : value[0].id,
					'title' : value[0].title,
					'link' : value[0].link,
					'author': value[0].author
				});
			}
		}
		console.log(data);
		historyBox(data,1,size);
		return false;
	});
	
	$("#login").click(function () {
		/*var el = $(this);
		$.getScript('js/login.js', function () {
			console.log(hkgc);
			if ($(el).attr('data-action') == "login")
				login(hkgfc.server);
			else
				logout(hkgfc.server);
		});
		*/
		$(buildModal({
			header : 'Login',
			body: 'Login function is not avaliable, Please go to <a href="http://forum'+hkgfc.server+'.hkgolden.com/login.aspx">here</a>.'
		})).modal();
		return false;
	});
	
	$("#debug_hash").click(function () {
		console.log('location.hash:', location.hash);
		return false;
	});
	
	$("#current_server").click(function () {
		window.open(hkgfc.buildUrl(hkgfc.server, 'topics', hkgfc.channel));
		return false;
	});
	
	$("#open_post").click(function(){
		//$.getScript('js/jquery.caret.min.js');
		//$.getScript('js/post.js',function(){
		console.log(hkgfc.current);
			postBox({
				mode: 'topic',
				id: hkgfc.current.vid,
				title: hkgfc.current.title
			});
		//});
	});
}
function buildHistory(data,page,size){
var html = '<table class="table table-bordered">';
 html += '<tr><td width="100">ID</td><td>Title<div class="fright"><span class="badge">' + data.length + ' (' + size + ')</span></div></td></tr>';
		
		if (data.length != 0) {
			data.reverse();
			var start = (page>1)?(page+10):0;
			var end = (page>1)?(start+10):10;
			//var len = (data.length > 10) ? 10 : data.length;
			for (var i = start; i < end; i++) {
				html += '<tr><td>' + data[i].id.replace('view_','') + '</td><td>' + data[i].title + '<div class="author">'+data[i].author+'</div><div class="fright"><a href="#" class="redirect"><i class="icon-share-alt"></i></a><a href="#" class="remove"><i class="icon-remove"></i></a></div></td></tr>';
			}
		}
		html += '</table>';
	return html;
}

function historyBox(data,page,size){
	var total=parseInt((data.length/10).toFixed());
	var html=buildHistory(data,page,size);
		$("#history_box").remove();
		var modal = buildModal({
				id : 'history_box',
				header : 'History',
				body : html,
				confirm : {
					text : 'Clear all'
				}
			});
		$(modal).appendTo($("body"));
		$("#history_box").find('.modal-confirm').click(function () {
			console.log('clear storage');
			localStorage.clear();
			$("#history_box").modal('hide').remove();
		});
		$("#history_box").modal();
		
		setTimeout(function(){
			$('<div class="btn-group hpager" data-page="'+page+'"><button class="btn prev"><i class="icon-chevron-left"></i></button><button class="btn next"><i class="icon-chevron-right"></i></button></div>').appendTo($("#history_box").find('.modal-footer').find('.pull-left'));
			$('<div><span class="badge badge-info ptotal">'+page+'/'+total+'</span></div>')
			.css({position:'absolute',bottom:20,left:'50%','margin-left':-50,width:100,'text-align':'center'})
			.appendTo($("#history_box").find('.modal-footer'));
			
			$("#history_box").find('.prev, .next').click(function(){
				var pager=$("#history_box").find('.hpager');
				if($(this).hasClass('next')){
					page=(parseInt($(pager).attr('data-page'))+1);					
				}
				else{
					page=(parseInt($(pager).attr('data-page'))-1);				
				}
				console.log(page,total);
				if(page>0 && page<total){
					$("#history_box").find('.modal-body').fadeOut('normal',function(){
						$("#history_box").find('.modal-body').html(buildHistory(data,page,size)).fadeIn();
						$("#history_box").find('.ptotal').html(page+'/'+total);
					});
					$(pager).attr('data-page',page);
					bindHistoryHandle();
				}
			});
			bindHistoryHandle();
		},1000);

}

function bindHistoryHandle(){
	$("#history_box").find('a.remove, a.redirect').click(function(){
		var row=$(this).parents('tr');
		var id=$(row).find('td').first().text();
		if($(this).hasClass('remove')){
			localStorage.removeItem('view_'+id);
			$(row).fadeOut('normal',function(){
				$(row).remove();
				if($("#history_box").find('a.remove').length==0){
					
				}
			});
		}				
		return false;
	});
}

//dom ready
$(function () {
	//verify
	var verify = localStorage.getItem('verify');
	if (!verify) {
		$("#tab_loading, #tabs").hide();
		$('<div class="alert alert-error">Your HKGFG extension application was not actived, please <a href="#" id="open_verify">verify</a> it.</div>').appendTo($(".main-message"));
		$("#open_verify").click(function () {
			var extid = chrome.i18n.getMessage("@@extension_id");
			$.getScript(host+'js/verify.js', function () {
				verifyBox(extid);
			});
			return false;
		});
		return;
	}
	
	//get js
	$.getScript('js/jquery.caret.min.js');
	$.getScript('js/post.js');	
	
	//load settings
	var settings = localStorage.getItem('settings');
	if (!settings) {
		$.getJSON('settings.json', function (data) {
			console.log('get settings.json', data);
			localStorage.setItem('settings',JSON.stringify(data));
			window.hkgfc = new HKGCore(data.general);
			init();
		});
	} else {
		window.hkgfc = new HKGCore(JSON.parse(settings).general);
		init();
	}
	console.log('location', document.location);
	$("#open_logged_server").click(function () {
		var list = [];
		$("#logged_server_box").remove();
		chrome.cookies.getAll({
			domain : '.hkgolden.com',
			name : 'username'
		}, function (data) {
			console.log('chrome.cookies', data);
			var body = '<table class="table table-bordered">';
			$.each(data, function (i, d) {
				var _server = d.domain.replace(/forum([0-9]+).hkgolden.com/, '$1');
				var _expire = new Date(d.expirationDate * 1000).toLocaleString();
				_expire = _expire.substr(0, _expire.indexOf('GMT') - 1);
				if (d.value != '')
					list[_server] = _expire;
				if(d.domain=='m.hkgolden.com'){
					list['m'] = _expire;
				}
			});
			for (var i = 1; i <= 11; i++) {
				var t = list[i] ? list[i] : '';
				body += '<tr><td>Server ' + i + '<a href="http://forum' + i + '.hkgolden.com/topics.aspx?type=BW" target="_blank" class="pull-right"><i class="icon-share-alt"></i></a></td><td><span title="Expire date">' + t + '</span></td></tr>';
			}
			body += '<tr><td>Server m<a href="http://m.hkgolden.com/topics.aspx?type=BW" target="_blank" class="pull-right"><i class="icon-share-alt"></i></a></td><td><span title="Expire date">' + list['m'] + '</span></td></tr>';
			body += '</table>';
			var html = buildModal({
					id : 'logged_server_box',
					header : 'Logged server',
					body : body
				});
			$(html).modal();
		});
		return false;
	});
});
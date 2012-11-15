/**
 * HKG For Chrome
 * HTML5 + CSS3 + AJAX new forum style layout extension
 * @author corada@gmail.com
 * @version 1.0
 * @date 2012
 * @license LGPL
 */

var HKGCore = function (settings) {
	this.xhr = null;
	this.storage = null;
	this.server = 1;
	this.url = "http://forum1.hkgolden.com/topics.aspx?type=BW";
	this.channel = "BW"; //current channel
	this.channel_list = {
		'ET' : '娛樂台',
		'CA' : '時事台',
		'FN' : '財經台',
		'gm' : '遊戲台',
		'HW' : '硬件台',
		'IN' : '寬頻台',
		'SW' : '軟件台',
		'MP' : '手機台',
		'SP' : '體育台',
		'LV' : '感情台',
		'SY' : '講故台',
		'ED' : '飲食台',
		'TR' : '旅遊台',
		'CO' : '潮流台',
		'AN' : '動漫台',
		'TO' : '玩具台',
		'MU' : '音樂台',
		'VI' : '影視台',
		'DC' : '攝影台',
		'ST' : '學術台',
		'TS' : '汽車台',
		'RA' : '電　台',
		'MB' : '站務台',
		'AC' : '自組活動台',
		'EP' : '創意台',
		'BW' : '吹水台'
	};
	this.settings = {
		sensor : 0,
		server : 'random',
		channel : 'BW', //default channel
		timeout : 60,
		storage : 'cookie', //cookie or storage
		cache : 1,
		debug : 1
	};
	this.current = {
		type : 'topic'
	};
	this.t = 0;
	$.extend(this.settings, settings);
	this.init(settings);
}

HKGCore.prototype = {
	init : function (data) {
		var self = this;
		self.hash = window.location.hash;
		self.log('HKGCore.init()', "Setting", data, "Hash",self.hash);
		
		$("title").data('original', $("title").text());
		if (self.hash == '') {
			self.topic(data);
		} else {
			$("#tab_loading").hide();
			var hashs = self.hash.split('-');
			self.view({
				id : hashs[1],
				title : hashs[2],
				page : 1
			});
		}
		
		//click reload
		$("#reload").click(function () {
			self.reload();
		});
		
		//click to show topic list
		$("#tabs").find('li.active').click(function () {
			self.backTopic();
		});
		
		//switch server
		$("#nav_server").click(function () {
			$("#switch_server").find('a > span').remove();
		});		
		$("#switch_server").find('a').click(function (e) {
			if ($(this).hasClass('ping')) {
				e.preventDefault();
				$("#switch_server").find('a > span').removeClass('label-success label-important').html('(-)');
				$.getScript('js/ping.js', function () {
					$("#switch_server").find('a[class!=ping]').each(function (i, a) {
						var _furl = self.buildUrl($(this).attr('data-server'), 'topics', 'BW', 1);
						pingForum(_furl, null, function (presult) {
							var s;
							if ($(a).find('span').length == 0) {
								s = $('<span/>').addClass('label label-success').appendTo($(a));
							} else {
								s = $(a).find('span').get(0);
							}
							if (presult.status == 'error' || presult.seconds >= 10) {
								$(s).removeClass('label-success').addClass('label-important');
							}
							if (presult.seconds >= 30)
								presult.seconds = '>' + presult.seconds;
							$(s).html("(" + presult.seconds + "s)");
						});
					});
					
				});
				return false;
			} else {
				self.server = $(this).attr('data-server');
				console.log('Switch server', self.server);
				$("#current_server").html($(this).text());
				self.noty({
					text : 'Switch server ' + $(this).attr('data-server'),
					layout : self.settings.noty,
					type : 'information',
					timeout : 3000
				});
			}
		});
		
		//switch channel
		$("#channel_list").find('a').click(function () {
			self.channel = $(this).attr('data-type');
			self.setHeadTitle(self.channelName(self.channel + ' - ' + $("title").data('original')));
			console.log('Switch channel', self.channel);
			$("#current_channel").html($(this).text());
			
			self.noty({
				text : 'Switch channel ' + $(this).text(),
				layout : self.settings.noty,
				type : 'information',
				timeout : 3000
			});
			
			if (self.xhr != null)
				self.xhr.abort();
			$("div.thread").hide();
			self.topic();
		});
		
		//scroll top
		$(window).scroll(function () {
			if (self.current.type == 'topic') {
				$("#bottom_toolbar").find('button.hide').hide();
			} else {
				$("#bottom_toolbar").find('button.hide').show();
			}
			if ($(window).scrollTop() > 250) {
				$("#bottom_toolbar").fadeIn('normal');
			} else {
				$("#bottom_toolbar").fadeOut('normal');
			}
		});
		
		//bootom toolbar bind click
		$("#scroll_top").bind('click', function () {
			console.log('click scroll_top button');
			$(window).scrollTo(0, 500);
		});
		
		$("#scroll_down").bind('click', function () {
			console.log('click scroll_down button');
			$(window).scrollTo($(document).height(), 500);
		});
		
		$("#back_topic").bind('click', function () {
			self.backTopic();
		});
		
		$("#page_reload").bind('click', function () {
			self.reload();
		});
		
		$("#reply_topic").bind('click', function () {
			postBox({
				mode : 'view',
				id : self.current.vid,
				title : self.current.title
			});
		});
		
		$("#page_close").bind('click', function () {
			self.close();
		});
		
		//close all tabs
		$("#tabs_dropdown").contextmenu(function () {
			self.closeView('all');
			return false;
		});
		
		//F5 or ctrl+F5 reload current
		//head title
		if (self.hash == '') {
			$("title").html(self.channelName(self.settings.channel) + ' - ' + $("title").data('original'));
		}
		
		//double
		$("body").dblclick(function () {
			console.log("Double click reload");
			self.reload();
		});		
	},
	topic : function (data) {
		var self = this;
		var _data = {
			server : self.settings.server,
			channel : self.channel,
			page : 1
		}
		$.extend(_data, data);
		if (_data.server == 'random') {
			_data.server = self.randomServer();
			self.server = _data.server;
		}
		
		self.current.type = 'topic';
		var _url = self.buildUrl(_data.server, 'topics', _data.channel, _data.page);
		
		console.log('topic()', _data, _url);
		
		$("#current_server").html('Server ' + _data.server);
		
		var len = $("#topic_table").find('tr:gt(1)').length;
		if (len != 0)
			$("#topic_table").find('tr:gt(0)').fadeOut(300);
		
		self.keyboardControl();
		
		//ajax request
		self.xhr = $.ajax({
				url : _url,
				timeout : (self.settings.timeout * 1000),
				beforeSend : function () {
					$("#reload").attr('src', 'img/loading.gif');
					$("#tab_loading").show();
					$("#tab_topic").hide();
				},
				complete : function () {
					console.log('Topic ajax complete');
				},
				success : function (response, status) {
					//hide loading
					$("#tab_loading").hide();
					$("#tab_topic").show();
					
					var html = removeScript(response);
					
					//is logined
					if ($(html).find("a[href*='ProfilePage.aspx']").length != 0 && $(html).find("a[href*='islogout']").length != 0) {
						console.log($(html).find("a[href*='ProfilePage.aspx']"));
						var user = $(html).find("a[href*='ProfilePage.aspx']");
						var username = $(user).html();
						var userid = $(user).attr('href').replace('ProfilePage.aspx?userid=', '');
						$("#username").html(username);
						$("#login").html('Logout').attr('data-action', 'logout');
						console.log('is logined', username);
						self.noty({
							text : username + ' is logged on server ' + self.server
						});
					} else {
						$("#username").html('CD-ROM');
						$("#login").html('Login');
					}
					
					//parse data
					var topic_div = $(html).find('div#HotTopics');
					if ($(topic_div).length != 0) {
						var list = [];
						$(topic_div).find('tr').each(function (i, rows) {
							var cols = $(rows).find('td');
							var data = {};
							if ($($(cols).get(1)).text() != "") {
								var _total = 1;
								var _topic = $(cols).get(1);
								if ($($(cols).get(1)).find('a').length > 1) {
									_total = parseInt($($($(cols).get(1)).find('a').last()).text().replace(/\[\]/g, ""));
									$(_topic).find('a').each(function (i, el) {
										if (i != 0)
											$(el).remove();
									});
								}
								var _link = $(_topic).find('a').get(0);
								var m = $(_link).attr('href').match(/message\=([0-9]+)/);
								data.id = m[1];
								data.title = $.trim($(_topic).text().replace(/\[\]/g, "").replace("......", ""));
								data.author = $.trim($($(cols).get(2)).text());
								var time_format = self.timeFormat($.trim($($(cols).get(3)).text()));
								data.time = time_format.time;
								data.timeago = time_format.timeago;
								data.replies = $.trim($($(cols).get(4)).text());
								data.score = $.trim($($(cols).get(5)).text());
								data.total_page = _total;
								list.push(data);
							}
						});
						
						//build html
						if (list.length != 0) {
							var j = 0;
							$.each(list, function (i, data) {
								var tr = $('<tr>').hide();
								
								//topic filter
								if ($.cookie('filter')) {
									var filter = $.cookie('filter');
									$.each(filter, function (j, d) {
										if (d.id == data.id) {
											$(tr).addClass('blocked');
										}
									});
								}
								
								//topic is read
								var cls = 'unread';
								if (self.isread(data.id)) {
									cls = "read";
								}
								
								var _cog = '<a href="#" title="#' + (i + 1) + '" class="btn btn-mini dropdown-toggle tcog" data-toggle="dropdown"><i class="icon-cog"></i></a><ul class="dropdown-menu dropdown-menu-cog"><li><a href="#" class="tcog-link" data-id="' + data.id + '"><i class="icon-share-alt"></i>LINK</a></li><li><a href="#" class="tcog-bookmark"><i class="icon-bookmark"></i>Bookmark</a></li><li><a href="#" class="tcog-filter"><i class="icon-filter"></i>Filter</a></li></ul>';
								var _topic = '<div class="btn-group"><div class="topic"><div class="title">' + _cog + '<a href="#view-' + data.id + '-' + data.title + '-1" data-id="' + data.id + '" data-author=' + data.author + ' class="link ' + cls + '">' + data.title + '</a></div></div><div class="btn-group pull-right">';
								_topic += '<a class="btn btn-mini dropdown-toggle spage" data-toggle="dropdown" href="#">';
								if (data.total_page > 1)
									_topic += 'P.1 ~ ' + data.total_page + ' ';
								else
									_topic += 'P.1 ';
								_topic += '<span class="caret"></span>';
								_topic += '</a>';
								_topic += '<ul class="dropdown-menu dropdown-menu-page">';
								_topic += '<li><a href="#" data-num="1">P.1</a></li>';
								if (data.total_page > 1)
									_topic += '<li><a href="#" data-num="' + data.total_page + '">P.' + data.total_page + '</a></li>';
								_topic += '<li class="divider"></li>';
								_topic += '<li class="go-page"><div class="input-append"><input class="page-num" size="16" type="text"><button class="btn" type="button">Go!</button></div></li>';
								_topic += '</ul>';
								_topic += '</div></div>';
								
								$('<td>').html(_topic).appendTo($(tr));
								$('<td>').html('<span class="label">' + data.author + '</span>').appendTo($(tr));
								$('<td>').html('<span title="' + data.timeago + '">' + data.time + '</span>').appendTo($(tr));
								$('<td>').html(data.replies).addClass('tcenter').appendTo($(tr));
								var cls = ' badge-inverse';
								if (parseInt(data.score) < 0) {
									cls = ' badge-important';
								} else if (parseInt(data.score) > 0) {
									cls = ' badge-success';
									data.score = '+' + data.score;
								}
								data.score = '<span class="badge' + cls + '">' + data.score + '<span>';
								$('<td>').html(data.score).addClass('tcenter').appendTo($(tr));
								
								$($(tr).find("a.spage").parent()).find('.dropdown-menu-page').find('a').click(function () {
									self.view({
										id : data.id,
										title : data.title,
										author : data.author,
										page : $(this).attr('data-num')
									});
								});
								
								$(tr).appendTo($("#topic_table")).delay(j * 200).fadeIn(300);
								j++;
							});
							
							//bind event handle
							$("a.spage").click(function () {
								var num = $($(this).parent()).find('.dropdown-menu-page').find('.page-num');
								console.log('a.spage', 'click', $(num));
								setTimeout(function () {
									$(num).focus();
								}, 500);
							});
							
							$(".tcog-link").click(function () {
								window.open(self.buildUrl(self.server, 'view', self.channel, 1, $(this).attr('data-id')));
								return false;
							});
							
							$(".tcog-bookmark").click(function () {
								self.noty({
									text : 'Function is not available',
									layout : self.settings.noty,
									type : 'error',
									timeout : 3000
								});
								return false;
							});
							$(".tcog-filter").click(function () {
								self.noty({
									text : 'Function is not available',
									layout : self.settings.noty,
									type : 'error',
									timeout : 3000
								});
								return false;
							});
							
							//click topic
							$("a.link").click(function () {
								var el = $(this);
								$(el).removeClass('unread').addClass('read');
								self.setread({
									id : $(el).attr('data-id'),
									title : $(el).text(),
									time : new Date().getTime()
								});
								self.setHash('#hash-view-' + $(el).attr('data-id') + '-1');
								
								$(window).scrollTo(0, 500, {
									onAfter : function () {
										self.view({
											id : $(el).attr('data-id'),
											title : $(el).text(),
											author : $(el).attr('data-author'),
											page : 1
										});
									}
								});
							});
						}
						
						$("#reload").attr('src', 'img/reload.gif');
						
						//noty
						self.noty({
							text : self.channel_list[_data.channel] + ' P.' + _data.page + '<br />Load success <img src="faces/smile.gif">',
							layout : self.settings.noty,
							type : 'success',
							timeout : 3000
						});
					} else {
						console.log('Server ' + self.server + ' Load topic fail, topic code not found', this, status);
						
						$("#reload").attr('src', 'img/reload.gif');
						var _text = self.channel_list[_data.channel] + ' P.' + _data.page + '<br />Load fail on Server ' + self.server + ' <img src="faces/frown.gif">';
						if (response.match(/請先登入/)) {
							_text += '請先登入';
						}
						//noty
						self.noty({
							text : _text,
							layout : self.settings.noty,
							type : 'error',
							timeout : false
						});
					}
				},
				error : function (xhr, status, thrown) {
					console.log('HKGCore.topic() AJAX Error', xhr);
					$("#reload").attr('src', 'img/reload.gif');
					$("#tab_loading").hide();
					var _text = 'Load fail, server ' + self.server + ' no reponse / timeout.<br />Please try again later.';
					if (xhr.status != 0 && xhr.responseText.match(/maintenance/i)) {
						_text += '<br />網站維護中，請稍後再試。<img src="faces/fuck.gif">';
					} else {
						_text += ' <img src="faces/frown.gif">';
					}
					
					self.noty({
						text : _text,
						layout : self.settings.noty,
						type : 'error',
						timeout : false
					});
				}
			});
	},
	view : function (data) {
		var self = this;
		
		if (isUndefined(data.page) || data.page == null || data.page == 0) {
			data.page = 1;
		}
		console.log('view()', data);
		
		//hide topic list
		$("#tab_topic").slideUp(500);
		
		//build id, parse title
		var _id = 'view_' + data.id;
		var _title = data.title.substr(0, 30);
		//tabs dropdown control
		var dropdown = $("#tabs").find('li.dropdown').find('a.dropdown-toggle');
		var dropdown_menu = $("#tabs").find('li.dropdown').find('ul.dropdown-menu');
		
		//check view div exist
		if ($("#" + _id).length != 0) {
			var current_page = $("#" + _id).attr('data-current');
			if ($("#" + _id).find('div#' + _id + '_list_' + data.page).length != 0) {
				var toolbar = $("#" + _id).find('.btn-toolbar');
				$("#" + _id).find('.cpage').html('P.' + data.page);
				$("#" + _id).find('.large_loading').hide();
				$("#" + _id).find('div#' + _id + '_list_' + data.page).fadeIn();
				$("#" + _id).attr('data-current', data.page);
				self.bindToolbar({
					'toolbar' : $(toolbar),
					'id' : _id,
					'vid' : data.id,
					'title' : data.title,
					'author' : data.author,
					'page' : data.page,
					'total_page' : $("#" + _id).attr('data-total-page'),
					'url' : self.buildUrl(self.server, 'view', self.channel, data.page, data.id) //data.link
				});
				return;
			}
		}
		
		//add into tab if not exist
		if ($(dropdown_menu).find("li[data-id='" + _id + "']").length == 0) {
			var li = $('<li class="tab" data-id="' + _id + '"><a href="" title="' + data.title + '">' + _title + '</a><button class="close">×</button></li>');
			$(li).click(function () {
				if (!$("#tab_topic").is(":hidden"))
					$("#tab_topic").slideUp(500);
				$("div.thread").hide();
				$("#" + $(this).attr('data-id')).fadeIn();
				$(dropdown).find('span').html($(this).text());
				$("#tabs").find('li.dropdown').removeClass('open');
				self.current.type = 'view';
				return false;
			});
			
			$(li).find('button.close').click(function () {
				console.log('button.close');
				self.closeView(_id);
				return false;
			});
			$(li).appendTo($(dropdown_menu));
		}
		//hide empty
		$(dropdown_menu).find('li.empty').hide();
		
		self.setHeadTitle(_title, true);
		
		$("#topic_title").attr('title', data.title).html(_title);
		
		//build view div
		if ($("#" + _id).length == 0) {
			$('<div id="' + _id + '" class="thread" data-title="' + data.title + '"data-current="' + data.page + '" data-total-page="1" data-replies="0"><div class="large_loading"><img src="img/large_loading.gif"></div></div>').appendTo($("div.main-body"));
		}
		
		//cache is open
		if (self.settings.cache) {}
		
		var _url = self.buildUrl(self.server, 'view', self.channel, data.page, data.id);
		console.log('Request a page', _url);
		//request
		self.xhr = $.ajax({
				url : _url,
				timeout : (self.settings.timeout * 1000),
				beforeSend : function () {
					self.loading(_id, true);
				},
				success : function (response) {
					self.loading(_id, false);
					console.log('view() ajax success hash', window.location.hash);
					self.setHash('#view-' + data.id + '-' + data.title + '-' + data.page);
					
					//init view data
					var vdata = {
						id : data.id,
						title : '',
						tag : [],
						score : [0, 0],
						list : [],
						page : data.page,
						author : data.author
					};
					
					var html = removeScript(response);
					var rows = $(html).find('div#ctl00_ContentPlaceHolder1_view_form').find('table.repliers');
					
					//pages
					vdata.total_page = $($($(html).find('select[name=page]').first()).find('option').last()).val();
					
					//replies
					var index = (data.page == 1) ? 2 : 0;
					vdata.replies = $.trim($($(html).find('div#ctl00_ContentPlaceHolder1_view_form').find('table').get(index)).find("td > strong").text());
					
					//breadcrumb
					var type_links = $(html).find("a[href$='type=" + self.channel + "']");
					var prev_channel = $($(type_links).get(0)).prev();
					if ($(prev_channel).length != 0 && $(prev_channel).attr('href').match(/topics/i)) {
						self.setBreadcrumb('add', $(prev_channel).text());
					}
					
					$(rows).each(function (i, row) {
						var thread = $(row).find('tr[id*=Thread]');
						if ($(row).find('td.repliers_header').length != 0) {
							vdata.title = $.trim($($(row).find('td.repliers_header').get(1)).text());
						}
						
						if ($(thread).length != 0) {
							var no = (data.page == 1) ? 1 : 25 * (data.page - 1);
							var tdata = {};
							tdata.username = $(thread).attr('username');
							tdata.userid = $(thread).attr('userid');
							tdata.no = (parseInt($(thread).attr('id').replace("Thread_No", "")) + no);
							if (tdata.no == 1) {
								//tags
								if ($(thread).find('span.forum_taglabel').length != 0) {
									$(thread).find('span.forum_taglabel').find('a').each(function () {
										vdata.tag.push($(this).text());
									});
								}
								//score
								var score = [];
								score[0] = $(thread).find("div#DivMarkThread").find('span').first().text();
								if (score[0] == "")
									score[0] = 0;
								score[1] = $(thread).find("div#DivMarkThread").find('span').last().text();
								if (score[1] == "")
									score[1] = 0;
								vdata.score = [score[0], score[1]];
							}
							
							//sex
							if ($(thread).find('.repliers_left').length != 0) {
								var detail = $(thread).find('.repliers_left').find('a[href*=javascript]');
								tdata.sex = 'M';
								if ($(detail).attr('style').match(/\#FF0066/g)) {
									tdata.sex = 'F';
								}
							}
							//parse content, time
							if ($(thread).find('table.repliers_right').length != 0) {
								var content = $(thread).find('table.repliers_right').find('td').get(0);
								
								if ($(content).find("img[src='圖片網址']").length != 0) {
									$(content).find("img[src='圖片網址']").parent('a').attr('href', '#').removeAttr('target');
									$('<span>圖片網址?</span>').insertAfter($(content).find("img[src='圖片網址']"));
									$(content).find("img[src='圖片網址']").remove();
								}
								
								tdata.content = $(content).html().toString().replace('<br><br><br>', "");
								var bottom = $(thread).find('table.repliers_right').find('td').last();
								var time = $($(bottom).find('span').last()).text();
								
								times = time.split(" ");
								if (time.match(/(AM|PM)/i)) {
									var month = times[0].substr(0, times[0].indexOf("/"));
									var day = times[0].substr(times[0].indexOf("/") + 1, times[0].lastIndexOf("/") - times[0].indexOf("/") - 1);
								} else {
									var day = times[0].substr(0, times[0].indexOf("/"));
									var month = times[0].substr(times[0].indexOf("/") + 1, times[0].lastIndexOf("/") - times[0].indexOf("/") - 1);
									times[2] = '';
								}
								
								var year = times[0].substr(times[0].lastIndexOf("/") + 1, 4);
								time = year + '-' + month + '-' + day + ' ' + times[1] + ' ' + times[2];
								tdata.time = $.trim(time);
								tdata.timeago = $.timeago(new Date(time));
							}
							//add data into list
							vdata.list.push(tdata);
						}
					});
					
					console.log('parse view html data', vdata);
					//cache data
					var cid = 'view_' + data.id; //cache id
					var cdata = self.getCache(cid, true);
					if (cdata == null) {
						self.setCache(cid, [{
									id : vdata.id,
									title : vdata.title,
									author : vdata.author
								}
							], true)
					}
					
					//build view display
					self.buildView(_id, vdata);					
					self.noty({
						text : data.title + '<br />P.' + data.page + '<br />Load success <img src="faces/smile.gif">',
						layout : self.settings.noty,
						type : 'success',
						timeout : 3000
					});
				},
				error : function (xhr) {
					self.loading(_id, false);
					console.log('Load view fail', xhr);
					var _text = data.title + '<br />P.' + data.page + '<br />Load fail';
					
					self.closeView(_id);
					if (xhr.status != 0 && xhr.responseText.match(/maintenance/i)) {
						_text += '<br />網站維護中，請稍後再試。<img src="faces/fuck.gif">';
					} else {
						_text += ' <img src="faces/frown.gif">';
					}
					self.noty({
						text : _text,
						layout : self.settings.noty,
						type : 'error',
						timeout : false
					});
				}
			});
	},
	buildView : function (id, data) {
		console.log('build view', id, data);
		var self = this;
		var tid = id.replace('view_', '');
		//container
		var container = $('<div class="list" id="' + id + '_list_' + data.page + '"></div>')
			.attr('data-page', data.total_page)
			.appendTo($('#' + id));
		
		if (data.list.length != 0) {
			if ($('#' + id).find('.option').length == 0) {
				var option = $('<div class="option clearfix"></div>').insertBefore($('#' + id).find('.large_loading'));
				
				var select_page = '<div class="btn-group"><button class="btn dropdown-toggle cpage" data-toggle="dropdown">P.' + data.page + ' <span class="caret"></span></button><ul class="dropdown-menu dropdown-menu-page"><li class="fpage" data-page="' + data.page + '"><a href="#">P.1</a></li>';
				if (data.page != data.total_page)
					select_page += '<li class="lpage" data-page="' + data.total_page + '"><a href="#">P.' + data.total_page + '</a></li>';
				select_page += '<li class="divider"></li><li class="go-page"><div class="input-append"><input class="page-num" size="16" type="text"><button class="btn gopage" type="button">Go!</button></div></li></ul></div>';
				var toolbar = $('<div class="btn-toolbar">' + select_page + '<div class="btn-group"><button class="btn option-bookmark" rel="tooltip" title="Bookmark"><i class="icon-bookmark"></i></button><button class="btn option-reload" rel="tooltip" title="Reload page"><i class="icon-refresh option-reload"></i></button><button class="btn option-close" rel="tooltip" title="Close"><i class="icon-remove"></i></button><button class="btn option-link" rel="tooltip" title="Go to original url"><i class="icon-share-alt"></i></button></div><div class="btn-group"><button class="btn ppage" rel="tooltip" title="Prev page"><i class="icon-circle-arrow-left"></i></button><button class="btn godown" rel="tooltip" title="Scroll down"><i class="icon-circle-arrow-down"></i></button><button class="btn npage" rel="tooltip" title="Next page"><i class="icon-circle-arrow-right"></i></button></div><div class="btn-group"><button class="btn reply" rel="tooltip" title="Reply"><i class="icon-comment"></i></button></div></div>').appendTo($(option));
				$('<div class="right"><span class="badge"><i class="icon-tags"></i>' + data.tag.join(' ') + '</span><span class="badge">Replies <span class="replies">' + data.replies + '</span></span></div>').appendTo($(option));
				$("#" + id).attr('data-replies', data.replies);
			} else {
				var toolbar = $("#" + id).find('.btn-toolbar');
				$("#" + id).find('.cpage').html('P.' + data.page);
			}
			
			self.bindToolbar({
				'toolbar' : $(toolbar),
				'id' : id,
				'vid' : data.id,
				'title' : data.title,
				'author' : data.author,
				'page' : data.page,
				'total_page' : data.total_page,
				'url' : self.buildUrl(self.server, 'view', data.channel, data.page, data.id) //data.link
			});
			
			//build thread table
			var t_table = $('<table class="table table-bordered">');
			$.each(data.list, function (i, d) {
				var score = '',
				isauthor = '';
				if (i == 0 && data.page == 1) {
					score = '<div class="btn-group"><button class="btn score-btn" data-score="1"><img src="faces/ThumbUp.gif"><span>' + data.score[0] + '</span></button><button class="btn score-btn" data-score="2"><img src="faces/ThumbDown.gif"><span>' + data.score[1] + '</span></button></div>';
				}
				var mics = '<div class="left">' + score + '</div>';
				mics += '<div class="right"><a href="#" class="badge quote"><i class="icon-retweet icon-white"></i></a> <span rel="tooltip" title="' + d.time + '" class="badge badge-inverse"><i class="icon-time icon-white"></i> ' + d.timeago + '</span></div>';
				
				var content = '<div class="box">';
				content += '<div class="num" rel="tooltip left" title="Left click scroll down<br />Right click scroll up" data-index="' + i + '"><span class="badge badge-info">#' + d.no + '</span></div>';
				content += '<div class="content">' + self.convertContent(d.content) + '</div>';
				content += '<div class="mics clearfix">' + mics + '</div>';
				content += '</div></div>';
				if (d.username == data.author) {
					isauthor = '<div title="樓主" class="icon icon-user"></div>';
				}
				var row = $('<tr><td><div class="author sex_' + d.sex + '">' + d.username + '</div>' + isauthor + '</td><td>' + content + '</td></tr>');
				$(row).find('.quote').click(function () {
					var c = $.trim(d.content);
					console.log(c);
					c = self.convertToBBCode(c);
					console.warn(c);
					postBox({
						mode : 'view',
						id : self.current.vid,
						title : self.current.title,
						content : '[quote]' + self.convertToBBCode(d.content) + '[/quote]'
					});					
					return false;
				});
				$(row).appendTo($(t_table));				
			});
			
			$(t_table).appendTo($(container));
			
			//build page box
			var page_box = $('<div class="page-box"><ul class="pager"><li class="previous"><a href="#">Previous</a></li><li class="top"><a href="#" id="go_top">P.' + data.page + ' / ' + data.total_page + '</a></li><li class="next"><a href="#">Next</a></li></ul></div>').appendTo($(container));
			
			$(page_box).find('.next').click(function () {
				data.vid = data.id;
				data.id = id;
				self.goPage('next', data);
				return false;
			});
			
			$(page_box).find('.previous').click(function () {
				data.vid = data.id;
				data.id = id;
				self.goPage('prev', data);
				return false;
			});
			
			$(page_box).find('.top').click(function () {
				$(window).scrollTo(0, 500);
				return false;
			});
			
			$(t_table).find('.content').find('img').load(function () {
				if ($(this).width() > 500) {
					$(this).css({
						width : 500
					});
				}
			});
			
			//img-zoom gallery
			var img_gallery = $(t_table).find('.content').find('.img-zoom').prev('a');
			if ($(img_gallery).length != 0) {
				var gallery_url = [];
				$(img_gallery).each(function () {
					if($.inArray($(this).attr('href'))==-1){
						gallery_url.push($(this).attr('href'));
					}
				});
				console.log(gallery_url);
			}
			//click img-zoom
			$(t_table).find('.content').find('.img-zoom').each(function (i, el) {
				$(el).click(function () {
					var img_preload = new Image();
					var footer = '';
					
					var src = $(el).prev('a').attr('href');
					
					if (gallery_url.length != 0) {
						var index = $.inArray(src, gallery_url);
						if (index != -1) {
							footer = '<a class="btn prev">Prev</a>';
							footer += '<a class="btn btn-primary disabled total" data-current="' + index + '">' + (index + 1) + ' / ' + gallery_url.length + '</a>';
							footer += '<a class="btn next">Next</a>';
						}
						console.log(index, src, gallery_url.length, gallery_url);
					}
					
					var imgid = 'img_zoom_box';
					$("#" + imgid).remove();
					$("#preload_img").remove();
					console.log('img src', src);
					var link = (src.length > 30) ? src.substr(0, 30) + "..." : src;
					var m = buildModal({
							id : imgid,
							header : '<a href="' + src + '" title="' + src + '" target="_blank">' + link + '</a>',
							body : '<div class="tcenter"><img src="img/loading.gif" class="loading"></div>',
							footer : footer,
						});
					$(m).modal();
					setTimeout(function () {
						var img = $('<img id="preload_img" src="' + src + '" />').addClass('hide photo').appendTo($("body"));
						$(img).load(function () {
							console.log('img load', $(img).width());
							fullscreen($("#" + imgid), {
								offset : 10,
								callback : function () {
									var h = $("#" + imgid).height() - $("#" + imgid).find('.modal-header').outerHeight() - $("#" + imgid).find('.modal-footer').outerHeight() - parseInt($("#" + imgid).find('.modal-body').css('padding-top')) - parseInt($("#" + imgid).find('.modal-body').css('padding-bottom'));
									$("#" + imgid).find('.modal-body').css({
										height : h,
										'max-height' : 'none'
									});
									$("#preload_img").removeClass('hide').appendTo($("#" + imgid).find(".tcenter"));
								}
							});
							$("#" + imgid).find('img.loading').hide();
						}).error(function () {
							console.log('img error', $(img).width());
							$("#" + imgid).find('img.photo').hide();
							$("#" + imgid).find('img.loading').hide();
							$('<div/>').html('Image laod eorror').insertAfter($("#" + imgid));
						});
						$("#" + imgid).find('.prev, .next').click(function () {
							var _index = parseInt($("#" + imgid).find('.total').attr('data-current'));
							if ($(this).hasClass('prev'))
								_index = (_index - 1);
							else
								_index = (_index + 1);
							console.log($(this).attr('class'), _index, gallery_url[_index]);
							if (_index >= 0 && _index <= gallery_url.length) {
								$("#" + imgid).find('.total').attr('data-current', _index);
								$("#" + imgid).find('img.photo').fadeOut('normal', function () {
									$("#" + imgid).find('.modal-header').find('a').attr('href', gallery_url[_index]).html(gallery_url[_index]);
									$("#" + imgid).find('img.photo').attr('src', gallery_url[_index]).fadeIn();
									$("#" + imgid).find('.index').html(_index);
								});
							}							
						});
					}, 1000);
					return false;
				});
			});
			
			$(t_table).find('.content').find('.link-zoom').click(function () {
				$("#iframe_box").remove();
				var _furl = $(this).attr('href');
				var _fullview = true;
				if ((rez = _furl.match(/(youtube\.com|youtu\.be)\/(v\/|u\/|embed\/|watch\?v=)?([^#\&\?]*).*/i))) {
					_furl = 'http://www.youtube.com/embed/' + rez[3] + '?autoplay=1&autohide=1&fs=1&rel=0&enablejsapi=1';
					_fullview = false;
				}
				var html = '<div class="tcenter" style="height:100%;"><img src="img/loading.gif" class="loading"><iframe id="iframe" src="' + _furl + '" width="640" height="360" frameborder="0" hspace="0" class="hide"></iframe></div>';
				var modal = bootbox.modal(html, 'External Page', {
						id : 'iframe_box',
						width : $(window).width() - 20,
						height : $(window).height() - 20
					});
				
				$("#iframe").load(function () {
					$("#iframe_box").find('.modal-body').css({
						'max-height' : 'none'
					});
					if(_fullview){
						console.log("Iframe box body height", $("#iframe_box").find('.modal-body').height());
						var h = $("#iframe_box").height() - $("#iframe_box").find('.modal-header').outerHeight() - $("#iframe_box").find('.modal-footer').outerHeight() - parseInt($("#iframe_box").find('.modal-body').css('padding-top')) - parseInt($("#iframe_box").find('.modal-body').css('padding-bottom'));
						$("#iframe").css({
							width : $("#iframe_box").find('.tcenter').width() + 5,
							'height' : h
						});
					}
					$("#iframe").fadeIn();
					$("#iframe_box").find('.loading').hide();
				}).error(function () {
					$("#iframe_box").find('.tcenter').html('Load error');
					$("#iframe_box").find('.loading').hide();
				});				
				return false;
			});
			
			//update total, replies
			if (data.page != 1) {
				console.log('update total, replies', $("#" + id).attr('data-replies'), data.replies);
				if ($("#" + id).attr('data-replies') != data.replies) {
					$("#" + id).attr('data-replies', data.replies);
					$("#" + id).find('.option').find('.replies').html(data.replies);
				}
			}
			$("#" + id).attr('data-total-page', data.total_page);
			
			//bind event handle
			$("#reload").attr('src', 'img/reload.gif');
			$('#' + id).find(".large_loading").hide();
			$('#' + id).find(".num").click(function () {
				var index = parseInt($(this).attr('data-index')) + 1;
				var y = $($('#' + id).find('.content').get(index)).offset().top;
				console.log('scroll to content', index, $('#' + id).find('.content').get(index), y);
				$(window).scrollTo({
					top : y - 100,
					left : 0
				}, 500);
			}).contextmenu(function () {
				var index = parseInt($(this).attr('data-index')) - 1;
				var y = $($('#' + id).find('.content').get(index)).offset().top;
				console.log('scroll to content', index, $('#' + id).find('.content').get(index), y);
				if (index >= 0)
					$(window).scrollTo({
						top : y - 100,
						left : 0
					}, 500);
				return false;
			});
			
			$('#' + id).find('.score-btn').click(function () {
				var s = $(this).attr('data-score');
				$.getScript('js/score.js', function () {
					doScore(id, tid, s);
				});
			});
			
			$('#' + id).find("[rel*='tooltip']").each(function (i, el) {
				var options;
				var m = $(el).attr('rel').match(/(top|bottom|left|right)/i);
				if (m) {
					options = {
						placement : m[1],
					};
					$(el).click(function () {
						$(el).tooltip('hide');
					});
				}
				$(el).tooltip(options);
			});
		} else {
			console.log('data.list is empty', data);
			self.noty({
				text : 'Build view layout fail',
				layout : self.settings.noty,
				type : 'error'
			});
		}
	},
	closeView : function (id) {
		console.log('closeView()', id);
		var self = this;
		var dropdown = $("#tabs").find('li.dropdown').find('a.dropdown-toggle');
		var dropdown_menu = $("#tabs").find('li.dropdown').find('ul.dropdown-menu');
		
		self.current.type = 'topic';
		self.setHash('');
		self.setHeadTitle($("title").data('original'));
		self.setBreadcrumb('remove');
		
		$("#bottom_toolbar").find('button.hide').hide();
		if (id == 'all') {
			$(dropdown).find('span').attr('title', '').html('');
			$(dropdown_menu).find('li.tab').remove();
			$(dropdown_menu).find('li.empty').show();
			$(".thread").remove();
			$("#tab_topic").slideDown(1500);
			self.noty({
				text : 'All tabs close complete <img src="faces/angel.gif">',
				layout : self.settings.noty,
				type : 'success',
				timeout : 3000
			});
		} else {
			$("#" + id).fadeOut(1000, function () {
				$("#" + id).find('[rel=tooltip]').tooltip('hide');
				$("#" + id).remove();
				var text = $("li[data-id='" + id + "']").find('a').attr('title');
				$("li[data-id='" + id + "']").remove();
				$(dropdown).find('span').attr('title', '').html('');
				if ($(dropdown_menu).find('li').length == 1) {
					$(dropdown_menu).find('li.empty').show();
					$("body").trigger('click');
				}
				
				$("#tab_topic").slideDown(1500);
				if ($("#tab_topic").find('tr').length == 1) {
					self.topic();
				}
				
				self.noty({
					text : text + '<br />Close complete <img src="faces/angel.gif">',
					layout : self.settings.noty,
					type : 'success',
					timeout : 3000
				});
			});
		}
	},
	bindToolbar : function (obj) {
		var self = this;
		console.log('bindToolbar', obj);
		
		self.current = {
			type : 'view',
			id : obj.id,
			vid : obj.vid,
			title : obj.title,
			page : obj.page,
			cache : 0
		};
		
		//click page dropdown
		$(obj.toolbar).find(".cpage").click(function () {
			console.log('click toolbar page dropdown', $(obj.toolbar).find('.dropdown-menu-page').find('.page-num').length);
			setTimeout(function () {
				var page_num = $(obj.toolbar).find('.dropdown-menu-page').find('.page-num')
					$(page_num).focus();
				$(page_num).keypress(function (e) {
					console.log('page_num keypress', e.keyCode);
					if (e.keyCode == 13) {
						obj.num = parseInt($(page_num).val());
						if (obj.num > 0 && obj.num <= obj.total_page) {
							$(obj.toolbar).find('.gopage').trigger('click');
						}
					}
				});
				
			}, 500);
		});
		
		//click bookmark
		$(obj.toolbar).find('.option-bookmark')
		.unbind('click')
		.click(function () {
			self.noty({
				text : 'Function is not available',
				layout : self.settings.noty,
				type : 'error',
				timeout : 3000
			});
		});
		
		//click reload
		$(obj.toolbar).find('.option-reload').click(function () {
			self.reload();
		});
		
		//click close
		$(obj.toolbar).find('.option-close').unbind('click').click(function () {
			$(this).tooltip('hide');
			self.closeView(obj.id);
		});
		
		//click option
		$(obj.toolbar).find('.option-link').unbind('click').one('click', function () {
			window.open(obj.url);
		});
		
		//click prev page
		$(obj.toolbar).find('.ppage')
		.unbind('click')
		.removeClass('disabled').addClass((obj.page == 1) ? 'disabled' : '')
		.click(function () {
			self.goPage('prev', obj);
			return false;
		});
		
		//click go down
		$(obj.toolbar).find('.godown').click(function () {
			$(window).scrollTo($('.main-footer'), 500);
		});
		
		//click next page
		$(obj.toolbar).find('.npage')
		.unbind('click')
		.removeClass('disabled').addClass((obj.page == obj.total_page) ? 'disabled' : '')
		.click(function () {
			self.goPage('next', obj);
		});
		
		//jump to first page
		$(obj.toolbar).find('.fpage')
		.unbind('click')
		.click(function () {
			console.log('jump to first page', $(this).attr('data-page'));
			var fpage = $(this).attr('data-page');
			$("#" + obj.id).find('.list').hide();
			var lpage = $(this).attr('data-page');
			$(window).scrollTo(0, 500, function () {
				$("#" + obj.id).find('.large_loading').show();
				self.view({
					id : obj.vid,
					title : obj.title,
					page : fpage,
					cache : 0
				});
			});
			return false;
		});
		
		//jump to last page
		$(obj.toolbar).find('.lpage')
		.unbind('click')
		.click(function () {
			console.log('jump to last page', $(this).attr('data-page'));
			$("#" + obj.id).find('.list').hide();
			var lpage = $(this).attr('data-page');
			$(window).scrollTo(0, 500, function () {
				$("#" + obj.id).find('.large_loading').show();
				self.view({
					id : obj.vid,
					title : obj.title,
					page : lpage,
					cache : 0
				});
			});
			return false;
		});
		
		//go to page no
		$(obj.toolbar).find('.gopage')
		.unbind('click')
		.click(function () {
			obj.num = $(obj.toolbar).find('.page-num').val();
			self.goPage('num', obj);
		});
		
		$(obj.toolbar).find('.reply')
		.unbind('click')
		.click(function () {
			$.getScript('js/jquery.caret.min.js');
			$.getScript('js/post.js', function () {
				postBox({
					mode : hkgfc.current.type,
					id : hkgfc.current.vid,
					title : hkgfc.current.title
				});
			});
		});
	},
	goPage : function (type, data) {
		var self = this;
		console.log('goPage()', data);
		if (type == 'next') {
			if (data.page != data.total_page) {
				$("#" + data.id).find('.list').hide();				
				$(window).scrollTo(0, 500, function () {
					$("#" + data.id).find('.large_loading').show();
					self.view({
						id : data.vid,
						title : data.title,
						author : data.author,
						page : (data.page + 1),
						cache : 0
					});
				});
			} else {
				self.noty({
					text : 'No next page'
				});
			}
		} else if (type == 'prev') {
			if (data.page != 1) {
				$("#" + data.id).find('.list').hide();
				$(window).scrollTo(0, 500, function () {
					$("#" + data.id).find('.large_loading').show();
					self.view({
						id : data.vid,
						title : data.title,
						author : data.author,
						page : (data.page - 1),
						cache : 0
					});
				});
			} else {
				self.noty({
					text : 'No previous page'
				});
			}
		} else if (type == 'num') {
			$("#" + data.id).find('.list').hide();
			$(window).scrollTo(0, 500, function () {
				$("#" + data.id).find('.large_loading').show();
				self.view({
					id : data.vid,
					title : data.title,
					author : data.author,
					page : data.num,
					cache : 0
				});
			});
		}
	},
	buildUrl : function (server, target, channel, page, id) {
		var url = this.url;
		if (target == 'view') {
			url = url.replace('topics', 'view');
		}
		
		if (server == 'random')
			this.server = this.randomServer();
		else
			this.server = server;
		
		console.log("Server: "+this.server, "Channel: "+channel);
		if (channel != this.channel) {
			$("#current_channel").html(this.channel_list[channel]);
		}
		url = url.replace(/forum([0-9]+)/, 'forum' + this.server);
		url = url.replace(/type\=([a-zA-Z]+)/, 'type=' + channel);
		if (!isUndefined(id))
			url += '&message=' + id;
		if (!isUndefined(page))
			url += '&page=' + page;
		if (!this.settings.sensor)
			url += '&sensormode=N';
		return url;
	},
	randomServer : function () {
		return Math.floor((Math.random() * 11) + 1);
	},
	timeFormat : function (time) {
		var times = time.split(" ");
		if (time.match(/(AM|PM)/i)) {
			var month = times[0].substr(0, times[0].indexOf("/"));
			var day = times[0].substr(times[0].indexOf("/") + 1, times[0].lastIndexOf("/") - times[0].indexOf("/") - 1);
		} else {
			var day = times[0].substr(0, times[0].indexOf("/"));
			var month = times[0].substr(times[0].indexOf("/") + 1, times[0].lastIndexOf("/") - times[0].indexOf("/") - 1);
			times[2] = '';
		}
		
		var year = times[0].substr(times[0].lastIndexOf("/") + 1, 4);
		time = year + '-' + month + '-' + day + ' ' + times[1] + ' ' + times[2];
		time = $.trim(time);
		var data = {
			'time' : time,
			'timeago' : $.timeago(new Date(time))
		};
		return data;
	},
	noty : function (option) {
		// log
		option.time = new Date().getTime();
		var log = localStorage.getItem('log_noty');
		if (log) {
			log = JSON.parse(log);
			log.push(option);
		} else {
			log = [option];
		}
		localStorage.setItem('log_noty', JSON.stringify(log));
		
		if ($.noty) {
			var options = {
				text : '',
				layout : 'bottomRight',
				type : 'information',
				timeout : 3000
			};
			$.extend(options, option);
			return noty(options);
		} else {
			$('<div id="noty">' + option.text + '</div>').css({
				position : 'fixed',
				bottom : 0,
				right : 0,
				border : '1px solid #CCC',
				padding : '5px',
				background : '#FFFFFF'
			})
			.appendTo($("body"));
		}
	},
	loading : function (id, show) {
		var self = this;
		console.log('loading()', id, show);
		if (show) {
			$("#reload").attr('src', 'img/loading.gif');
			$("#" + id).find('.large_loading').show();
		} else {
			$("#reload").attr('src', 'img/reload.gif');
			$("#" + id).find('.large_loading').hide();
		}
	},
	reload : function () {
		var self = this;
		console.log('reload()', self.current);
		if (self.current.type == 'topic') {
			console.log('current server', self.server);
			self.xhr.abort();
			console.log('xhr.abort()');
			self.settings.server = self.server;
			self.topic(self.current);
		} else {
			var obj = self.current;
			$("#" + obj.id).find('.option').remove();
			$("#" + obj.id + "_list_" + obj.page).remove();
			$("#" + obj.id).find('.large_loading').show();
			self.view({
				id : obj.vid,
				title : obj.title,
				author : obj.author,
				page : obj.page,
				cache : 0
			})
		}
	},
	close : function () {
		if (this.current.type == 'view') {
			this.closeView(this.current.id);
		}
	},
	backTopic : function () {
		$("div.thread").fadeOut();
		$("#tabs").find('li.dropdown').find('a.dropdown-toggle').find('span').html('');
		this.setHeadTitle(this.channel_list[this.channel], true);
		this.setHash('');
		this.setBreadcrumb('remove');
		if ($("#tab_topic").find('tr').length == 1) {
			this.topic();
		}
		$("#tab_topic").slideDown(1500);
		$("#bottom_toolbar").find('button.hide').hide();
		this.current.type = 'topic';
	},
	convertContent : function (content) {
		var c = $('<div>' + content + '</div>');
		var link = [];
		
		//long link
		$(c).find("a").each(function (i, el) {
			var text = '',
			href = '#';
			// find img
			if ($(el).find('img').length != 0) {
				href = $(el).find('img').attr('src');
				$(el).find('img').replaceWith('[IMG]' + $(el).find('img').attr('src') + '[/IMG]');
				text = $(el).text();
				$(el).replaceWith('[LINK_' + i + ']');
			} else {
				href = $.trim($(el).attr('href'));
				text = $(el).text();
				$(el).replaceWith('[LINK_' + i + ']');
			}
			link.push({
				'href' : href,
				'text' : text
			});
		});
		
		content = $(c).html().linkify(' target="_blank"');
		
		if (link.length != 0) {
			$.each(link, function (i, d) {
				var attr = (d.href != '#') ? ' target="_blank"' : ' class="empty"';
				if (!isUndefined(d.href) && d.href.match(/(png|jpg|jpeg|gif)/i)) {
					d.text += '<span class="icon-zoom-in vmiddle img-zoom"></span>';
					console.log('Is image url', d.href);
				} else if (d.href != '#') {
					d.text += '<a href="' + d.href + '" class="link-zoom"><span class="icon-fullscreen "></span></a>'
				}
				var url = '<a href="' + d.href + '"' + attr + '>' + d.text + '</a>';
				content = content.replace('[LINK_' + i + ']', url);
			});
		}
		content = content.replace(/\[IMG\](.*?)\[\/IMG\]/g, '<a href="$1" target="_blank"><img src="$1"></a>');
		content = content.replace(/\[(\w+)[^w]*?](.*?)\[\/\1]/g, '$2'); //remove bbcode tag
		
		content = content.replace('src="//', 'src="http://'); //replace no http img src
		return content;
	},
	convertToBBCode : function (text) {
		//html to bbcode
		text = $.trim(text);
		text = text.replace(/\r?\n/gi, "");
		text = text.replace(/<BR>/gi, "\r");
		text = text.replace(/<BR(.*?)\/>/gi, "\r"); // added (.*?) 5/30/09
		text = text.replace(/<P>/gi, "\r\r");
		text = text.replace(/<P [^>]*>/gi, "\r\r");
		text = text.replace(/<CODE>/gi, "[code]");
		text = text.replace(/<\/CODE>/gi, "[/code]");
		text = text.replace(/<BLOCKQUOTE>/gi, "[quote]");
		text = text.replace(/<\/BLOCKQUOTE>/gi, "[/quote]");
		text = text.replace(/<STRONG>/gi, "[b]");
		text = text.replace(/<\/STRONG>/gi, "[/b]");
		text = text.replace(/<I>/gi, "[i]");
		text = text.replace(/<\/I>/gi, "[/i]");
		text = text.replace(/<U>/gi, "[u]");
		text = text.replace(/<\/U>/gi, "[/u]");
		text = text.replace(/<S>/gi, "[s]");
		text = text.replace(/<\/S>/gi, "[/s]");
		
		//div
		text = text.replace(/<DIV[\s\S]*?>/gi, "");
		text = text.replace(/<\/DIV>/gi, "");
		text = text.replace(/<A[\s\S]*?HREF=\"(.*?)\"[\s\S]*?><IMG[\s\S]*?SRC=([\s\S]*?)"[\s\S]*?><\/A>/gi, "[img]$1[\/img]");
		
		//faces
		text = text.replace(/<IMG[\s\S]*?SRC=([\s\S]*?)\" ALT="([\s\S]*?)\"[\s\S]*?>/gi, "$2");
		text = text.replace(/<IMG[\s\S]*?SRC=([\s\S]*?)\"[\s\S]*?>/gi, "[img]$1[\/img]");
		text = text.replace(/<IMG[\s\S]*?SRC=([\s\S]*?)'[\s\S]*?>/gi, "[img]$1[\/img]");
		text = text.replace(/<A[\s\S]*?HREF=\"(.*?)\"[\s\S]*?>([\s\S]*?)<\/A>/gi, "[url]$1[\/url]");
		
		//size
		text = text.replace(/<span style=\"font\-size: [\s\S]*?;\"><\!\-\-start size\-\->([\s\S]*?)<\!\-\-end size\[([\s\S]*?)\]\-\-><\/span>/gi, "[size=$2]$1[/size=$2]");
		
		//color
		text = text.replace(/<span style="color: ([\s\S]*?);">([\s\S]*?)<\/span>/gi, "[$1]$2[/$1]");
		return text;
	},
	isread : function (id) {
		//check topic is read
		var isread = false;
		if ($.cookie('isread')) {
			var data = JSON.parse($.cookie('isread'));
			$.each(data, function () {
				if (this.id == id) {
					isread = true;
				}
			});
		}
		return isread;
	},
	setread : function (data) {
		var tmp = [];
		var exist = false;
		if ($.cookie('isread')) {
			tmp = JSON.parse($.cookie('isread'));
			$.each(tmp, function () {
				if (this.id == data.id) {
					exist = true;
				}
			});
		}
		if (!exist) {
			tmp.push(data);
			$.cookie('isread', JSON.stringify(tmp), {
				path : '/'
			});
		}
		return true;
	},
	setCache : function (name, value, stringify) {
		if (stringify)
			value = JSON.stringify(value);
		localStorage.setItem(name, value);
		return true;
	},
	getCache : function (name, parse) {
		var value = localStorage.getItem(name);
		if (parse)
			value = JSON.parse(value);
		console.log('getCache()', name, value);
		return value;
	},
	setHeadTitle : function (text, append) {
		console.log('setHeadTitle()', text, append);
		if (typeof(append) != "undefined") {
			text += ' - ' + $("title").data('original');
		}
		if (text == "undefined")
			text = this.channelName(this.settings.channel);
		$("title").html(text);
	},
	channelName : function (channel) {
		console.log('channelName()', channel, this.channel_list[channel]);
		return !isUndefined(this.channel_list[channel]) ? this.channel_list[channel] : '';
	},
	keyboardControl : function () {
		var self = this;
		console.log('keyboardControl()');
		$(document).unbind('keydown').bind('keydown', function (e) {
			console.log(e.which, e.target);
			// F4
			if (e.which === 115) {
				if (self.current.type == 'view') {
					console.log(self.current);
					self.closeView(self.current.id);
				}
			} else if (e.which === 116) {
				e.preventDefault();
				e.originalEvent.keyCode = 0;
				console.log('F5 blocked', new Date().getTime(), self.current);
				if (self.current.type == 'topic') {
					self.topic();
				}
				return false;
			} else if (e.which == 8 && e.target.tagName == "BODY" && self.current.type == 'view') {
				e.preventDefault();
				self.closeView(self.current.id);
				return false;
			} else if (e.which === 82 && e.ctrlKey) {
				e.preventDefault();
				e.originalEvent.keyCode = 0;
				console.log('ctrl + F5 blocked', new Date().getTime(), self.current);
				return false;
			}
		});
	},
	setHash : function (hash) {
		console.log('setHash()', hash);
		this.hash = hash;
		document.location.hash = hash;
	},
	setBreadcrumb : function (type, text) {
		if (type == 'add') {
			if ($("#breadcrumb").find("li:contains('" + text + "')").length == 0)
				$('<li> <span class="divider">/</span> ' + text + '</li>').appendTo($("#breadcrumb"));
		} else {
			if ($("#breadcrumb").find('li').length > 2) {
				$("#breadcrumb").find('li:gt(1)').remove();
			}
		}
	},
	loggedin : function (type, callback) {
		if (isUndefined(type))
			var type = 'all';
		var list = [],
		m_expire = '';
		chrome.cookies.getAll({
			domain : '.hkgolden.com',
			name : 'username'
		}, function (data) {
			$.each(data, function (i, d) {
				var _server = d.domain.replace(/forum([0-9]+).hkgolden.com/, '$1');
				var _expire = new Date(d.expirationDate * 1000).toLocaleString();
				_expire = _expire.substr(0, _expire.indexOf('GMT') - 1);
				if (d.value != '') {
					list.push({
						'server' : _server,
						'expire' : _expire
					});
				}
				if (d.domain == 'm.hkgolden.com') {
					m_expire = _expire;
					list.push({
						'server' : 'm',
						'expire' : _expire
					});
				}
			});
			var loggedin = [];
			if (type == 'all') {
				for (var i = 1; i <= 11; i++) {
					var t = '';
					for (var j in list) {
						if (!isUndefined(list[j]) && list[j].server == i) {
							t = list[j].expire;
							break;
						}
					}
					loggedin.push({
						'server' : i,
						'expire' : t
					});
				}
				loggedin.push({
					'server' : 'm',
					'expire' : m_expire
				})
			} else {
				loggedin = list;
			}
			console.log('loggedin', loggedin);
			if (callback)
				callback(loggedin);
		});
	},
	log : function(){
		if(this.settings.debug){
			console.log("Debug-log",arguments);	
		}
	}
}
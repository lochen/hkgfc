/**
 * Post
 */
function postBox(option){	
	var options={
		mode: 'topic',//topic or view
		id: null,//topic id
		title: '',
		channel: 'BW',
		content: ''
	};
	$.extend(options,option);
	console.log('postBox() options',options);
	if(options.mode=='topic'){
		noty({text:'POST FUNCTION IS NOT AVAILABLE',layout:'center',type:'error',timeout:3000});
		return;
	}
	
	var _header=(options.title!='')?options.title:"Post";
	
	var _body='<table class="table noborder table-normal">';
		if(options.mode=='topic')_body+='<tr><td><input type="text" id="post_topic" name="" value="" placeholder="Topic"></td></tr>';
		_body+='<tr><td><div id="bbcode_bar" class="btn-toolbar"></div></td></tr>';
		_body+='<tr><td><textarea id="post_content" style="width:100%;height:100px;">'+options.content+'</textarea></td></tr>';
		_body+='</table>';
		
	var _text=(options.mode=="topic")?"POST":"REPLY";
	$("#post_box").remove();
	$(buildModal({
		id: 'post_box',
		header: _header,
		body: _body,
		confirm: {text:_text},
		button: [
			{cls:'modal-clear',text: 'Clear'}
		]
	})).modal({keyboard:false});
	
	setTimeout(function(){
		if($("#post_topic").length!=0)$("#post_topic").focus();
		else $("#post_content").focusEnd();
		
		$('<div class="btn-group"><button class="btn photo"><i class="icon-picture"></i></button><button class="btn url"><i class="icon-share"></i></button></div>').prependTo($("#bbcode_bar"));
		
		var normal=$('<div class="btn-group"></div>');
		$('<button class="btn bold"><strong>B</strong></button>').appendTo($(normal));
		$('<button class="btn italic"><i>I</i></button>').appendTo($(normal));
		$('<button class="btn underline"><u>U</u></button>').appendTo($(normal));
		$('<button class="btn strike"><s>S</s></button>').appendTo($(normal));
		
		$(normal).appendTo($("#bbcode_bar"));
		
		var align=$('<div class="btn-group"></div>');
		$('<button class="btn left"><i class="icon-align-left"></i></button>').appendTo($(align));
		$('<button class="btn center"><i class="icon-align-center"></i></button>').appendTo($(align));
		$('<button class="btn right"><i class="icon-align-right"></i></button>').appendTo($(align));
		
		$(align).appendTo($("#bbcode_bar"));
		
		var select=$('<div class="btn-group"></div>');
			$('<a class="btn dropdown-toggle font" data-toggle="dropdown" href="" onclick="return false;"><i class="icon-font"></i></a>').appendTo($(select));
			$('<ul class="dropdown-menu"><li><a href="#" data-value="[SIZE=6]超大[/SIZE]">超大</a></li><li><a href="#" data-value="[SIZE=5]特大[/SIZE]">特大</a></li><li><a href="#" data-value="[SIZE=4]大[/SIZE]">大</a></li><li><a href="#" data-value="[SIZE=3]一般[/SIZE]">一般</a></li><li><a href="#" data-value="[SIZE=2]小[/SIZE]">小</a></li><li><a href="#" data-value="[SIZE=1]特小[/SIZE]">特小</a></li></ul>').appendTo($(select));
		$(select).appendTo($("#bbcode_bar"));
		
		var color=$('<div class="btn-group"></div>');
		$('<a class="btn dropdown-toggle color" data-toggle="dropdown" href="#"><i class="icon-th"></i></a>').appendTo($(color));
		$('<ul class="dropdown-menu" style="height:100px;overflow-y:scroll;"><li><a href="#" data-value="[red]紅色[/red]" style="color: red;">紅色</a></li><li><a href="#" data-value="[green]綠色[/green]" style="color: green;">綠色</a></li><li><a href="#" data-value="[blue]藍色[/blue]" style="color: blue;">藍色</a></li><li><a href="#" data-value="[purple]紫色[/purple]" style="color: purple;">紫色</a></li><li><a href="#" data-value="[violet]紫紅[/violet]" style="color: violet;">紫紅</a></li><li><a href="#" data-value="[brown]棕色[/brown]" style="color: brown;">棕色</a></li><li><a href="#" data-value="[black]黑色[/black]" style="color: black;">黑色</a></li><li><a href="#" data-value="[pink]粉紅[/pink]" style="color: pink;">粉紅</a></li><li><a href="#" data-value="[orange]橙色[/orange]" style="color: orange;">橙色</a></li><li><a href="#" data-value="[gold]金色[/gold]" style="color: gold;">金色</a></li><li><a href="#" data-value="[maroon]深紅[/maroon]" style="color: maroon;">深紅</a></li><li><a href="#" data-value="[teal]淺藍[/teal]" style="color: teal;">淺藍</a></li><li><a href="#" data-value="[navy]深藍[/navy]" style="color: navy;">深藍</a></li><li><a href="#" data-value="[limegreen]淺綠[/limegreen]" style="color: limegreen;">淺綠</a></li></ul>').appendTo($(color));
		$(color).appendTo($("#bbcode_bar"));

		var other=$('<div class="btn-group"></div>');
		$('<button class="btn article"><i class="icon-flag"></i></button>').appendTo($(other));
		$('<button class="btn smile"><i class="icon-smile"></i></button>').click(function(){iconList();}).appendTo($(other));
		
		$('<button class="btn fullscreen"><i class="icon-fullscreen"></i></button>').click(function(){
			if($(this).attr('class').indexOf('active')==-1){
				$(document.body).css({
					'overflow':'hidden',
					'overflow-x':'hidden',
					'overflow-y':'hidden'
				});
				$("#post_box").data('bodyheight',$("#post_box").find('.modal-body').height());
				$("#post_box").data('textheight',$("#post_box").find('textarea').height());
				$("#post_box").css({position:'fixed',top:0,left:0,width:'100%',height:'100%',margin:0});
				var h=$("#post_box").height()-$("#post_box").find('.modal-header').outerHeight()-$("#post_box").find('.modal-footer').outerHeight()-$("#bbcode_bar").outerHeight();
				console.log($("#post_box").height(),h);
				$("#post_box").find('.modal-body').css({height:h,'max-height':'none'});
				var th=h-$("#bbcode_bar").outerHeight()-(15*2)-12;
				$("#post_box").find('textarea').height(th);
			}			
			else{
				$(document.body).css({
					'overflow':'auto',
					'overflow-x':'auto',
					'overflow-y':'auto'
				});
				$("#post_box").css({position:'fixed',top:'50%',left:'50%',width:560,height:'auto',margin:'-250px 0 0 -280px'});
				$("#post_box").find('.modal-body').height($("#post_box").data('bodyheight'));
				$("#post_box").find('textarea').height($("#post_box").data('textheight'));
			}
			$(this).toggleClass('active');
		}).appendTo($(other));
		$(other).appendTo($("#bbcode_bar"));
		
		$("#bbcode_bar").find('a').each(function(i,el){
			$(el).click(function(){
				var t=$("#post_content").caret().text;
				var val=$(el).attr('data-value');
				if(!isUndefined(val)){
				var start=val.indexOf("]");
				var end=val.lastIndexOf("[");
				var text=val.substr((start+1),(end-1-start));
				console.log(text,(end-start),start,end);
					if(t!="")val=val.replace(text,t);
					insertBBCode(val,t);				
				}
			});
		});
		
		$("#bbcode_bar").find('.article').click(function(){	
			$.getJSON('./article.json',function(data){
				console.log('article.json',data);
				$("#article_box").remove();
				var t=$('<table class="table table-bordered"></table>');
				$.each(data,function(i,d){
					var r=$('<tr><td width="80%">'+d.title+'</td><td width="20%" class="operate"></td></tr>').appendTo($(t));
					$('<a href="#" class="btn insert"><i class=" icon-plus-sign"></i></a>').click(function(){
						$("#post_content").val($("#post_content").val()+d.content);
						$("#article_box").modal('hide');
						return false;
					}).appendTo($(r).find('.operate'));
					$('<a href="#" class="btn view"><i class="icon-eye-open"></i></a>').click(function(){
						var preview=$("#article_box").find('.preview');
						$(preview).fadeOut('normal',function(){
						$(preview).find('.text').html('<h3>'+d.title+'</h3>'+d.content.replace(/\n/g,'<br />'));
						$(preview).fadeIn();
						});
						return false;
					}).appendTo($(r).find('.operate'));	
				});
				var html=$(buildModal({id:"article_box",header:'ARTICLE',body:''}));
				
				$(t).appendTo($(html).find('.modal-body'))
				$('<div class="preview"><a class="close" href="#">&times;</a><div class="text"></div></div>').appendTo($(html).find('.modal-body'));
				$(html).modal({keyboard:false});
				setTimeout(function(){
					$("#article_box").find('.preview').find('.close').click(function(){
						$("#article_box").find('.preview').fadeOut();
					});
				},1000);
			});
		});
		
		$("#bbcode_bar").find('.photo, .url').click(function(){
			var _this=$(this);
			var code="";
			console.log($(this));
			if($("#popup_box").length==0){
				var popup_box=$('<div id="popup_box" class="box"></div>');
				$('<input type="text" id="popup_text">').appendTo($(popup_box));
				$('<button id="popup_confirm" class="btn"><i class="icon-ok-sign"></i></button>').appendTo($(popup_box));
				$(popup_box).appendTo($("#bbcode_bar"));
			}
			var top=$(_this).position().top+$(_this).outerHeight()+2;
			var left=$(_this).position().left;
			var v='';
			if($(_this).attr('class').indexOf('photo')!=-1){
				//img
				code="IMG";
				v='圖片網址';
			}
			else{
				//url
				code="URL";
				v='網址';
			}
			$("#popup_box").css({
				padding:10,
				position:'absolute',
				top: top,
				left: left,
				display: 'block'
			})
			$("#popup_text").val(v).select().bind('click',function(){$(this).select();}).blur(function(e){
				console.log('blur',e.target);
				$(document).one('click',function(e){
					console.log('blur doc click',e.target);
					if($(e.target).attr('tagName')!="button")$("#popup_box").hide();
				});
			});
			console.log(code);
			$("#popup_text").unbind('keydown').keydown(function(e){
				if(e.keyCode==13){
					e.preventDefault();
					e.originalEvent.keyCode = 0;
					if($("#popup_text").val()!=""){
						var val=$.trim($("#popup_text").val());
						insertBBCode("["+code+"]"+val+"[/"+code+"]");
					}
					$("#popup_box").hide();
				}
				else if(e.which===86 && e.ctrlKey){
					console.log('ctrl+v',e.which);	
					if($("#popup_text").val()!=""){
						var val=$.trim($("#popup_text").val());
						insertBBCode("["+code+"]"+val+"[/"+code+"]");
					}
					$("#popup_box").hide();		
				}
				else{
					console.log(e.which);
				}
			});
			$("#popup_confirm").unbind('click').click(function(){
				if($("#popup_text").val()!=""){
					var val=$.trim($("#popup_text").val());
					insertBBCode("["+code+"]"+val+"[/"+code+"]");
				}
				$("#popup_box").hide();
			});
		});
		
		$(document.body).unbind('keydown').bind('keydown',function(e){
			if(e.altKey){
				console.log('ctrl+',e.which);
				var cls="";
				switch(e.which){
					case 71:
						cls=".photo";
						break;
					case 76:
						cls=".url";
						break;
					case 66:
						cls=".bold";
						break;
					case 73:
						cls=".bold";
						break;
					case 85:
						cls=".underline";
						break;
					case 83:
						cls=".strike";
						break;
					case 70:
						cls=".font";
						break;
					case 67:
						cls=".color";
						break;
				}
				e.preventDefault();
				e.originalEvent.keyCode = 0;
				if(cls!="")$("#bbcode_bar").find(cls).trigger('click');
			}	
		});
		
		var server='m';
		var loggedin=hkgfc.loggedin('single',function(data){
			var islogged=(data.length!=0)?true:false;
			$.each(data,function(i,d){
				if(i==0)server=d.server;
				if(d.server==hkgfc.server){
					server=d.server;
				}				
			});
			if(islogged==false){
				noty({
					text: 'Please login server',
					layout: 'bottomRight',
					type: 'error',
					timeout: 3000
				});
				console.log('no server is logged in');
				return;
			}
			
			$('<span>Server '+server+'</span>').appendTo($("#post_box").find('.modal-footer').find('.pull-left'));
		});
		
		$("#post_box").find('.modal-confirm').click(function(){
			if($("#post_topic").length!=0 && $("#post_topic").val()==''){
				noty({text:'TOPIC NOT EMPTY',layout:'center',type:'error',timeout:3000});
				return false;
			}
			else if($("#post_content").val()==''){
				noty({text:'CONTENT NOT EMPTY',layout:'center',type:'error',timeout:3000});
				return false;
			}
			$.ajax({
				url: 'http://'+server+'.hkgolden.com/post.aspx?mt=Y&id='+options.id+'&ft=BW',
				success: function(response){
					console.log('viewstate',$(response).find("#__VIEWSTATE").val());
					doPost({
						server: server,
						id: options.id,
						channel: 'BW',
						subject: options.title,
						message: $("#post_content").val(),
						viewstate: $(response).find("#__VIEWSTATE").val()
					});
				},
				error: function(){
					noty({
						text: 'POST error',
						layout: 'bottomRight',
						type: 'error',
						timeout: 3000
					});
				}
			});
			return false;
		});	
		
		$("#post_box").find('.modal-clear').click(function(){
			$("#post_content").val('').focus();
			return false;
		});
	},1000);
}

function iconList(){
	var list=[{'O:-)':'angel.gif'},{'xx(':'dead.gif'},{':)':'smile.gif'},{':o)':'clown.gif'},{':-(':'frown.gif'},{':~(':'cry.gif'},{';-)':'wink.gif'},{':-[':'angry.gif'},{':-]':'devil.gif'},{':D':'biggrin.gif'},{':O':'oh.gif'},{':P':'tongue.gif'},{'^3^':'kiss.gif'},{'?_?':'wonder.gif'},{'#yup#':'agree.gif'},{'#ng#':'donno.gif'},{'#hehe#':'hehe.gif'},{'#love#':'love.gif'},{'#oh#':'surprise.gif'},{'#cn#':'chicken.gif'},{'#ass#':'ass.gif'},{'[sosad]':'sosad.gif'},{'#good#':'good.gif'},{'#hoho#':'hoho.gif'},{'#kill#':'kill.gif'},{'#bye#':'bye.gif'},{'Z_Z':'z.gif'},{'@_@':'@.gif'},{'#adore#':'adore.gif'},{'???':'wonder2.gif'},{'[banghead]':'banghead.gif'},{'[bouncer]':'bouncer.gif'},{'[bouncy]':'bouncy.gif'},{'[censored]':'censored.gif'},{'[flowerface]':'flowerface.gif'},{'[shocking]':'shocking.gif'},{'[photo]':'photo.gif'},{'#fire#':'fire.gif'},{'[yipes]':'yipes.gif'},{'[369]':'369.gif'},{'[bomb]':'bomb.gif'},{'[slick]':'slick.gif'},{'fuck':'fuck.gif'},{'#no#':'no.gif'},{'#kill2#':'kill2.gif'},{'[offtopic]':'offtopic.gif'}];
	if($("#icon_box").length==0){
		var ibox=$('<div id="icon_list"></div>');
		var ul=$('<ul></ul>');
		$.each(list,function(i,d){
			for(var f in d)break;
			$('<li><img src="/faces/'+d[f]+'" alt="'+f+'"></li>').click(function(){
				$("#post_content").val($("#post_content").val()+f);
			}).appendTo($(ul));
		});
		$(ul).appendTo($(ibox));
		var html=$(buildModal({id:"icon_box",header:'ICON',body:''}));
		$(ibox).appendTo($(html).find('.modal-body'))
		$(html).modal({backdrop:false,zIndex:1051});
		setTimeout(function(){
		var h=$("#icon_box").find('.modal-body').height()+($("#post_box").outerHeight()-$("#icon_box").outerHeight());
			console.log(h);
			$("#icon_box").find('.modal-body').height(h);
		},500);
	}
	else{
		$("#icon_box").modal('show');
	}
}

function insertBBCode(code,ntext){
	var start=code.indexOf("]");
	var end=code.lastIndexOf("[");
	var text=code.substr((start+1),(end-1-start));
	console.log('insertBBCode()',code,start,end,ntext);
	var val=$("#post_content").val();
		if(!isUndefined(ntext) && ntext!=""){
			val=val.replace(ntext,code);
			console.log('replace');
		}
		else{
			val=val+code;
		}
	console.log(val);
		$("#post_content").val(val);
		$("#post_content").caret(text);
}

function doPost(data){		
	var d ={
		'ctl00$ContentPlaceHolder1$reply_messagesubject':data.subject,
		'ctl00$ContentPlaceHolder1$messagetext':data.message,
		'messagetype':'Y',
		'fontsize':',,',
		'fontcolor':',,',
		'__EVENTTARGET':'',
		'__EVENTARGUMENT':'',
		'__VIEWSTATE':data.viewstate,
		'ctl00$ContentPlaceHolder1$btn_Submit.x':23,
		'ctl00$ContentPlaceHolder1$btn_Submit.y':17
	};
	var url='http://'+data.server+'.hkgolden.com/post.aspx?mt=Y&id='+data.id+'&ft='+data.channel;
	console.log('doPost',data,url,d);
	$.ajax({
		url: url, type: 'POST', data: d,
		complete: function(xhr,status){
			console.log('complete',xhr,status);
			console.log(xhr.getAllResponseHeaders());
		},
		beforeSend: function(){
			modalLock($("#post_box"),true);
		},
		success: function(response){
			console.log('post response',response);
			modalLock($("#post_box"),false);
			if($(response).find('#ctl00_ContentPlaceHolder1_reply_messagesubject').length==0){
				noty({
					text: 'POST to '+data.title+' success on server '+data.server,
					layout: 'bottomRight',
					type: 'success',
					timeout: 3000
				});
				$("#post_box").modal('hide');
				setTimeout(function(){$("#post_box").remove();},1000);
			}
			else{
				noty({
					text: 'POST fail on server'+data.server,
					layout: 'bottomRight',
					type: 'error',
					timeout: 3000
				});
			}
			
		},
		error: function(){
			noty({
				text: 'POST error on server'+data.server,
				layout: 'bottomRight',
				type: 'error',
				timeout: 3000
			});
		}		
	});
}
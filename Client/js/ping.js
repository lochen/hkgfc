$.ping = function(url,callBack) {
	var requestTime;
	function appendHttpPrefix(url){
		var strReg="^((https|http)?://){1}";
		var re=new RegExp(strReg); 
		return re.test(url)?url:"http://"+url;
	}
	url=appendHttpPrefix(url);
	$.ajax({
		url: url,
		type: "GET",
		dataType: "jsonp",
		timeout: 30000,
		cache: false,
		beforeSend: function(){
			requestTime = new Date().getTime();
		}, 
		complete: function(jqXHR, textStatus){
			var responseTime = new Date().getTime();
			var ackTime = responseTime - requestTime;         
			var status;

			//因為dataType用jsonp格式，但是Server端未針對這部份進行處理，所以執行成功時
			//必定會發生"parsererror"(因為回傳的資料格式不為JavaScript，所以會"parsererror")。
			//此時將需將status手動改回"success"
			if(textStatus == "parsererror"){
				status = "success";
			}
			else{
				status = textStatus;
			}
			callBack({ 
				url: url,
				ackTime: ackTime,
				status: status,
				seconds: (ackTime/1000).toFixed(1)
			});
		},
		error: function (XMLHttpRequest, textStatus, errorThrown){
			callBack({ 
				url: '',
				ackTime: 0,
				status: 'error',
				error: '['+XMLHttpRequest.status+']'+XMLHttpRequest.statusText
			});
		}
	}); 
};
  
function pingForum(url,el,callback){
	$.ping(url,function(pingResult){
		if(pingResult){
			console.log('Ping result', pingResult);
			//pingResult.seconds=(pingResult.ackTime/1000).toFixed(1);
			if(typeof(el)!="undefined"){
				var prefix='';
				if(pingResult.status=='error'){
					$(el).find('span').removeClass().addClass('slow').html(pingResult.error);
					return false;
				}
				var cls='fast';
				if(pingResult.ackTime>10000){
					cls='slow';
				}
				if(pingResult.ackTime>=30000){
					prefix='>';
				}
				$(el).find('span').removeClass().addClass(cls).html("("+prefix+(pingResult.ackTime/1000).toFixed(1) +"s)").appendTo($(el));
			}
			if(callback)callback(pingResult);
			
			return true;
		}
		else{					
			return false;
		}            
	});
}
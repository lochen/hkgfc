/**
 * Score
 * Submit topic score
 */

function doScore(id,tid, score) {
	var server = hkgfc.server;
	var url = "http://forum1.hkgolden.com/MessageFunc.asmx/MarkingThread";
	url = url.replace('forum1', 'forum' + server);
	var data = {
		"MessageID" : tid,
		"choice" : score
	};	
	$.ajax({
		url : url,
		data : JSON.stringify(data),
		type : 'POST',
		contentType : 'application/json',
		success : function (response) {
			var _text = 'Score success',
			_type = 'success';
			console.log('Score response', response);
			if (!isHTML(response.d)) {
				_text = 'Mark score fail<br />' + response.d;
				_type = 'error';
			}
			else{
				var html=$(response.d);
				var nscore=[]
				nscore[0]=$(html).find('span').get(0);
				nscore[1]=$(html).find('span').get(1);
				
				// update display
				$("#"+id).find('.score-btn').get(0).find('span').html(nscore[0]);
				$("#"+id).find('.score-btn').get(1).find('span').html(nscore[1]);
			}
			noty({
				text : _text,
				layout : 'bottomRight',
				type : _type,
				timeout : 3000
			});
		}
	});
}
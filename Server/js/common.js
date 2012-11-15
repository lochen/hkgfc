function isUndefined(val){
	return typeof(val)=="undefined"?true:false;
}

function removeScript(text){
	text=text.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
	text=text.replace(/onload\=\"(.+)\"/gi,"");
	return text;
}

function funcNotReady(){
	noty({
		text: "FUNCTION IS NOT AVAILABLE",
		layout: "center",
		type: "error",
		timeout: 3000
	});
}

function buildModal(data){
	var html='<div id="'+data.id+'" class="modal hide fade">';
	html+='<div class="modal-header">';
	html+='<button type="button" class="close" data-dismiss="modal">×</button>';
	html+='<h3>'+data.header+'</h3>';
	html+='</div>';
	html+='<div class="modal-body">'+data.body+'</div>';
	html+='<div class="modal-footer"><div class="pull-left"><img src="img/loading.gif" class="modal-loading hide"></div>';
	if(data.confirm)html+='<a href="#" class="btn btn-primary modal-confirm">'+data.confirm.text+'</a>';
	if(data.close)html+='<a href="#" class="btn modal-close" data-dismiss="modal">'+data.close.text+'</a>';
	
	if(data.button){
		for(var i in data.button){
			html+='<a href="#" class="btn '+data.button[i].cls+'">'+data.button[i].text+'</a>';
		}
	}
	html+='</div>';
	html+='</div>';
	return html;
}

function modalLock(el,lock){
	if(isUndefined(lock))var lock=true;
	if(lock){
		$(el).find('button.close').hide();
		$(el).find('.modal-loading').show();
		$(el).find('.modal-footer').find('.btn').attr('disabled',true).addClass('disabled');
	}
	else{
		$(el).find('button.close').show();
		$(el).find('.modal-loading').hide();
		$(el).find('.modal-footer').find('.btn').attr('disabled',false).removeClass('disabled');
	}
}

function bytesToSize(bytes){
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return 'n/a';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
}

function dataPagination(data,page,num){

}

function mask(id){
	var mask=$('<div>').css({
	position: 'absolute',
	top:0,
	left:0,
	width:0,
	height:0,
	display:'none'
	}).appendTo($("body"));
	
	$(mask).css({
		top:$("#"+id).position().top,
		left:$("#"+id).position().left,
		width:$("#"+id).outerWidth(),
		height:$("#"+id).outerHeight()
	});
}
//html5 chrome
function copyToClipboard( text ){
	console.log('copyToClipboard',text);
	var copyDiv = document.createElement('div');
	copyDiv.contentEditable = true;
	document.body.appendChild(copyDiv);
	copyDiv.innerHTML = text;
	copyDiv.unselectable = "off";
	copyDiv.focus();
	document.execCommand('SelectAll');
	document.execCommand("Copy", false, null);
	document.body.removeChild(copyDiv);
	return true;
}
			
if(!String.linkify) {
    String.prototype.linkify = function(attr) {

        // http://, https://, ftp://
        var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;

        // www. sans http:// or https://
        var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;

        // Email addresses
        var emailAddressPattern = /\w+@[a-zA-Z_]+?(?:\.[a-zA-Z]{2,6})+/gim;
		if(typeof(attr)=="undefined")var attr='';
        return this
            .replace(urlPattern, '<a href="$&"'+attr+'>$&</a>')
            .replace(pseudoUrlPattern, '$1<a href="http://$2"'+attr+'>$2</a>')
            .replace(emailAddressPattern, '<a href="mailto:$&"'+attr+'>$&</a>');
    };
}

$.fn.selectRange = function(start, end) {
    return this.each(function() {
        if (this.setSelectionRange) {
            this.focus();
            this.setSelectionRange(start, end);
        } else if (this.createTextRange) {
            var range = this.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
    });
};

$.fn.setCursorPosition = function(position){
    if(this.length == 0) return this;
    return $(this).setSelection(position, position);
}

$.fn.setSelection = function(selectionStart, selectionEnd) {
    if(this.length == 0) return this;
    input = this[0];

    if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
    } else if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
    }

    return this;
}

$.fn.focusEnd = function(){
    this.setCursorPosition(this.val().length);
            return this;
}
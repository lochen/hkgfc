/**
 * APP
 */
var APP = function(options){
	this.options = {
		app: [{
			'name':'imgur',
			'onInit': function(obj){},
			'onTopic': function(obj){},
			'onView': function(obj){}
		}]
	};
}

APP.prototype = {
	init: function(){
		console.log('APP.init()');
		var self=this;
		if(self.app!=null){
		
		}
	}

}

APP.prototype.Imgur = {
	init: function(){
		console.log('APP.Imgur.init()');
	}
}
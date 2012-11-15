/*
	'js/jquery.timeago.js',
	'js/jquery.scrollTo.min.js',
	'js/jquery.cookie.js',
	'js/noty/jquery.noty.js',
	'js/noty/layouts/all.min.js',
	'js/noty/themes/default.js',
	'js/jquery.dateFormat.js',
	'js/common.js',
	'js/hkgfc.js',
	'js/editor/wysihtml5-0.3.0.min.js',
	'js/editor/bootstrap-wysihtml5.js',
	'js/hkgfc.js',
	'js/startup.js',
	*/
var jsfile =[
	'js/jquery.timeago.js',
	'js/jquery.scrollTo.min.js',
	'js/jquery.cookie.js',
	'js/noty/jquery.noty.js',
	'js/noty/layouts/all.min.js',
	'js/noty/themes/default.js',
	'js/jquery.dateFormat.js',
	'js/common.js',
	'js/editor/wysihtml5-0.3.0.min.js',
	'js/editor/bootstrap-wysihtml5.js'
];
var loadedjs=[];
function loadjs(jsfile){
	//$.each(jsfile,function(i,f){
	//	var file=[];
		//	file[0]=f;
		//$.chainclude( ['js/common.js','js/noty/jquery.noty.js'] ,function(){console.log('include js',f);}); 
		//console.log(f);
	//});
	//$.chainclude( ['js/jquery.cookie.js','js/jquery.timeago.js']);
	
	/*$.chainclude(
    {
        'js/jquery.cookie.js':function(d){console.log('loaded',d);},
        'js/jquery.timeago.js':function(d){console.log('loaded',d);}
    },
	function(){console.log('end');
	alert($.timeago(new Date('2012-09-05')));
	}	
); 
*/
	/*$.chainclude( ['js/jquery.cookie.js','js/jquery.timeago.js'],
	function(){
		alert('finally');
	});*/
	//console.log($.isArray(jsfile));
}
loadjs(jsfile);


function include(url){

	var js=document.createElement('script');
	js.setAttribute('type','text/javascript');
	js.setAttribute('src',''+url);
	$.browser.msie
		?$.include.IEonload(js,onload,callback)
		:js.onload = function(){onload(callback,url)};
	$('head').get(0).appendChild(js);

}

//$.require();


//requirejs.config({
    //By default load any module IDs from js/lib
    //baseUrl: './'
//});

// Start the main app logic.
//require(['js/jquery.timeago'],function(timeago){
//console.log(timeago);
//});


(function($){
	$.require = function(urls,option){
		
		var options={
			onStart: null,
			onLoad: null,
			onEnd: null
		}
		$.extend(options,option);
		console.log(options);
		
		if(typeof(urls)=="string"){
			urls=[urls];
		}		
		var start=1;
		for(var i in urls){
			//setTimeout(function(){},3000);	
			
			if(typeof(urls[i])=='object'){
				for(var k in urls[i]){
					url=k;
					var cb=urls[i][k];
					break;
				}
				console.log(url);
				$.require.load(url,cb);
			}
			else{
				$.require.load(urls[i],options.onLoad);	
			}	
			
			/*(function myLoop (i) {          
			   setTimeout(function () {   
				  //alert('hello');          //  your code here                
				  console.log('delay',i);
				  if (--i) myLoop(i);      //  decrement i and call myLoop again if i > 0
			   }, 1000)
			})(10); */
			//setTimeout(function () { console.log('hello',start);  start++;}, 3000 * start);			
			//$(function(){console.log(new Date().getTime());}).delay(3000000);
		}
		$.require.onEnd(options.onEnd);
	}
	
	$.extend(
		$.require,
		{
			loaded: [],
			load: function(url,callback){
				//console.log('load',url,callback);				
				var js=document.createElement('script');
				js.setAttribute('type','text/javascript');
				js.setAttribute('src',''+url);
				if(callback){
					$.require.onload(js,url,callback);
				}
				$('head').get(0).appendChild(js);
			},
			onload: function(el,url,callback){
				this.loaded.push(url);
				if($.browser.msie){				
					el.onreadystatechange = function(){
						if(this.readyState=='loaded'||this.readyState=='complete'){
							callback(url);
						}
					}
				}
				else{
					callback(url);
				}
			},
			onStart: function(callback){
				callback();
			},
			onEnd: function(callback){
				console.log('onEnd',this.loaded);
				callback(this.loaded);
			}
		}
	)
})(jQuery);

/*
$.require([
	{'js/jquery.timeago.js':function(url){console.log('loaded',url);}},
	{'js/jquery.cookie.js':function(url){console.log('loaded',url);}}
],{
	onLoad: function(url){
		console.log('onLoad',url);
	},
	onEnd: function(loaded){alert('init complete');}
});*/

$.require(jsfile,{
	onLoad: function(url){
		console.log('onLoad',url);
		$("#loading_status").html("Loading "+url);
	},
	onEnd: function(loaded){
	//alert('init complete');
		$("#loading_status").html("Loading complete");
	}
});


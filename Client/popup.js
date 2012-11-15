setTimeout(function(){
chrome.tabs.query(
{'url':chrome.extension.getURL("index.html")},
function callback(t){
	if(t.length>0){chrome.tabs.update(t[0].id,{selected:true})}
	else{chrome.tabs.create({url:chrome.extension.getURL("index.html")})}
}
);
},500);
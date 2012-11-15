<?php
echo "POST";
echo '<pre>';
print_r($_REQUEST);
echo '</pre>';

?>


<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.2//EN" "http://www.openmobilealliance.org/tech/DTD/xhtml-mobile12.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>
	香港高登 - 全港最受歡迎o既電腦資訊網站
</title></head>
<body>
    <div>
        <div class="MobileTopPanel">
            <div class="MobileTopPanel_Right">
                講到明就噚 [<a href="./logout.aspx">登出</a>]
            </div>
            <a href="./Default.aspx"><img border="0" src="/images/mobile/mobile_logo2.png" /></a>
        </div>
        
<form name="aspnetForm" method="post" action="post.php?mt=Y&amp;id=3940943&amp;ft=BW" id="aspnetForm">
<div>
<input type="hidden" name="__EVENTTARGET" id="__EVENTTARGET" value="" />
<input type="hidden" name="__EVENTARGUMENT" id="__EVENTARGUMENT" value="" />
<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="/wEPDwUKMTc4MjA1ODUwNw9kFgJmD2QWAgIBD2QWAgIBD2QWAgIFD2QWAgIBD2QWAmYPZBYCZg9kFgxmDxYCHgdWaXNpYmxlaBYCAgEPZBYCAgEPEGRkFgBkAgIPFgIfAGhkAgMPFgIfAGhkAgQPEGRkFgBkAgUPEGRkFgBkAggPFgIeCWlubmVyaHRtbAUGI2dvb2QjZBgBBR5fX0NvbnRyb2xzUmVxdWlyZVBvc3RCYWNrS2V5X18WAQUkY3RsMDAkQ29udGVudFBsYWNlSG9sZGVyMSRidG5fU3VibWl0B8S/9xTUqZzIm+5AtYHXaCC0S80=" />
</div>

<script type="text/javascript">
//<![CDATA[
var theForm = document.forms['aspnetForm'];
if (!theForm) {
    theForm = document.aspnetForm;
}
function __doPostBack(eventTarget, eventArgument) {
    if (!theForm.onsubmit || (theForm.onsubmit() != false)) {
        theForm.__EVENTTARGET.value = eventTarget;
        theForm.__EVENTARGUMENT.value = eventArgument;
        theForm.submit();
    }
}
//]]>
</script>


<script src="/WebResource.axd?d=EzQ62a4wMEwAdi9NxIg1p50AYh6QOhgNcMuRUeDPhAhiMJ3aLIJizDvfqFjcAFNaVCylNei6xgKvBEUmPJfjN98NC5Q1&amp;t=634259354654344891" type="text/javascript"></script>


<script src="/ScriptResource.axd?d=PnT8IewmLzass-RaWLJTdX8vz__HAy-O9Cy4D-Iz_2VOmnijNmgkjuhGg5QOfsVfdQ1Eoxy8IylBopDiRQDKFwOYjD_OOeRT6c3IMtYUdrUBOLOQm-RwCe7-k-OqXeaDdbrVg7yFEbKmlqKqHJxqAoEcm6c1&amp;t=fffffffff9d85fa6" type="text/javascript"></script>
<script src="/ScriptResource.axd?d=5brxTImR8op3F9aV-i2ikZVXIaVjF8PaCTSIc9THEJMLxaT-5skb36VPmwbYWl8yNDiAmtuFrhKzgneQnqZ9ejr2xXtTVABpyhEBDxL1vbvfTmX-YDeiOBqo0UBkImKDeTOInnTYlnJO3Exx-94-6C8L-4eMyyXBdHJjHiyshRRrQeZN0&amp;t=fffffffff9d85fa6" type="text/javascript"></script>
<script src="MessageFunc.asmx/js" type="text/javascript"></script>


<div id="ctl00_ContentPlaceHolder1_PostForm">

<script type="text/javascript">
//<![CDATA[
Sys.WebForms.PageRequestManager._initialize('ctl00$ContentPlaceHolder1$ScriptManager1', document.getElementById('aspnetForm'));
Sys.WebForms.PageRequestManager.getInstance()._updateControls([], [], [], 90);
//]]>
</script>

<script type="text/javascript">
var Submitted = false;		
var subject = true;

function moveEnd () {
	var TextArea = $get("ctl00_ContentPlaceHolder1_messagetext");
	if ((typeof TextArea.selectionStart) != 'undefined') {	// Mozilla
		TextArea.focus();
		TextArea.selectionStart = TextArea.selectionEnd = TextArea.value.length;
	} else if (document.selection) {						// IE
		var r = TextArea.createTextRange();
		TextArea.focus();
		//r.moveToElementText(TextArea);
		r.collapse(false);
		r.select();
	}
	
}

function uploadize ( file ) {
	var upimg = document.getElementById("upimg");

	upimg.onclick = function(event){InsertText('[img]http://www.hkgolden.com/'+file+'[/img]',false)};
	upimg.value = "插入已上載之圖片";
	upimg.click();
}

function InsertText( text, splittable ) {
	var TextArea = $get("ctl00_ContentPlaceHolder1_messagetext");
	var l;
	if (TextArea) {
		TextArea.focus();
		if (splittable)
			l = text.split(/,/);
		else
			l = text
			
		if ((typeof TextArea.selectionStart) != 'undefined') {	// Mozilla
			var ti = TextArea.selectionEnd, ts = TextArea.selectionStart;	// Copied from the Glomerulus
			if (l instanceof Array) {
				if (ti != ts) {
					TextArea.value = TextArea.value.substring(0, ts) + l[0] + TextArea.value.substring(ts, ti) + l[2] + TextArea.value.substr(ti);
					TextArea.selectionStart = ts + l[0].length
					TextArea.selectionEnd = ti + l[2].length - 1;
				} else {
					TextArea.value = TextArea.value.substring(0, ts) + l[0] + l[1] + l[2] + TextArea.value.substr(ti);
					TextArea.selectionStart = ti + l[0].length;
					TextArea.selectionEnd = TextArea.selectionStart + l[1].length;
				}
			} else {
				TextArea.value = TextArea.value.substring(0, ts) + l + " " + TextArea.value.substr(ti);
				TextArea.selectionStart = TextArea.selectionEnd = ti + l.length + 1;
			}
		} else if (document.selection) {						// IE
			var r = document.selection.createRange();			// No Glomerulus here ;-(
			if (l instanceof Array) {
				if (r.text != "")
					r.text = l[0] + r.text + l[2];
				else
					r.text = l[0] + l[1] + l[2];
			} else
				r.text = l + " ";
			//r.select();										// Useless
		} else {												// Neither.
			TextArea.value += text + " ";
		}
		TextArea.focus();
	}
	//return false;
}

function InsertList() {
	var lll = "[list]\n[*]第一項[/*]\n[*]第二項[/*]\n[*]第三項[/*]\n[/list]";
	var TextArea = $get("ctl00_ContentPlaceHolder1_messagetext");
	if (TextArea) {
		TextArea.focus();
		if ((typeof TextArea.selectionStart) != 'undefined') {	// Mozilla
			var ti = TextArea.selectionEnd, ts = TextArea.selectionStart;
			if (ti != ts) {
				TextArea.value = TextArea.value.substring(0, ts) + "[*]" + TextArea.value.substring(ts, ti) + "[/*]" + TextArea.value.substr(ti);
				TextArea.selectionEnd = ti + 7;
			} else {
				TextArea.value = TextArea.value.substring(0, ts) + lll + TextArea.value.substr(ti);
				TextArea.selectionEnd = ti + lll.length;
			}
			TextArea.selectionStart = ts;
		} else if (document.selection) {						// IE
			var r = document.selection.createRange();
			if (r.text != "")
				r.text = "[*]" + r.text + "[/*]";
			else
				r.text = lll;
		} else {												// Neither.
			TextArea.value += lll + " ";
		}
		TextArea.focus();
	}
}

function ResizeTextArea()
{
	var TextArea = $get("ctl00_ContentPlaceHolder1_messagetext");
	var sX = document.body.clientWidth;
	if (TextArea)
	{
		var sY = document.body.clientHeight;
		TextArea.cols = (sX / 12) - 5;
		TextArea.rows = (sY / 40);
		if (TextArea.cols < 10)
		{
			TextArea.cols = 50;
		}
		if (TextArea.rows < 2)
		{
			TextArea.rows = 10;
		}
	}
	TextArea = document.all["Sig"];
	if (TextArea)
	{
		TextArea.cols = (sX / 12) - 5;
	}
}

function doPreview() {
    var body = $get("ctl00_ContentPlaceHolder1_messagetext").value;

    body = convert_text(body);
    
	$get('previewArea').innerHTML = "預覽中...";
	MessageFunc.prev_message(body, OnPrevMsgSucceeded, OnPrevMsgFailed);
}

function OnPrevMsgSucceeded( result ) {
    $get('previewArea').innerHTML = unescape(result);
}

function OnPrevMsgFailed( result ) {
    $get('previewArea').innerHTML = "無法預覽 : " + result;
}

function onPostMsgKeyDown(evt) {

  if((evt.keyCode==13) || (evt.which==13))
  {
    if(evt.modifiers) {
      if(evt.modifiers & Event.CONTROL_MASK)
      {
        //Control Enter pressed
        $get('ctl00_ContentPlaceHolder1_btn_Submit').click();
      }
    } else {
      if(evt.ctrlKey)
      {
        //Control Enter pressed
        $get('ctl00_ContentPlaceHolder1_btn_Submit').click();
      }
    }
  }
}

function onPostTopicKeyDown(evt) {

  if((evt.keyCode==13) || (evt.which==13))
  {
    $get('ctl00_ContentPlaceHolder1_messagetext').focus();
    return false;
  }

}

function ToggleHats() {
    if ($get('redhatxmas').style.display == 'none') {
        $get('redhatxmas').style.display = 'block';
        $get('greenhatxmas').style.display = 'none';
    }
    else {
        $get('redhatxmas').style.display = 'none';
        $get('greenhatxmas').style.display = 'block';
    }
}

function BeforePost() {
    $get('ctl00_ContentPlaceHolder1_messagetext').value = convert_text($get('ctl00_ContentPlaceHolder1_messagetext').value);

    if (typeof (tagsData) != 'undefined')
    {
        $get('ctl00_ContentPlaceHolder1_tagsData').value = Sys.Serialization.JavaScriptSerializer.serialize(tagsData);
    }
    
    //if ($get('ctl00_ContentPlaceHolder1_messagesubject') != null) {
    //    $get('ctl00_ContentPlaceHolder1_messagesubject').value = convert_text($get('ctl00_ContentPlaceHolder1_messagesubject').value);
    //}
}

function setCursorAtEnd(sTextboxID) {
    var oTextbox = document.getElementById(sTextboxID);
    if (oTextbox.createTextRange) {
        var r = (oTextbox.createTextRange());
        r.moveStart('character', (oTextbox.value.length));
        r.collapse();
        r.select();
    }
}
</script>

<table id="ctl00_ContentPlaceHolder1_QuickReplyTable" width="99%" style="background-color: #000000; margin-left: auto; margin-right: auto;" cellspacing="0" cellpadding="0">
	<tr>
		<td style="width: 100%;">
        <table width="100%" cellpadding="0" cellspacing="1">
          <tr>
            <td style="width: 100%; background-color: #336699; font-weight: bold; color: white;">
            <input type="hidden" name="messagetype" value="Y" />&nbsp; 回覆 - 輸入以下項目</td>        
          </tr>
          <tr>
            <td style="width: 100%; background-color: #808080;">
            <table width="100%" cellspacing="1" cellpadding="3">
              
              <tr>
                <td style="width: 15%; background-color: #F3F2F1;text-align: right;">名字:</td>
                <td style="width: 85%; background-color: #F3F2F1;" valign="top">&nbsp;講到明就噚</td>
              </tr>
              <tr>
                <td style="width: 15%; background-color: #F3F2F1;text-align: right;">
                    主旨:</td>
                <td style="width: 85%; background-color: #F3F2F1;" valign="top">&nbsp;<input name="ctl00$ContentPlaceHolder1$reply_messagesubject" type="hidden" id="ctl00_ContentPlaceHolder1_reply_messagesubject" value="岩岩收到風,亞視單野接到既投訴已經過萬喇(3)" />&nbsp;&nbsp;
                  &nbsp;&nbsp;
                </td>
              </tr>

              
              
              
              
              <tr>
                <td style="width: 15%; background-color: #F3F2F1;text-align: right;" valign="top">
                    內文:</td>
                <td style="width: 85%; background-color: #F3F2F1; font-family: Times, serif;" valign="top">
                    &nbsp;     
                  <a href="javascript:InsertText('[img],圖片網址,[/img]', true);"><img style="border-width: 0px;" src="/images/image.gif" alt="Image" /></a>
                  <a href="javascript:InsertText('[url],網址,[/url]', true);"><img style="border-width: 0px;" src="/images/url.gif" alt="Link" /></a>
                  <a href="javascript:InsertText('[quote],引文,[/quote]', true);"><img style="border-width: 0px;" src="/images/quote.gif" alt="Quote" /></a>
	              <a href="javascript:InsertList();"><img style="border-width: 0px;" src="/images/bullet.gif" alt="List" /></a>
	              <a href="javascript:InsertText('[left],靠左,[/left]',true);"><img style="border-width: 0px;" src="/images/leftjust.gif" alt="Align Left" /></a>
	              <a href="javascript:InsertText('[center],置中,[/center]',true);"><img style="border-width: 0px;" src="/images/centered.gif" alt="Align Center" /></a>
	              <a href="javascript:InsertText('[right],靠右,[/right]',true);"><img style="border-width: 0px;" src="/images/rightjust.gif" alt="Align Right" /></a>
	              <a href="javascript:InsertText('[b],粗體,[/b]',true);" style="font-weight: bold; text-decoration: none;">
                    B</a>
	              <a href="javascript:InsertText('[i],斜體,[/i]',true);" style="font-style: italic; text-decoration: none;">
                    I </a>
	              <a href="javascript:InsertText('[u],底線,[/u]',true);"><ins>U</ins></a>
	              <a href="javascript:InsertText('[s],刪除線,[/s]',true);" style="text-decoration: none;"><del>
                    S</del></a>
				    &nbsp;
	              <select size="1" name="fontsize" onchange="return InsertText(this.value, true);">
		              <option value=",," selected="selected">字型大小</option>
		              <option value="[size=6],超大,[/size=6]">[size=6]超大[/size=6]</option>
                      <option value="[size=5],特大,[/size=5]">[size=5]特大[/size=5]</option>
                      <option value="[size=4],大,[/size=4]">[size=4]大[/size=4]</option>
                      <option value="[size=3],一般,[/size=3]">[size=3]一般[/size=3]</option>
                      <option value="[size=2],小,[/size=2]">[size=2]小[/size=2]</option>
                      <option value="[size=1],特小,[/size=1]">[size=1]特小[/size=1]</option>
              	</select>
              	<select size="1" name="fontcolor" onchange="return InsertText(this.value, true);">
              		<option value=",," selected="selected">字型顏色</option>
              	    <option value="[red],紅色,[/red]" style="color: red;">[red]紅色[/red]</option>
              	    <option value="[green],綠色,[/green]" style="color: green; background-color: #F1F2F3;">
                        [green]綠色[/green]</option>
              	    <option value="[blue],藍色,[/blue]" style="color: blue;">[blue]藍色[/blue]</option>
              	    <!--<option value="[white],白色,[/white]" style="color: white; background-color: #F1F2F3;">[white]白色[/white]</option>-->
              	    <option value="[purple],紫色,[/purple]" style="color: purple; background-color: #F1F2F3;">
                        [purple]紫色[/purple]</option>
              	    <!--<option value="[yellow],黃色,[/yellow]" style="color: yellow; background-color: #F1F2F3;">[yellow]黃色[/yellow]</option>-->
              	    <option value="[violet],紫紅,[/violet]" style="color: violet;">[violet]紫紅[/violet]</option>
              	    <option value="[brown],棕色,[/brown]" style="color: brown; background-color: #F1F2F3;">
                        [brown]棕色[/brown]</option>
              	    <option value="[black],黑色,[/black]" style="color: black;">[black]黑色[/black]</option>
              	    <option value="[pink],粉紅,[/pink]" style="color: pink; background-color: #F1F2F3;">
                        [pink]粉紅[/pink]</option>
              	    <option value="[orange],橙色,[/orange]" style="color: orange;">[orange]橙色[/orange]</option>
              	    <option value="[gold],金色,[/gold]" style="color: gold; background-color: #F1F2F3;">
                        [gold]金色[/gold]</option>
              	    <option value="[maroon],深紅,[/maroon]" style="color: maroon;">[maroon]深紅[/maroon]</option>
              	    <option value="[teal],淺藍,[/teal]" style="color: teal; background-color: #F1F2F3;">
                        [teal]淺藍[/teal]</option>
              	    <option value="[navy],深藍,[/navy]" style="color: navy;">[navy]深藍[/navy]</option>
              	    <!--<option value="[beige],淺褐,[/beige]" style="color: beige; background-color: #F1F2F3;">[beige]淺褐[/beige]</option>-->
              	    <option value="[limegreen],淺綠,[/limegreen]" style="color: limegreen; background-color: #F1F2F3;">
                        [limegreen]淺綠[/limegreen]</option>
              	</select>
				<br />
				    &nbsp;
                <textarea name="ctl00$ContentPlaceHolder1$messagetext" id="ctl00_ContentPlaceHolder1_messagetext" rows="8" cols="80" style="width: 95%;" onkeydown="javascript: return onPostMsgKeyDown(event);">#good#</textarea><strong style="color: #FF0000;">*</strong>
                <br />
				    &nbsp;
                    <input type="image" name="ctl00$ContentPlaceHolder1$btn_Submit" id="ctl00_ContentPlaceHolder1_btn_Submit" src="/images/btn-submit.gif" alt="I1" onclick="javascript:BeforePost();" style="border-width:0px;" />
			  </td>
            </tr>
            <tr>
               <td style="width: 15%; background-color: #F3F2F1;text-align: right;">插入表情圖示:</td>
               <td style="width: 85%; background-color: #F3F2F1;">
			     <table cellpadding="0" cellspacing="0">
				   <tr>
				     <td colspan="2">
						<a href="javascript:InsertText('O:-)',false)"><img style="border-width: 0px;" src="/faces/angel.gif" width="15" height="23" alt="O:-)" /></a>&nbsp;
						<a href="javascript:InsertText('xx(',false)"><img style="border-width: 0px;" src="/faces/dead.gif" width="15" height="15" alt="xx(" /></a>&nbsp;  
						<a href="javascript:InsertText(':)',false)"><img style="border-width: 0px;" src="/faces/smile.gif" width="15" height="15" alt=":)" /></a>&nbsp;
						<a href="javascript:InsertText(':o)',false)"><img style="border-width: 0px;" src="/faces/clown.gif" width="15" height="15" alt=":o)" /></a>&nbsp;
						<a href="javascript:InsertText(':-(',false)"><img style="border-width: 0px;" src="/faces/frown.gif" width="15" height="15" alt=":-(" /></a>&nbsp;
						<a href="javascript:InsertText(':~(',false)"><img style="border-width: 0px;" src="/faces/cry.gif" alt=":~(" /></a>&nbsp;
						<a href="javascript:InsertText(';-)',false)"><img style="border-width: 0px;" src="/faces/wink.gif" width="15" height="15" alt=";-)" /></a>&nbsp;
						<a href="javascript:InsertText(':-[',false)"><img style="border-width: 0px;" src="/faces/angry.gif" width="15" height="15" alt=":-[" /></a>&nbsp;
						<a href="javascript:InsertText(':-]',false)"><img style="border-width: 0px;" src="/faces/devil.gif" width="15" height="15" alt=":-]" /></a>&nbsp;
						<a href="javascript:InsertText(':D',false)"><img style="border-width: 0px;" src="/faces/biggrin.gif" width="15" height="15" alt=":D" /></a>&nbsp;
						<a href="javascript:InsertText(':O',false)"><img style="border-width: 0px;" src="/faces/oh.gif" width="15" height="15" alt=":O" /></a>&nbsp;
						<a href="javascript:InsertText(':P',false)"><img style="border-width: 0px;" src="/faces/tongue.gif" width="15" height="15" alt=":P" /></a>&nbsp;
						<a href="javascript:InsertText('^3^',false)"><img style="border-width: 0px;" src="/faces/kiss.gif" alt="^3^" /></a>&nbsp;
						<a href="javascript:InsertText('?_?',false)"><img style="border-width: 0px;" src="/faces/wonder.gif" alt="?_?" /></a>&nbsp;
						<a href="javascript:InsertText('#yup#',false)"><img style="border-width: 0px;" src="/faces/agree.gif" width="26" height="28" alt="#yup#" /></a>&nbsp;
						<a href="javascript:InsertText('#ng#',false)"><img style="border-width: 0px;" src="/faces/donno.gif" width="16" height="16" alt="#ng#" /></a>&nbsp;
						<a href="javascript:InsertText('#hehe#',false)"><img style="border-width: 0px;" src="/faces/hehe.gif" width="15" height="15" alt="#hehe#" /></a>&nbsp;
						<a href="javascript:InsertText('#love#',false)"><img style="border-width: 0px;" src="/faces/love.gif" width="15" height="15" alt="#love#" /></a>&nbsp;
						<a href="javascript:InsertText('#oh#',false)"><img style="border-width: 0px;" src="/faces/surprise.gif" width="15" height="15" alt="#oh#" /></a>&nbsp;
						<a href="javascript:InsertText('#cn#',false)"><img style="border-width: 0px;" src="/faces/chicken.gif" width="18" height="13" alt="#cn#" /></a>&nbsp;
					 </td>
				   </tr>
				   <tr>
				     <td>
						<a href="javascript:InsertText('#ass#',false)"><img style="border-width: 0px;" src="/faces/ass.gif" alt="#ass#" /></a>&nbsp;
						<a href="javascript:InsertText('[sosad]',false)"><img style="border-width: 0px;" src="/faces/sosad.gif" alt="[sosad]" /></a>&nbsp;
						<a href="javascript:InsertText('#good#',false)"><img style="border-width: 0px;" src="/faces/good.gif" alt="#good#" /></a>&nbsp;
						<a href="javascript:InsertText('#hoho#',false)"><img style="border-width: 0px;" src="/faces/hoho.gif" alt="#hoho#" /></a>&nbsp;
						<a href="javascript:InsertText('#kill#',false)"><img style="border-width: 0px;" src="/faces/kill.gif" alt="#kill#" /></a>&nbsp;
						<a href="javascript:InsertText('#bye#',false)"><img style="border-width: 0px;" src="/faces/bye.gif" alt="#bye#" /></a>&nbsp;
						<a href="javascript:InsertText('Z_Z',false)"><img style="border-width: 0px;" src="/faces/z.gif" alt="Z_Z" /></a>&nbsp;
						<a href="javascript:InsertText('@_@',false)"><img style="border-width: 0px;" src="/faces/@.gif" alt="@_@" /></a>&nbsp;
						<a href="javascript:InsertText('#adore#',false)"><img style="border-width: 0px;" src="/faces/adore.gif" alt="#adore#" /></a>&nbsp;
						<a href="javascript:InsertText('???',false)"><img style="border-width: 0px;" src="/faces/wonder2.gif" alt="???" /></a>&nbsp;
						<a href="javascript:InsertText('[banghead]',false)"><img style="border-width: 0px;" src="/faces/banghead.gif" alt="[banghead]" /></a>&nbsp;
						<a href="javascript:InsertText('[bouncer]',false)"><img style="border-width: 0px;" src="/faces/bouncer.gif" alt="[bouncer]" /></a>&nbsp;
						<a href="javascript:InsertText('[bouncy]',false)"><img style="border-width: 0px;" src="/faces/bouncy.gif" alt="[bouncy]" /></a>&nbsp;
					 </td>
					 <td rowspan="2" valign="bottom">
						<a href="javascript:InsertText('[offtopic]',false)"><img style="border-width: 0px;" src="/faces/offtopic.gif" alt="[offtopic]" /></a>&nbsp;
					 </td>
				   </tr>
				   <tr>
				     <td>
						<a href="javascript:InsertText('[censored]',false)"><img style="border-width: 0px;" src="/faces/censored.gif" alt="[censored]" /></a>&nbsp;
						<a href="javascript:InsertText('[flowerface]',false)"><img style="border-width: 0px;" src="/faces/flowerface.gif" alt="[flowerface]" /></a>&nbsp;
						<a href="javascript:InsertText('[shocking]',false)"><img style="border-width: 0px;" src="/faces/shocking.gif" alt="[shocking]" /></a>&nbsp;
						<a href="javascript:InsertText('[photo]',false)"><img style="border-width: 0px;" src="/faces/photo.gif" alt="[photo]" /></a>&nbsp;
						<a href="javascript:InsertText('#fire#',false)"><img style="border-width: 0px;" src="/faces/fire.gif" alt="#fire#" /></a>&nbsp;
						<a href="javascript:InsertText('[yipes]',false)"><img style="border-width: 0px;" src="/faces/yipes.gif" alt="[yipes]" /></a>&nbsp;
						<a href="javascript:InsertText('[369]',false)"><img style="border-width: 0px;" src="/faces/369.gif" alt="[369]" /></a>&nbsp;
						<a href="javascript:InsertText('[bomb]',false)"><img style="border-width: 0px;" src="/faces/bomb.gif" alt="[bomb]" /></a>&nbsp;
						<a href="javascript:InsertText('[slick]',false)"><img style="border-width: 0px;" src="/faces/slick.gif" alt="[slick]" /></a>&nbsp;
						<a href="javascript:InsertText('fuck',false)"><img style="border-width: 0px;" src="/faces/fuck.gif" alt="fuck" /></a>&nbsp;
						<a href="javascript:InsertText('#no#',false)"><img style="border-width: 0px;" src="/faces/no.gif" alt="#no#" /></a>&nbsp;
						<a href="javascript:InsertText('#kill2#',false)"><img style="border-width: 0px;" src="/faces/kill2.gif" alt="#kill2#" /></a>&nbsp;
					 </td>
				   </tr>
				 </table>
               </td>
             </tr>
             
           </table>
         </td>
       </tr>
     </table>
      </td>
	</tr>
</table>

</div>


<script type="text/javascript">
//<![CDATA[
Sys.Application.initialize();
//]]>
</script>
</form>

<script type="text/javascript">
    setCursorAtEnd('ctl00_ContentPlaceHolder1_messagetext');
</script>

    </div>

<div class="FooterPanel">
        現上線用戶數量: 5,849/135,372<br />
        &#169 2012 HKGolden.com. All Rights Reserved.<br />
        <a class="terms_link" href="/terms.html">Terms and Conditions</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;info@hkgolden.com
</div>

<script type="text/javascript">
    var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
    document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
</script>
<script type="text/javascript">
    try {
        var pageTracker = _gat._getTracker("UA-5029867-6");
        pageTracker._trackPageview();
    } catch (err) { }
</script>
</body>
</html>

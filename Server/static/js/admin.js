/**
 * Admin
 */

//domain
$(function(){
	$("#account_list").find('.delete').click(function(){
		var el=$(this);
		$.ajax({
			url: $(el).attr('href'),
			success: function(response){
				var data=$.parseJSON(response);
				if(data.status==200){
				$(el).parents('tr').fadeOut('normal',function(){
					$(el).parents('tr').remove();
				});
				}
				else{
					alert(data.error);
				}
			}
		});
		return false;
	});
	
	$(".chkall").click(function(){
		var checked=true;
		if($(this).is(":checked")==false)checked=false;
		console.log($(this).is(":checked"));
		$(this).parents('form').find('input[type=checkbox]').attr('checked',checked);	
	});
	
	$("form.confirm").submit(function(){
		return confirm("Confirm operate?");
	});
	
	$(".auto").each(function(i,el){
		if($(el).attr('data-time')!=""){
			setTimeout(function(){
				console.log(($(el).attr('data-time')*1000));
				$(el).fadeOut();
			},($(el).attr('data-time')*1000));
		}
	});
});
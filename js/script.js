$(document).ready(function(){

function pop_form_title(section){
	return 'Edit '+section.parent().find('.section_title').text();
}

function pop_form(section){
	var form_id = 'form_for_'+section.parent().attr('id');

	var edit_fields = section.parent().find('.field');

	var edit_title = 'Edit '+section.parent().find('.section_title').text();

	var edit_form = '<form id="'+form_id+'" class="form-horizontal" >';

	if(edit_title == 'Edit Causes' || edit_title == 'Edit Cares about'){
		edit_form += '<ul>';
	}

	edit_fields.each(function(){ //build the form for this section
		
		var current = $(this);
		var current_id = current.attr('id');
		if(current_id){
		var current_label = current_id.replace(/_/g, " ");
		}
		if(current.hasClass('textarea')){ //longer text area
			edit_form += '<textarea id='+current_id+' rows="5" class="input-xxlarge">'+current.text()+'</textarea>';
		} else if (current.hasClass('cause_field')) 
		{ 				
				var removable = current.clone();
				removable.append('<a href="#" class="remove"><i class="icon-trash"></i> Remove</a>');
				
				edit_form += '<li>'+removable.html()+'</li>';
		} else if (current.hasClass('social_media')){
			var url = current.attr("href");
			edit_form += '<div class="control-group"><label class="control-label" for="'+current_id+'">'+current.text()+'</label><div class="controls"><input id='+current_id+' placeholder="'+url+'" /></div></div>';

		} else if (current.hasClass('email')){
			var url = current.attr("href");
			edit_form += '<div class="control-group"><label class="control-label" for="'+current_id+'">Email</label><div class="controls"><input id='+current_id+' type="email" placeholder="'+url+'" /></div></div>';

		}
		
		
		 else {
		 //regular text input
			edit_form += '<div class="control-group"><label class="control-label" for="'+current_id+'">'+current_label+'</label><div class="controls"><input id='+current_id+' placeholder="'+current.text()+'" /></div></div>';
		}
	});
		
	
	if(form_id == 'form_for_causes' || form_id == 'form_for_cares_about'){
		
		edit_form += '</ul><p><a href="#" class="add_cause"><i class="icon-plus"></i> Add Cause</a></p>';
	}
	

	edit_form += '<div class="footer pull-right"><a href="#" class="btn btn-small close_form">Cancel</a><a href="#" class="btn btn-small btn-primary">Save</a></div>';
	edit_form += '</form>';
	return edit_form;
}


$('body').on('click', '.add_cause', function(e){
	e.preventDefault();
	$(this).parent().before('<input id="new_cause" class="new_cause_input" placeholder="Add Another Cause" />');
});

$('body').on('focusout', '.new_cause_input', function(){
		if($(this).val().length > 0){
			$(this).prev('ul').append('<li style="display:none"><a href="#" class="removable" >'+$(this).val()+'</a><a href="#" class="remove"><i class="icon-trash"></i> Remove</a></li>');
			
			$(this).fadeOut('slow', function(){
			$(this).prev('ul').find('li:hidden').fadeIn('slow');
			
			$(this).remove();
		});
		} else {
		$(this).fadeOut('slow', function(){
			$(this).remove();
		});
		
		}
});

$('body').on('click', '.remove', function(e){
	e.preventDefault();
	$(this).parent('li').fadeOut('slow', function(){
		$(this).remove();
	});

});



$('.editable').click(function(e){
	e.preventDefault();
});

$('.editable').each(function(){
	$(this).popover({
		html		: 'true',
		placement	: 'bottom',
		title		:  pop_form_title($(this)),
		content		:  pop_form($(this)),
		container	:  $(this).parent('div'),
	});
	
	});

$('a[href=#report_bug]').click(function(e){
	e.preventDefault();
});
	
$('a[href=#report_bug]').each(function(){
	var report_bug = '<form id="report_bug"><textarea id="bug_comment" rows="4">Please provide a brief description of your problem...</textarea></form><div class="footer pull-right"><a href="#" class="btn btn-small close_form">Cancel</a><a href="#" class="btn btn-small btn-red">Report</a></div>';
	$(this).popover({
		html		: 'true',
		placement	: 'bottom',
		title		:  'Report Bug',
		content		:  report_bug
		});
		
});

$('body').on('click', '.close_form', function(e){
	e.preventDefault();
	$(this).parents('.popover').fadeOut();
});








$("#call_now, #add_call").click(function(e){
	e.preventDefault();
	$("#call_now").slideUp();
	if(!$("#call_progress").hasClass('active')){
	$("#call_progress").addClass('active');
	$("#add_call").addClass("disabled");
	$("#call_progress").slideDown(function(){
		
		$('#duration_time').stopwatch({format: '{HH}:{MM}:{ss}'}).stopwatch('start');
	});
	}
});


$("#notes_button").click(function(e){
	e.preventDefault();
	if($(this).hasClass("hide_notes")){
		var button = $(this);
		button.removeClass("hide_notes");
		$("#call_expanded").slideUp('slow', function(){
		button.find("span").animate({opacity:0},function(){
			$(this).text("Show Notes").animate({opacity:1});
			return false;
		});
		});
		
	} else {
		
		$(this).addClass("hide_notes");
		$(this).find("span").animate({opacity:0},function(){
			$(this).text("Hide Notes").animate({opacity:1}, function() {
				$("#call_expanded").slideDown('slow');
			}); 
			return false;
		});
		
	} 

});

$("#cancel").click(function(e){
	e.preventDefault();
	$("#call_expanded").slideUp();
	$("#notes_button").addClass("hide_notes");
									$("#notes_button").find("span").animate({opacity:0},function(){
											$(this).text("Show Notes").animate({opacity:1}, function() {
												$("#call_expanded").slideUp('slow');
											});
											return false;
								});  
	$('#duration_time').stopwatch().stopwatch('stop');
	$('#duration_time').stopwatch().stopwatch('reset');
	$('#duration_time').text('00:00:00');
	$("#call_progress").removeClass('active');
	$("#add_call").removeClass('disabled');
	$("#call_progress").slideUp();
	$("#call_now").slideDown();
});

$("#end_continue").click(function(e){
					e.preventDefault();
					if($(this).hasClass("active_continue")){
						
						$(this).removeClass("active_continue");
						$(this).find("span").animate({opacity:0},function(){
								$(this).text("End").animate({opacity:1});  
								
								$('#duration_time').stopwatch().stopwatch('start');
								return false;
								});
					} else {
						$(this).addClass("active_continue");
						
					$(this).find("span").animate({opacity:0},function(){
								
								$(this).text("Continue").animate({opacity:1}, function() {
									$("#notes_button").addClass("hide_notes");
									$("#notes_button").find("span").animate({opacity:0},function(){
											$(this).text("Hide Notes").animate({opacity:1}, function() {
												$("#call_expanded").slideDown('slow');
											});
											return false;
								});  
								});
								$('#duration_time').stopwatch().stopwatch('stop');
								
					});
				}
				
});


});
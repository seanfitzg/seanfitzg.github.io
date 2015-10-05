$(function() {
	$('.day').click(function (ev) {		
		$('.day').removeClass('active');
		$(ev.target).addClass('active');		
	});
	
	$('.location').click(function (ev) {
		$('.location').removeClass('active');
		$(ev.target).addClass('active');		
	});	
	
});
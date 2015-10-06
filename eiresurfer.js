$(function() {
	$('.day').click(function (ev) {		
		$('.day').removeClass('active');
		$(ev.target).addClass('active');					
	});
	
	$('.location').click(function (ev) {
		$('.location').removeClass('active');
		$(ev.target).addClass('active');		
	});	
	
	function getData (model, daysFrom) {
		return [
			{
				name: "Wave Height",
				image: "http://polar.ncep.noaa.gov/waves/WEB/multi_1.latest_run/plots/NE_atlantic.tp.f099h.png"
			},
			{
				name: "Peak Period",
				image: "http://polar.ncep.noaa.gov/waves/WEB/multi_1.latest_run/plots/NE_atlantic.tp.f099h.png"
			}
		];
	}

});
$(document).ready(function() {
		
	$(".phone").inputmask("+7 (999) 999-99-99");
	
	$.extend($.inputmask.defaults.aliases, {
		'non-negative-integer': {
			regex: {
				number: function (groupSeparator, groupSize) { return new RegExp("^(\\d*)$"); }
			},
			alias: "decimal"
		}
	});

});
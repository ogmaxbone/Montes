(function ($) {
	"use strict";

    jQuery(document).ready(function($){

		$(".menu-trigger").click(function(){
			$(".silde-menu").toggleClass("active");
		});
	
	

		
		// Nice_select Plugin Active Start
		$(document).ready(function() {
			$('select').niceSelect();
		});
		// Nice_select Plugin Active End


	
		

	});



    jQuery(window).load(function(){

		$(".kit-table-warp").niceScroll({
			cursorcolor:"#675D6D",
			cursorwidth:"10px",
			background:"#403C3C",
			cursorborder:"0px solid",
			cursorborderradius:20,
		  
		});
		  	
    });


}(jQuery));	
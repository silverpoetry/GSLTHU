
function changesize() {
 
	var circle = $("#domover");

	var width = parseInt(window.innerWidth);
	var height = parseInt(window.innerHeight);


		

		$("#divzhezhao").mousedown(function () {
			$(".divcircle").css("opacity", "0.7");
		}).mouseup(function () {
		    $(".divcircle").css("opacity", "1");
		  
		    $("#tip").fadeOut();
		    $("#menu").toggle("slow");
		   
		    
		});



	
}

	//circle.css("top", (height - px2int(circlewidth)) / 2 + "px").css("left", (width - px2int(circlewidth)) / 2 + "px");
	//alert(width + "," + circlewidth);
	//alert((width - px2int(circlewidth)) / 2 + "px");

$(function () {
	changesize();

});
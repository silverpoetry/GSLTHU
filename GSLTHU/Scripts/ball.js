function changesize() {
   
    var circle = $("#domover");

    var width = parseInt(window.innerWidth);
    var height = parseInt(window.innerHeight);

    if (width < height) {
        //手机浏览器
        circle.css("width", "20%");

        var circlewidth = circle.width();

        circle.css('height', circlewidth);
        //circle.css("top", "40%").css("left", "40%");

        ismoblie = true;
       
            $("#domover").css({ top: "10px", left: "10px" });
            $(".divcircle").css({ opacity: '0.3' });
           
          
           
            $("#divzhezhao").on("touchstart",function () {
                $(".divcircle").css("opacity", "0.8");
            }).on("touchend",function () {
                $(".divcircle").css("opacity", "0.3");
            });

            $("#divzhezhao").mousedown(function () {
                $(".divcircle").css("opacity", "0.8");
            }).mouseup(function () {
                $(".divcircle").css("opacity", "0.3");
            });

           

        //circle.css("width", px2int(window.innerWidth) * 0.3 + "px").css("height", px2int(window.innerWidth) * 0.3+ "px");
        //var circlewidth = circle.css("width");


    } else {
        $(".divcircle").css({ opacity: '0.3' });
        circle.css("width", "100px").css("height", "100px");
        ismoblie = false;
        $("#domover").css({ top: "10px", left: "10px" });

        $("#divzhezhao").mousedown( function () {
            $(".divcircle").css("opacity", "0.8");
        }).mouseup( function () {
            $(".divcircle").css("opacity", "0.3");
        });
      
    }
    

    $("#divCircleContent").css("line-height", $("#divCircleContent").height() + "px").css("font-size", $("#divcircle").height() * 0.7 + "px");

    $("#domover").css("visibility", "visible");
    //circle.css("top", (height - px2int(circlewidth)) / 2 + "px").css("left", (width - px2int(circlewidth)) / 2 + "px");
    //alert(width + "," + circlewidth);
    //alert((width - px2int(circlewidth)) / 2 + "px");
}
$(function () {
    changesize();
});
var ismoblie = false;
function px2int(px) {
    px = px.toString();
    var reg = /\d+/;
    var num = parseInt(px.match(reg)[0]);
    //   alert(num);
    return num;

}
function changesize() {
    var circle = $("#domover");
    $("#domover").css("visibility", "visible");
    var width = parseInt(window.innerWidth);
    var height = parseInt(window.innerHeight);

    if (width < height) {
        //手机浏览器
        circle.css("width", "20%");
        
        var circlewidth = circle.width();

        circle.css('height', circlewidth);
        circle.css("top", "40%").css("left", "40%");

        ismoblie = true;

        //circle.css("width", px2int(window.innerWidth) * 0.3 + "px").css("height", px2int(window.innerWidth) * 0.3+ "px");
        //var circlewidth = circle.css("width");


    } else {
        circle.css("width", "100px").css("height", "100px").css("top", height/2-50+"px").css("left", width/2-50+"px");
        ismoblie = false;
    }
  
   

    //circle.css("top", (height - px2int(circlewidth)) / 2 + "px").css("left", (width - px2int(circlewidth)) / 2 + "px");
    //alert(width + "," + circlewidth);
    //alert((width - px2int(circlewidth)) / 2 + "px");
}

$(function () {


    changesize();
    $("#divCircleContent").css("line-height", $("#divCircleContent").height()+"px").css("font-size",$("#divcircle").height()*0.7+"px");
    clocknum = setInterval(function () {
        if (ismoblie) {
            $("#domover").animate({ top: "10px", left: "10px" }, 2000);
            $(".divcircle").animate({ opacity: '0.3' }, 2000);
            $("#back").animate({ opacity: '0' }, 2000, function () {
                $("#back").remove();
            });
          
           
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
        } else {

            $("#domover").animate({ top: "10px", left: "10px" }, 2000);
            $("#back").animate({ opacity: '0' }, 2000, function () {
                $("#back").remove();
            });
            $("#divzhezhao").mousedown(function () {
                $(".divcircle").css("opacity", "0.8");
            }).mouseup(function () {
                $(".divcircle").css("opacity", "1");
            });
        }
        window.clearInterval(clocknum);
        //$(".divback").addClass("mover");
    }, 5000);

});
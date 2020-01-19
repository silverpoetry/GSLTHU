
//处理菜单的点击
function addMenuClick() {
    $(".bluebutton").mousedown(function () {
        //调整透明度
        $(this).css("opacity", "0.5");
    }).mouseup(function () {
        $(this).css("opacity", "0.7");

        //计算器
        if ($(this).prop("id") == "计算器") {

            $("#jinzhi").fadeOut("fast", function () {
                $("#fangcheng").fadeOut("fast", function () {
                    $("#calc").fadeIn("fast");

                });
            });
            //改变背景颜色 红色主题
            outputcolor("#880066", "#FF8800");

        }

        //方程
        if ($(this).prop("id") == "方程") {
            $("#jinzhi").fadeOut("fast", function () {
                $("#calc").fadeOut("fast", function () {
                    $("#fangcheng").fadeIn("fast");
                    fangnchengresize();
                });
            });
            //蓝色主题
            outputcolor("#007cff", "#14c004");
        }

        //进制转换 
        if ($(this).prop("id") == "进制转换") {
            outputcolor("#007cff", "#14c004");

            $("#fangcheng").fadeOut("fast", function () {
                $("#calc").fadeOut("fast", function () {
                    $("#jinzhi").fadeIn("fast");
                    jinzhiresize();
                });
            });
            //绿色主题
            outputcolor("#108924", "#b8e024");
        }
    });
}
$(function () {
    //处理菜单的点击
    addMenuClick();
});

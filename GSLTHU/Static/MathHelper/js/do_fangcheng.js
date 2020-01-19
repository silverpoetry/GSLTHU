
//将分数转换为HTML代码
function Fangcheng_getFenhtml(fenzi, fenmu) {
    var tems;
   if(fenzi<fenmu) {
       tems = "<div style='display:inline-block'>  <span style='color:purple'>" + fenzi + "</span> <br/>       <span style='border-top:2px solid purple;color:purple'>" + fenmu + "</span>  </div>"

   } else  {
       tems = "<div style='display:inline-block'>  <span style='border-bottom:2px solid purple;color:purple'>" + fenzi + "</span> <br/>       <span style='color:purple'>" + fenmu + "</span>  </div>"

   }
    return tems;
}


//带有根号的转换 一元二次方程专用
function Fangcheng_getFenhtml2(fenzi, fenmu) {
    var tems;
        tems = "<div style='display:inline-block'>  <span style='border-bottom:2px solid purple;color:purple'>" + fenzi + "</span> <br/>       <span style='color:purple'>" + fenmu + "</span>  </div>"

    
    return tems;
}



//控制切换方程种类菜单
//a: 11->一元一次方程 12->一元二次方程吧 21->二元一次方程
function toogle(a) {
    switch (a) {
        case 11:
            $("#f12").fadeOut("fast", function () {
                $("#f21").fadeOut("fast", function () {
                    $("#f11").fadeIn("fast");

                });
            });
            break;
        case 12:
            $("#f11").fadeOut("fast", function () {
                $("#f21").fadeOut("fast", function () {
                    $("#f12").fadeIn("fast");

                });
            });
            break;
        case 21:
            $("#f12").fadeOut("fast", function () {
                $("#f11").fadeOut("fast", function () {
                    $("#f21").fadeIn("fast");

                });
            });
            break;



    }
}

//获取制定文本框的内容
//id:文本框的id
function getv(id) {
    return $("#" + id).val();

}

//方程解算核心
//a: 
//11->一元一次方程 
//12->一元二次方程
//21->二元一次方程
function solve(a) {
 
    switch (a) {
        case 11:
        
            var a11 = getv("a11");
            var b11 = getv("b11");
            var res = solve11(a11, b11);
       
            if (res.Fenmu == 1) {
               
                $("#solve").html("此方程解为：<br/>x = <span style='color:purple'>" + res.Fenzi + "</span>");
                $("#solve").show();
            } else {
                $("#solve").html("此方程解为：<br/>x =  "+Fangcheng_getFenhtml(res.Fenzi,res.Fenmu));
                $("#solve").show();
            }
            break;
        case 21:
            var a21 = getv("a21");
            var b21 = getv("b21");
            var c21 = getv("c21");
            var d = getv("d");
            var e = getv("e");
            var f = getv("f");
            var res = solve21(a21, b21, c21, d, e, f);
            if (res[0].Fenmu == 1) {
                $("#solve").html("此方程组解为：<br/>x = <span style='color:purple'>" + res[0].Fenzi + "</span>");

            } else {
                $("#solve").html("此方程组解为：<br/>x = "+Fangcheng_getFenhtml(res[0].Fenzi,res[0].Fenmu));

            }
            if (res[1].Fenmu == 1) {
                $("#solve").html($("#solve").html() + " , y = <span style='color:purple'>" + res[1].Fenzi + "</span>");
                $("#solve").show();
            } else {
                $("#solve").html($("#solve").html() + " , y = " + Fangcheng_getFenhtml(res[1].Fenzi, res[1].Fenmu));
                $("#solve").show();
            }
            break;
        case 12:
            var a12 = getv("a12");
            var b12 = getv("b12");
            var c12 = getv("c12");
            var res = solve12(a12, b12, c12);
            if (res == -1) {
                $("#solve").html("△<0,无解！");
                return;

            }

            if (res[0].Fenmu == 1) $("#solve").html("此方程解为：<br/>x<sub>1</sub> = <span style='color:purple'>" + res[0].Fenzi + "</span>&nbsp;");
            else $("#solve").html("此方程解为：<br/>x<sub>1</sub> = "+ Fangcheng_getFenhtml(res[0].Fenzi, res[0].Fenmu));

            if (res[1].Fenmu == 1) {
                $("#solve").html($("#solve").html() + "x<sub>2</sub> = <span style='color:purple'>" + res[1].Fenzi + "</span>");
                $("#solve").show();
            } else {
                $("#solve").html($("#solve").html() + "x<sub>2</sub> = "+ Fangcheng_getFenhtml(res[1].Fenzi, res[1].Fenmu));
                $("#solve").show();
            }
            break;

        default:

    }



}

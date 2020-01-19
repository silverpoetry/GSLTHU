

//-------------------------------------------
//工具类函数
//-------------------------------------------

//向解说框发送文字
function sendtext(str) {
    $('#ress').html(str);
    $('#ress').show();
}

//向表达式输入框添加文字
function addtext(str) {
    $('#exp').val($('#exp').val() + str);
}

//向表达式输入框发送文字
function sendexp(str) {
    $('#exp').val(str);
}

//获取显示分数的html
function getFenhtml(fenzi, fenmu) {
    var tems;
    if (fenzi > fenmu) {
        tems = "<div>  <span style='border-bottom:2px solid purple;color:purple'>" + fenzi + "</span> <br/>       <span style='color:purple'>" + fenmu + "</span>  </div>"

    } else {
        tems = "<div>  <span style='color:purple'>" + fenzi + "</span> <br/>       <span style='border-top:2px solid purple;color:purple'>" + fenmu + "</span>  </div>"

    }
    return tems;    
}



//-------------------------------------------
//桌面元素的点击事件
//-------------------------------------------



//计算按钮的点击事件
function buttonclick() {
    try {

        var a = str2Value($("#exp").val());
        if (a.constructor == Fenshu) {
            if (a.Fenmu == 1) {
                $('#ress').html("计算完毕，结果是：<span style='color:purple;'>" + a.Fenzi + "</span>");
            } else {
                $('#ress').html("计算完毕，结果是：" +getFenhtml(a.Fenzi,a.Fenmu));
            }

            $('#ress').fadeIn();
        } else {
            $('#ress').fadeIn();
            $('#ress').html("计算完毕，结果是：" + a);
            $('#ress').fadeIn();

        }
    } catch (e) {
        sendtext("算式输入好像哪里<span style='color:red'>不对</span>。。。");
    }
}



//计算向导的点击事件
//要现实的文字集合
var dialogues = ["帮助：你好~据说这是个不错的应用呢~如何使用呢（点击按钮继续）", "你可以输入各种算式，比如这个~点击GO就可以计算啦（点击按钮继续）", "嘿嘿，刚才那个太简单了点，看看这个吧~（点击按钮继续）", "如你所见，你可以在里面输入各种复杂的算式，请用“/”表示分数线，sqrt()是根号", "好了，你已经学会了。自己试试看吧 另外，右下角的小球是菜单，点击还有更多功能哦", "别点了，没有啦！"];
//记录当秦播放进度
var step = 0;
//计算器向导按钮的单击
function getshili() {
    sendtext(dialogues[step]);
    if (step == 0) {
        $('#ress').fadeIn();

        $("#help").html("继续");
    }
    if (step == 1) {
        sendexp("1+1");
    }
    if (step == 2) {
        sendexp("（173/62+37/42）*651/2390");
    }
    if (step == 3) {
        sendexp("3/4+sqrt(2)+2*π");
    }
    if (step == 4) {
        sendexp("");
    }
    step++;
    if (step == 6) step = 5;



    $("#exp").val();
}
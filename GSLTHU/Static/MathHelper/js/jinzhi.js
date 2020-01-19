
//进制转换
//num：要转换的数字(以字符串形式)
//jinzhi1：被转换的数字是几进制的
//jinzhi2 ：转换成几进制
function convert(num,jinzhi1,jinzhi2) {
    var x = parseInt(num, jinzhi1);
    return x.toString(jinzhi2);
}

//对禁止输入的字符进行过滤
function valid(num,text) {
    switch (num) {
        case 2:
            return text.replace(/[^0-1]/g, '');
            break;
       case 8:
           return text.replace(/[^0-7]/g, '');
           break;
        case 10:
            return text.replace(/[^0-9]/g, '');
            break;
        case 16:
            return text.replace(/[^(0-9a-eA-E)]/g, '');
            break;
        default:

    }
}

function jinzhi_onchange() {
    var a =parseInt( $('input:radio:checked').val());
    $("#jinzhi_input").val(valid(a, $("#jinzhi_input").val()));
    var inpuvalue = $("#jinzhi_input").val();
    if (inpuvalue!="") {
        $("#span_2").html(convert(inpuvalue, a, 2));
        $("#span_8").html(convert(inpuvalue, a, 8));
        $("#span_10").html(convert(inpuvalue, a, 10));
        $("#span_16").html(convert(inpuvalue, a, 16));
    } else {
        $("#span_2").html("");
        $("#span_8").html("");
        $("#span_10").html("");
        $("#span_16").html("");
    }
}


$(function () {
    $("input:radio").change(function () {
        $("#jinzhi_input").val("");
        $("#jinzhi_input").focus();
    });
});
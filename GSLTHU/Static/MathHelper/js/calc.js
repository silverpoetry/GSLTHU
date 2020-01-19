//分数的构造函数
function Fenshu(fenzi, fenmu) {
    this.Fenzi = fenzi;
    this.Fenmu = fenmu;

}

//分数的运算实现
Fenshu.Add = function (fen1, fen2) {

    var result = new Fenshu();
    result.Fenmu = fen1.Fenmu * fen2.Fenmu;
    result.Fenzi = fen1.Fenzi * fen2.Fenmu + fen2.Fenzi * fen1.Fenmu;
    if (result.Fenzi == 0) {
        result.Fenmu = 1;
        return result;
    }
    Fenshu.Yuefen(result);
    return result;
}
Fenshu.Sub = function (fen1, fen2) {

    var f = new Fenshu(-fen2.Fenzi, fen2.Fenmu);
    return Fenshu.Add(fen1, f);
}
Fenshu.Cheng = function (fen1, fen2) {
    var result = new Fenshu();
    result.Fenmu = fen1.Fenmu * fen2.Fenmu;
    result.Fenzi = fen1.Fenzi * fen2.Fenzi;
    Fenshu.Yuefen(result);
    return result;
}
Fenshu.Chu = function (fen1, fen2) {
    var fentemp = new Fenshu(fen2.Fenmu, fen2.Fenzi);
    Fenshu.Standard(fentemp);

    return Fenshu.Cheng(fen1, fentemp);
}

//乘方
Fenshu.Chengfang = function (fen1, mi) {
    var temp = new Fenshu(fen1.Fenzi, fen1.Fenmu);;
    for (var i = 0; i < mi - 1; i++) {
        temp.Fenzi = temp.Fenzi * fen1.Fenzi;
        temp.Fenmu = temp.Fenmu * fen1.Fenmu;
    }
    return temp;
}

//约分
Fenshu.Yuefen = function (fen) {
    for (var i = 2; i < 20000; i++) {
        if (fen.Fenzi % i == 0 && fen.Fenmu % i == 0) {
            fen.Fenzi /= i;
            fen.Fenmu /= i;
            i--;
        }

    }
    return fen;
}


//化成标准形式（规范负号的位置）
Fenshu.Standard = function (fen) {
    if (fen.Fenzi < 0 && fen.Fenmu < 0) {
        fen.Fenzi = -fen.Fenzi;
        fen.Fenzi = -fen.Fenzi;
    } else if (fen.Fenzi * fen.Fenmu < 0) {
        fen.Fenzi = -Math.abs(fen.Fenzi);
        fen.Fenmu = Math.abs(fen.Fenmu);

    } else if (fen.Fenzi == 0) {
        fen.Fenmu = 1;

    }
}



function isNum(s) {//是否为正整数
    var re = /^[0-9]*[0-9][0-9]*$/;
    return re.test(s);
}
var IfHasSmallNum = false;

//将表达式字符串序列化
function StrToArr(str) {
    //规范括号
    str = str.replace(/）/g, ")");
    str = str.replace(/（/g, "(");
    //替换π
    str = str.replace(/π/g, "3.1415");
    var tempnum = '';
    var issmallnum = false;
    var result = [];
    for (var i = 0; i < str.length; i++) {
        if (isNum(str[i])) {
            tempnum += str[i];
        } else if (str[i] == '.') {
            tempnum += '.';
            IfHasSmallNum = true;
            issmallnum = true;

        } else if (str[i] == ' ') {
            continue;
        } else if (str[i] == 's') {
            //sqrt()开方
            var j = i;
            var tempsq = '';
            while (true) {
                j++;
                if (isNum(str[j])) tempsq += str[j];
                if (str[j] == ')') break;
            }
            result.push(Math.sqrt(parseInt(tempsq)));
            IfHasSmallNum = true;
            i = j;
        } else if (str[i] == '-') {
            //负数和减号的处理。
            if (result.length == 0 && tempnum == "") {
                //负数
                tempnum += str[i];
            } else if (result[result.length - 1] == '(' && tempnum == "") {
                //负数
                tempnum += str[i];
            } else {
                //减法
                //1.
                if (tempnum != '') {
                    if (issmallnum) {
                        result.push(parseFloat(tempnum));
                    } else {
                        result.push(parseInt(tempnum));
                    }
                }
                issmallnum = false;
                tempnum = '';
                result.push(str[i]);
            }
        } else {
            //+*/（）等
            if (tempnum != '') {
                if (issmallnum) {
                    result.push(parseFloat(tempnum));
                } else {
                    result.push(parseInt(tempnum));
                }
            }

            issmallnum = false;
            tempnum = '';
            result.push(str[i]);
        }
        if (i == str.length - 1) {
            if (tempnum != '') {
                if (issmallnum) {
                    result.push(parseFloat(tempnum));
                } else {
                    result.push(parseInt(tempnum));
                }
            }
        }
    }
    return result;
}





//判断是否是运算符
function isOperator(value) {
    var operatorString = "+-*/()^";
    return operatorString.indexOf(value) > -1
}
//获取优先级
function getPrioraty(value) {
    switch (value) {
        case '+':
        case '-':
            return 1;
        case '*':
        case '/':
            return 2;
        case '^':

            return 3;
        default:
            return 0;
    }
}
//比较优先级
function prioraty(o1, o2) {
    return getPrioraty(o1) <= getPrioraty(o2);
}

//将序列化后的表达式逆波兰排序
function dal2Rpn(exp) {
    //输入栈
    var inputStack = [];
    //输出栈
    var outputStack = [];
    var outputQueue = [];


    //添加输入栈元素
    for (var i = 0, len = exp.length; i < len; i++) {
        var cur = exp[i];

        inputStack.push(cur);

    }

    while (inputStack.length > 0) {
        var cur = inputStack.shift();
        if (isOperator(cur)) {
            if (cur == '(') {
                outputStack.push(cur);
            } else if (cur == ')') {
                var po = outputStack.pop();
                while (po != '(' && outputStack.length > 0) {
                    outputQueue.push(po);
                    po = outputStack.pop();
                }
                if (po != '(') {
                    throw "error";
                }
            } else {
                while (prioraty(cur, outputStack[outputStack.length - 1]) && outputStack.length > 0) {
                    outputQueue.push(outputStack.pop());
                }
                outputStack.push(cur);
            }
        } else {
            outputQueue.push(new Number(cur));
        }
    }

    if (outputStack.length > 0) {
        if (outputStack[outputStack.length - 1] == ')' || outputStack[outputStack.length - 1] == '(') {
            throw "error";
        }
        while (outputStack.length > 0) {
            outputQueue.push(outputStack.pop());
        }
    }

    return outputQueue;

}







//计算逆波兰后的序列
function evalRpn(rpnQueue, isfen) {
    var outputStack = [];
    while (rpnQueue.length > 0) {
        var cur = rpnQueue.shift();

        if (!isOperator(cur)) {
            outputStack.push(cur);
        } else {
            if (outputStack.length < 2) {
                throw "error";
            }
            var sec = outputStack.pop();
            var fir = outputStack.pop();
            if (isfen) {
                outputStack.push(getResultFen(fir, sec, cur));
            } else {
                outputStack.push(getResult(fir, sec, cur));
            }

        }
    }

    if (outputStack.length != 1) {
        throw "unvalid expression";
    } else {
        return outputStack[0];

    }
}

//普通数字的运算
function getResult(fir, sec, cur) {
    switch (cur) {
        case '+':
            return fir + sec;
        case '-':
            return fir - sec;;
        case '*':
            return fir * sec;;
        case '/':
            return fir / sec;;
        case '^':
            var temp = fir;
            for (var i = 0; i < sec - 1; i++) {
                temp = temp * fir;
            }
            return temp;
        default:
            return 0;
    }
}
//分数的运算
function getResultFen(fir, sec, cur) {
    if (fir.constructor != Fenshu) fir = new Fenshu(fir, 1);
    if (sec.constructor != Fenshu) sec = new Fenshu(sec, 1);
    switch (cur) {
        case '+':
            return Fenshu.Add(fir, sec);
        case '-':
            return Fenshu.Sub(fir, sec);
        case '*':
            return Fenshu.Cheng(fir, sec);
        case '/':
            return Fenshu.Chu(fir, sec);
        case '^':
            return Fenshu.Chengfang(fir, sec.Fenzi);
        default:
            return 0;
    }

}



//总函数，传入用户输入的字符串，返回运算后的结果
function str2Value(str) {
    IfHasSmallNum = false;
   
    var a = StrToArr(str);
    a = dal2Rpn(a);
    if (IfHasSmallNum) {
        a = evalRpn(a, false);

    } else {
        a = evalRpn(a, true);
    }
    return a;
}



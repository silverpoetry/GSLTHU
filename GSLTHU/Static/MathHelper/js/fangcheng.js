
//解一元一次方程 ax=b
function solve11(a, b) {

    //以分数进行计算
    //如果是整数，把整数转换成分数
    if (isNum(a)) a = new Fenshu(parseInt(a), 1);
        //如果是表达式，计算表达式的值，把表达式计算成分数
    else a = str2Value(a);
    if (isNum(b)) b = new Fenshu(parseInt(b), 1);
    else b = str2Value(b);

    IfHasSmallNum = false;
    b.Fenzi = b.Fenzi;
    return Fenshu.Chu(b, a);
    //x=b/a
}


//解一元二次方程
function solve12(a, b, c) {
    //方程各项的系数可以是整数或分数
    //计算流程：
    //1.把个相统一成分数，方便计算
    if (a.indexOf("/") == -1) a = new Fenshu(parseInt(a), 1); else a = str2Value(a);
    if (b.indexOf("/") == -1) b = new Fenshu(parseInt(b), 1); else b = str2Value(b);
    if (c.indexOf("/") == -1) c = new Fenshu(parseInt(c), 1); else c = str2Value(c);
    //2.去分母 化成整数
    var gongfenmu = a.Fenmu * b.Fenmu * c.Fenmu;
    a.Fenzi = a.Fenzi * gongfenmu;
    b.Fenzi = b.Fenzi * gongfenmu;
    c.Fenzi = c.Fenzi * gongfenmu;
    Fenshu.Yuefen(a); Fenshu.Yuefen(b); Fenshu.Yuefen(c);
    
    a = a.Fenzi;
    b = b.Fenzi;
    c = c.Fenzi;
    //掉求根公式得到基本式

    var mu = 2 * a;
    var fub = -b;
    var gen = b * b - 4 * a * c;
    var genxishu = 1;
    if (gen < 0) {
        return -1;//无解

    }
    if (gen == 0) {
        var result = [];
        result.push(Fenshu.Yuefen(new Fenshu(fub, mu)));
        result.push(Fenshu.Yuefen(new Fenshu(fub, mu)));
        return result;
    }
    //化简b^2-4ac
    for (var i = 2; i < 1000; i++) {
        if (gen % (i * i) == 0) { gen /= i * i; genxishu *= i; i-- }

    }
    if (gen == 1) {

        //运算结果是分数，直接运算并返回
        var result = [];
        result.push(Fenshu.Yuefen(new Fenshu(fub + genxishu, mu)));
        result.push(Fenshu.Yuefen(new Fenshu(fub - genxishu, mu)));
        return result;
    } else {
        //对根系数 -b 和2a约分
        for (var i = 2; i < 20000; i++) {
            if (genxishu % i == 0 && mu % i == 0 && fub % i == 0) {
                genxishu /= i;
                mu /= i;
                fub /= i;
                i--;
            }
            var genstr = "";//把跟系数和根号拼接；
            var genstr2 = "";//x2
            if (genxishu == 1) {
                genstr = "+√" + gen;
                genstr2 = "-√" + gen;
            } else {
                if (genxishu > 0) {
                    genstr = "+" + genxishu + "√" + gen;

                    genstr = -genxishu + "√" + gen;
                } else {
                    genstr = "+" + -genxishu + "√" + gen;

                    genstr = genxishu + "√" + gen;
                }

            }
            if (fub == 0) {
                var result = [];
                result.push(Fenshu.Yuefen(new Fenshu(genstr, mu)));
                result.push(Fenshu.Yuefen(new Fenshu(genstr2, mu)));
                return result;
            } else {
                var result = [];
                result.push(Fenshu.Yuefen(new Fenshu(fub + genstr, mu)));
                result.push(Fenshu.Yuefen(new Fenshu(fub + genstr2, mu)));
                return result;
            }
        }
    }


    //x=-b/a
}
function solve21(a, b, c, d, e, f) {
    if (a.indexOf("/") == -1) a = new Fenshu(parseInt(a), 1); else a = str2Value(a);
    if (b.indexOf("/") == -1) b = new Fenshu(parseInt(b), 1); else b = str2Value(b);
    if (c.indexOf("/") == -1) c = new Fenshu(parseInt(c), 1); else c = str2Value(c);

    if (d.indexOf("/") == -1) d = new Fenshu(parseInt(d), 1); else d = str2Value(d);
    if (e.indexOf("/") == -1) e = new Fenshu(parseInt(e), 1); else e = str2Value(e);
    if (f.indexOf("/") == -1) f = new Fenshu(parseInt(f), 1); else f = str2Value(f);

    c.Fenzi = -c.Fenzi;
    f.Fenzi = -f.Fenzi;
    var result = [];
    var a1, b1, c1, d1;
    var a2, b2, c2, d2;;
    //x=(bf-ce)/(ae-bd)
    //用a存储ae
    a1 = Fenshu.Cheng(a, e);
    b1 = Fenshu.Cheng(b, d);
    f1 = Fenshu.Cheng(b, f);
    c1 = Fenshu.Cheng(c, e);
    result.push(Fenshu.Chu(Fenshu.Sub(f1, c1), Fenshu.Sub(a1, b1)));//存储x于结果数组
    //y=(af-cd)/(bd-ae)
    a2 = Fenshu.Cheng(b, d);
    b2 = Fenshu.Cheng(a, e);
    f2 = Fenshu.Cheng(a, f);
    c2 = Fenshu.Cheng(c, d);
    result.push(Fenshu.Chu(Fenshu.Sub(f2, c2), Fenshu.Sub(a2, b2)));
    return result;

    //x=-b/a
}
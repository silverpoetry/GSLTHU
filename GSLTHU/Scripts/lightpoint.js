﻿function random(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}

function snow() {

    var b = document.getElementById("dotcanvas");
    var a = b.getContext("2d"), d = window.innerWidth, c = window.innerHeight;
    b.width = d;
    b.height = c;
    //如果是七种颜色就把这个解除注释 
    var colors = ["rgba(255,0,0,0.5)", "rgba(255,125,0,0.5)", "rgba(255,255,0,0.5)", "rgba(0,255,0,0.5)", "rgba(0,0,255,0.5)", "rgba(0,255,255,0.5)", "rgba(255,0,255,0.5)"];
    for (var e = [], b = 0; b < 15; b++) {
        //这种是随机颜色，无限变化的
        //var numr = random(0, 255);
        //var numg = random(0, 255);
        //var numb = random(0, 255);

        //e.push({ x: Math.random() * d, y: Math.random() * c, r: Math.random() * 4 + 1, d: Math.random() * 50,fillstyle:"rgba(" + numr + ", " + numg + ", " + numb + ", 0.5)" });
        //这种是七种颜色的
        e.push({ x: Math.random() * d, y: Math.random() * c, r: Math.random() * 4 + 1, d: Math.random() * 50, fillstyle: colors[random(0, 7)] });

    }
    var h = 0;
    window.intervral4Christmas = setInterval(function () {
        a.clearRect(0, 0, d, c);
        //这里是渲染的周围区颜色
        a.shadowBlur = 5;
        a.shadowColor = "rgba(255, 255, 255, 0.7)";  //这里是中心区颜色

        for (var b = 0; b < 15; b++) { //30可以调整 数值越大 点数越多
            //   a.beginPath();
            var f = e[b];
            a.moveTo(f.x, f.y);
            a.fillStyle = f.fillstyle;
            a.shadowColor = f.fillstyle;
            a.beginPath();
            a.arc(f.x, f.y, f.r, 0, Math.PI * 2, !0)
            a.fill();

        }

        h += 0.01;
        for (b = 0; b < 15; b++) {
            if (f = e[b], f.y += Math.cos(h + f.d) + 1 + f.r / 2, f.x += Math.sin(h) * 2, f.x > d + 5 || f.x < -5 || f.y > c) {
                e[b] = b % 3 > 0 ? { x: Math.random() * d, y: -10, r: f.r, d: f.d, fillstyle: f.fillstyle } : Math.sin(h) > 0 ? { x: -5, y: Math.random() * c, r: f.r, d: f.d, fillstyle: f.fillstyle } : { x: d + 5, y: Math.random() * c, r: f.r, d: f.d, fillstyle: f.fillstyle }
            }
        }
    }, 70)
}
$(document).ready(snow);


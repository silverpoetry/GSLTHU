(function(window){
    //生成min到max的随机数
    function random(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    }

    //根据三个参考点生成贝塞尔曲线
    //并返回这条曲线第t(比例)点的位置
    function bezier(cp, t) {  
        var p1 = cp[0].mul((1 - t) * (1 - t));
        var p2 = cp[1].mul(2 * t * (1 - t));
        var p3 = cp[2].mul(t * t); 
        return p1.add(p2).add(p3);
       
    }  

    //判断是否在图形中
    //r是缩放比例
    //该函数用于绘制心形树
    function inheart(x, y, r) {
        // x^2+(y-(x^2)^(1/3))^2 = 1为心形函数
        // http://www.wolframalpha.com/input/?i=x%5E2%2B%28y-%28x%5E2%29%5E%281%2F3%29%29%5E2+%3D+1
        var z = ((x / r) * (x / r) + (y / r) * (y / r) - 1) * ((x / r) * (x / r) + (y / r) * (y / r) - 1) * ((x / r) * (x / r) + (y / r) * (y / r) - 1) - (x / r) * (x / r) * (y / r) * (y / r) * (y / r);
        return z < 0;
    }

    //点对象和成员
    Point = function(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    Point.prototype = {
        //复制点
        clone: function() {
            return new Point(this.x, this.y);
        },
        //给点增加一个偏移
        add: function(o) {
            p = this.clone();
            p.x += o.x;
            p.y += o.y;
            return p;
        },
        sub: function(o) {
            p = this.clone();
            p.x -= o.x;
            p.y -= o.y;
            return p;
        },
        div: function(n) {
            p = this.clone();
            p.x /= n;
            p.y /= n;
            return p;
        },
        mul: function(n) {
            p = this.clone();
            p.x *= n;
            p.y *= n;
            return p;
        }
    }
    //心形对象
    Heart = function () {
        //心形对象的参数方程
        // x = 16 sin^3 t
        // y = 13 cos t - 5 cos 2t - 2 cos 3t - cos 4t
        
        // http://www.wolframalpha.com/input/?i=x+%3D+16+sin%5E3+t%2C+y+%3D+(13+cos+t+-+5+cos+2t+-+2+cos+3t+-+cos+4t)
        var points = [], x, y, t;
        for (var i = -20.0; i < 20; i += 0.2) {
            //此处存在错误，源代码写作i/pi
            //换做此写法t从-pi到pi正好一个周期
            //原写法因为范围远大于2pi顾巧了也可以实现同样效果
            t = i / 20* Math.PI;
            x = 16 * Math.pow(Math.sin(t), 3);
            y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
            points.push(new Point(x, y));
        }
        this.points = points;
        this.length = points.length;
    }
    Heart.prototype = {
        //根据缩放获取点
        get: function(i, scale) {
            return this.points[i].mul(scale || 1);
        }
    }

    //显示在起始位置的引导
    Seed = function(tree, point, scale, color) {
        this.tree = tree;

        var scale = scale || 1
        //红色
        var color = color || '#FF0000';

        //位置、缩放、颜色
        this.heart = {
            point  : point,
            scale  : scale,
            color  : color,
            figure : new Heart(),
        }
        //小圆点
        this.cirle = {
            point  : point,
            scale  : scale,
            color  : color,
            radius : 5,
        }
    }
    //Seed包含了会吐的全部信息
    Seed.prototype = {
        //其实引导画图
        draw: function() {
            this.drawHeart();
            this.drawText();
        },
        //平移点
        //circle为绘图参考原点
        addPosition: function(x, y) {
            this.cirle.point = this.cirle.point.add(new Point(x, y));
        },
        //为了能画出完整的树，需要留出树的高度
        canMove: function() {
            return this.cirle.point.y < (this.tree.height + 20); 
        },
        //平移树，树生长完成后向右平移动画使用
        move: function(x, y) {
            this.clear();
            this.drawCirle();
            this.addPosition(x, y);
        },

        canScale: function() {
            return this.heart.scale > 0.2;
        },
        //缩放心形
        setHeartScale: function(scale) {
            this.heart.scale *= scale;
        },

        scale: function(scale) {
            this.clear();
            this.drawCirle();
            this.drawHeart();
            this.setHeartScale(scale);
        },
        drawHeart: function() {
            var ctx = this.tree.ctx, heart = this.heart;
            var point = heart.point, color = heart.color, 
                scale = heart.scale;
            ctx.save();
            ctx.fillStyle = color;
            ctx.translate(point.x, point.y);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            //画心形
            for (var i = 0; i < heart.figure.length; i++) {
                var p = heart.figure.get(i, scale);
                ctx.lineTo(p.x, -p.y);
            }
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        },
        drawCirle: function() {
            var ctx = this.tree.ctx, cirle = this.cirle;
            var point = cirle.point, color = cirle.color, 
                scale = cirle.scale, radius = cirle.radius;
            ctx.save();
            ctx.fillStyle = color;
            //坐标原点平移
            ctx.translate(point.x, point.y);
            ctx.scale(scale, scale);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            //画圆弧
            ctx.arc(0, 0, radius, 0, 2 * Math.PI);

            ctx.closePath();

            ctx.fill();
            ctx.restore();
        },
        //在引导界面写文字
        drawText: function() {
            var ctx = this.tree.ctx, heart = this.heart;
            var point = heart.point, color = heart.color, 
                scale = heart.scale;
            ctx.save();
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.translate(point.x, point.y);
            ctx.scale(scale, scale);
            ctx.moveTo(0, 0); //画衬线
    	    ctx.lineTo(15, 15);
    	    ctx.lineTo(60, 15);
            ctx.stroke();

            ctx.moveTo(0, 0);
            ctx.scale(0.75, 0.75);
            ctx.font = "12px 微软雅黑,Verdana"; // 字号肿么没有用? (ˉ(∞)ˉ) 这条注释不是我加的
            ctx.fillText("点心打开~", 23, 10);
            ctx.restore();
        },
        //清屏
        clear: function() {
            var ctx = this.tree.ctx, cirle = this.cirle;
            var point = cirle.point, scale = cirle.scale, radius = 26;
            var w = h = (radius * scale);
            ctx.clearRect(point.x - w, point.y - h, 4 * w, 4 * h);
        },
        //根据鼠标下方是不是红色判断是否点到心
        hover: function(x, y) {
            var ctx = this.tree.ctx;
            var pixel = ctx.getImageData(x, y, 1, 1);
            return pixel.data[3] == 255
        }
    }
    //代表地面的一条黑线
    Footer = function(tree, width, height, speed) {
        this.tree = tree;
        this.point = new Point(tree.seed.heart.point.x, tree.height - height / 2);
        this.width = width;
        this.height = height;
        this.speed = speed || 2;
        this.length = 0;
    }
    Footer.prototype = {
        draw: function() {
            var ctx = this.tree.ctx, point = this.point;
            var len = this.length / 2;

            ctx.save();
            ctx.strokeStyle = 'rgb(35, 31, 32)';
            ctx.lineWidth = this.height;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.translate(point.x, point.y);
            ctx.beginPath();
            ctx.moveTo(0, 0);
    	    ctx.lineTo(len, 0);
    	    ctx.lineTo(-len, 0);
            ctx.stroke();
            ctx.restore();

            if (this.length < this.width) {
                this.length += this.speed;
            }
        }
    }

    Tree = function(canvas, width, height, opt) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = width;
        this.height = height;
        this.canfall = false;
        this.opt = opt || {};

        this.record = {};
        this.initSeed();
        this.initFooter();
        this.initBranch();
        this.initBloom();
    }
    Tree.prototype = {
        initSeed: function() {
            var seed = this.opt.seed || {};
            var x = seed.x || this.width / 2;
            var y = seed.y || this.height / 2;
            var point = new Point(x, y);
            var color = seed.color || '#FF0000';
            var scale = seed.scale || 1;
            //种子的位置、缩放和颜色
            this.seed = new Seed(this, point, scale, color);
        },

        initFooter: function() {
            var footer = this.opt.footer || {};
            var width = footer.width || this.width;
            var height = footer.height || 5;
            var speed = footer.speed || 2;
            //地面动画速度
            this.footer = new Footer(this, width, height, speed);
        },

        initBranch: function () {
            //枝条的位置
            var branchs = this.opt.branch || []
            this.branchs = [];
            this.addBranchs(branchs);
        },

        initBloom: function() {
            var bloom = this.opt.bloom || {};
            var cache = [],
                num = bloom.num || 500, 
                width = bloom.width || this.width,
                height = bloom.height || this.height,
                figure = this.seed.heart.figure;//心形树的坐标信息
            var r = 240, x, y;
            for (var i = 0; i < num; i++) {
                //添加一片心形树叶
                cache.push(this.createBloom(width, height, r, figure));
            }
            this.blooms = []; //正在开放变大中的花朵 //也是正在掉落的花朵
            this.bloomsCache = cache;//尚未开放的花朵
        },

        toDataURL: function(type) {
            return this.canvas.toDataURL(type);
        },
        //绘制内存中的图片信息
        draw: function(k) {
            var s = this, ctx = s.ctx;
            var rec = s.record[k];
            if (!rec) {
                return ;
            }
            var point = rec.point,
                image = rec.image;

            ctx.save();
            ctx.putImageData(image, point.x, point.y);
        	ctx.restore();
        },

        addBranch: function(branch) {
        	this.branchs.push(branch);
        },

        addBranchs: function(branchs){
            var s = this, b, p1, p2, p3, r, l, c;
        	for (var i = 0; i < branchs.length; i++) {
                b = branchs[i];
                p1 = new Point(b[0], b[1]);
                p2 = new Point(b[2], b[3]);
                p3 = new Point(b[4], b[5]);
                r = b[6];
                l = b[7];
                c = b[8]
                s.addBranch(new Branch(s, p1, p2, p3, r, l, c)); 
            }
        },

        removeBranch: function(branch) {
            var branchs = this.branchs;
        	for (var i = 0; i < branchs.length; i++) {
        		if (branchs[i] === branch) {
        			branchs.splice(i, 1);
                }
            }
        },

        canGrow: function() {
            return !!this.branchs.length;
        },
        grow: function() {
            var branchs = this.branchs;
            for (var i = 0; i < branchs.length; i++) {
                //更新绘制所有正在生长的树枝
                var branch = branchs[i];
                if (branch) {
                    branch.grow();
                }
            }
        },

        addBloom: function (bloom) {
            this.blooms.push(bloom);
        },

        removeBloom: function (bloom) {
            var blooms = this.blooms;
            for (var i = 0; i < blooms.length; i++) {
                if (blooms[i] === bloom) {
                    blooms.splice(i, 1);
                }
            }
        },

        //随机生成一朵心形树叶
        createBloom: function(width, height, radius, figure, color, alpha, angle, scale, place, speed) {
            var x, y;
            while (true) {
                x = random(20, width - 20);
                y = random(20, height - 20);
                //判读生成的位置是否正确
                if (inheart(x - width / 2, height - (height - 40) / 2 - y, radius)) {

                    return new Bloom(this, new Point(x, y), figure, color, alpha, angle, scale, place, speed);
                }
            }
        },
        
        canFlower: function() {
            return !!this.blooms.length; //返回未开的花的数量是否为0
        }, 
        flower: function (num) {
            //开花函数
            //splice：范围删除并返回删除的元素
            //num开花的朵数
            var s = this, blooms = s.bloomsCache.splice(0, num);
            for (var i = 0; i < blooms.length; i++) {
                s.addBloom(blooms[i]);
            }
            blooms = s.blooms;
            for (var j = 0; j < blooms.length; j++) {
                blooms[j].flower();
            }
        },
        //截取屏幕
        snapshot: function(k, x, y, width, height) {
            var ctx = this.ctx;
            var image = ctx.getImageData(x, y, width, height); 
            this.record[k] = {
                image: image,
                point: new Point(x, y),
                width: width,
                height: height
            }
        },

        setSpeed: function(k, speed) {
            this.record[k || "move"].speed = speed;
        },
        //对绘制好的元素哦进行移动
        //k代表存储数据的索引
        //x,y代表位置
        move: function(k, x, y) {
            var s = this, ctx = s.ctx;
            var rec = s.record[k || "move"];
            var point = rec.point,
                image = rec.image,
                speed = rec.speed || 10,
                width = rec.width,
                height = rec.height; 

            i = point.x + speed < x ? point.x + speed : x;
            j = point.y + speed < y ? point.y + speed : y; 

            ctx.save();
            ctx.clearRect(point.x, point.y, width, height);//清除原位置图像
            ctx.putImageData(image, i, j);//在新位置绘制
        	ctx.restore();
            //每次移动速度逐渐减慢
            rec.point = new Point(i, j);
            rec.speed = speed * 0.95;

            if (rec.speed < 2) {
                rec.speed = 2;
            }
            return i < x || j < y; //返回是否平移结束
        },

        //树叶的掉落
        jump: function () {
            //继续正在进行的掉落
            //即时补充落花
            var s = this, blooms = s.blooms;
            if (blooms.length) {
                for (var i = 0; i < blooms.length; i++) {
                    blooms[i].jump();
                }
            } 
            /*if ((blooms.length && blooms.length < 3) || !blooms.length)*/
            if (s.canfall) {
                s.canfall = false;
                var bloom = this.opt.bloom || {},
                    width = bloom.width || this.width,
                    height = bloom.height || this.height,
                    figure = this.seed.heart.figure;
                var r = 240, x, y;
                for (var i = 0; i < random(1,2); i++) {
                    blooms.push(this.createBloom(width / 2 + width, height, r, figure, null, 1, null, 1, new Point(random(-100,600), 720), random(200,300)));
                }
            }
        }
    }

    //树枝
    Branch = function(tree, point1, point2, point3, radius, length, branchs) {
        this.tree = tree;
        this.point1 = point1; //贝塞尔曲线的三个参考点
        this.point2 = point2;
        this.point3 = point3;
        this.radius = radius;
        this.length = length || 100;    
        this.len = 0;//树枝生长动画所需，len表示树枝已经生长的长度
        this.t = 1 / (this.length - 1);   //贝塞尔完成度分母
        this.branchs = branchs || [];//该枝条的子枝条
    }

    Branch.prototype = {
        grow: function() {
            var s = this, p; 
            if (s.len <= s.length) {
                p = bezier([s.point1, s.point2, s.point3], s.len * s.t);//获取将要绘制的位置
                s.draw(p);  //画新长出来的点
                s.len += 1;//增长长度
                s.radius *= 0.97; //减小树枝的粗细程度（新生长的枝条比较细）
            } else {
                s.tree.removeBranch(s); //母枝条已经完成生长，把他移除
                s.tree.addBranchs(s.branchs);//把子枝条加入，开始生长子枝条
            }
        },
        draw: function(p) {
            var s = this;
            var ctx = s.tree.ctx;
            ctx.save();
        	ctx.beginPath();
        	ctx.fillStyle = 'rgb(35, 31, 32)';
            ctx.shadowColor = 'rgb(35, 31, 32)';
            ctx.shadowBlur = 2;
        	ctx.moveTo(p.x, p.y);
        	ctx.arc(p.x, p.y, s.radius, 0, 2 * Math.PI);//生长一段新的树枝
        	ctx.closePath();
        	ctx.fill();
        	ctx.restore();
        }
    }

    Bloom = function(tree, point, figure, color, alpha, angle, scale, place, speed) {
        this.tree = tree;
        this.point = point;
        this.color = color || 'rgb(255,' + random(0, 255) + ',' + random(0, 255) + ')';//随机颜色
        this.alpha = alpha || random(0.3, 1);//随机生成透明额度
        this.angle = angle || random(0, 360); //随机生成角度
        this.scale = scale || 0.1;
        this.place = place;
        this.speed = speed;

        this.figure = figure; //绘制花的点信息，此处为心型
    }
    Bloom.prototype = {
        setFigure: function(figure) {
            this.figure = figure;
        },
        flower: function() {
            var s = this;
            s.draw();  //不断画更大的新型来摸你长大
            s.scale += 0.1;
            if (s.scale > 1) {
                s.tree.removeBloom(s);//如果生长完毕，将其移除
            }
        },
        draw: function() {
            var s = this, ctx = s.tree.ctx, figure = s.figure;

            ctx.save();
            ctx.fillStyle = s.color;
            ctx.globalAlpha = s.alpha;
            ctx.translate(s.point.x, s.point.y);
            ctx.scale(s.scale, s.scale);
            ctx.rotate(s.angle);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            for (var i = 0; i < figure.length; i++) {
                var p = figure.get(i);
                ctx.lineTo(p.x, -p.y);
            }
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        },
        jump: function() {
            var s = this, height = s.tree.height;

            if (s.point.x < -20 || s.point.y > height + 20) {
                s.tree.removeBloom(s); //删除这朵花
            } else {
                s.draw();
                s.point = s.place.sub(s.point).div(s.speed).add(s.point);
                s.angle += 0.03;  //旋转减速掉落
                s.speed -= 1;
            }
        }
    }

    window.random = random;
    window.bezier = bezier;
    window.Point = Point;
    window.Tree = Tree;

})(window);

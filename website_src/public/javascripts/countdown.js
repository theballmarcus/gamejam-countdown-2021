var c = document.getElementById("myCanvas");
c.width = window.innerWidth;
c.height = window.innerHeight;
var ctx = c.getContext("2d");

var direction=1;
timer = ""
var count_date_obj = new Date(count_date)
var counter = 0
var ga = 0
var splash_img = new Image();
splash_img.src = "/assets/splash.png"



function clear_canvas() {
    ctx.clearRect(0, 0, c.width, c.height);
}

function calc_new_time() {
    var today_date_obj = new Date()
    
    var par = (count_date_obj.getTime() - today_date_obj.getTime()) / 1000
    d = ("0"+Math.floor(par/86400)).slice(-2);
    h = ("0"+Math.floor((par%86400)/3600)).slice(-2);
    m = ("0"+Math.floor((par%3600)/60)).slice(-2);
    s = ("0"+Math.floor(par%60)).slice(1)
    timer = "";
    timer += (par>86400?d+"D ":"");
    timer += (par>3600?h+"H ":"");
    timer += (par>60?m+"M ":"");
    timer += s+"S";
    counter = counter + 1
}

function draw_timer() {
    ctx.lineWidth = "0";    
    ctx.font = "40px Noto Sans";
    const metrics = ctx.measureText(timer);
    //ctx.fillStyle = `#ffffff`;
    //ctx.fillText("Time until GAMEJAM:", c.width / 2, (c.height / 2) - 80); 
    ctx.fillStyle='#ffffff';
    ctx.textAlign = "center"
    ctx.font = "80px Squealer";
    ctx.fillText(timer, c.width / 2, c.height / 2); 
}

function draw() {
    clear_canvas()
    calc_new_time()
    draw_timer()
}


calc_new_time()
draw()
window.setInterval(draw, 1000);
window.setInterval(calc_new_time, 1000);
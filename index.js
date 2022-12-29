var canvas = document.getElementById("canvas");

var ctx = canvas.getContext("2d");

// x and y are the co-ordinates of the circle
// vx and vy are the respective speed

/**
 * o===============>x
 * [
 * ]
 * [
 * ]    canvas layout
 * [
 * ]
 * <>y
 */

g = 10;

var ix = 20;
var iy = 480;

var vx = ix;
var vy = iy;

var radius = 20;

draw(ix, iy);

//range code
function run() {
    s = document.getElementById('speedVal').value;
    a = document.getElementById('angleVal').value;

    document.getElementById("range").innerHTML = range(s, a) + "m";
    document.getElementById("maxheight").innerHTML = height(s, a) + "m";
    document.getElementById("tof").innerHTML = timeofflight(s, a) + "s";

    //range
    draw(ix+range(s, a), iy);
    //height
    draw((ix+range(s, a))/2, iy-height(s, a));
}

function range(speed, angle) {
    angle = degToRad(angle);
    return Math.round((Math.pow(speed, 2) * Math.sin(angle * 2))/g);
}

//Max Height
function height(speed, angle){
    angle = degToRad(angle);
    return Math.round((Math.pow(speed, 2) * Math.pow(Math.sin(angle), 2))/(2*g));
}

//Time of flight
function timeofflight(speed, angle){
    angle = degToRad(angle);
    return Math.round((2 * speed * Math.sin(angle))/g);
}

//y coord at certain time
function y_coord(speed, angle, time){
    angle = degToRad(angle);
    return (speed * Math.sin(angle) * time) - ((g * Math.pow(time, 2))/2);
}

//x coord at certain time
function x_coord(speed, angle, time){
    angle = degToRad(angle);
    return speed * Math.cos(angle) * time;
}

//functional conversions
function degToRad(degrees) {
    return degrees * Math.PI / 180;
}

function distance(speed, time) {
    return speed * time; //returns x distance
}

function draw(x , y){

    if(y === 480){
        path(x, y);
    } else {
        //make our ball (FOR MAX HEIGHT)
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.stroke();

        //Code to make the curved parabola
        s = document.getElementById('speedVal').value;
        a = document.getElementById('angleVal').value;
        //returns time value to sub in c and y posi equations
        for (let i = 0; i <= (timeofflight(s, a)+1); i++) {
            //path(ix+x_coord(s, a, i), iy-y_coord(s, a, i));

            ctx.beginPath();
            ctx.moveTo(vx, vy);
            ctx.lineTo(ix+x_coord(s, a, i), iy-y_coord(s, a, i));
            ctx.stroke();

            vx = ix+x_coord(s, a, i);
            vy = iy-y_coord(s, a, i);
        }
    }
} 

function path(x, y) {
    //make our ball
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();

    //draw the path followed by the ball
    ctx.beginPath();
    ctx.moveTo(ix, iy);
    ctx.lineTo(x, y);
    ctx.stroke();
}
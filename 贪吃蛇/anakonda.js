var width=1000;var height=600;    //设置画布的宽高

var context=document.getElementById("canvas").getContext('2d');

var sqSize=10;					//每个格子的大小

var eaten1=true;var eaten2=true;
var level=1;

var bodyX1 = [150+sqSize, 150, 150-sqSize];
var bodyY1 = [150, 150, 150];				//1号蛇的起始位置

var bodyX2 = [150+sqSize, 150, 150-sqSize];
var bodyY2 = [180, 180, 180];				//2号蛇的起始位置

var snakeLength1 = 3;
var snakeLength2 = 3;						//两条蛇的起始长度

var vX1 = [1, 1, 1];
var vY1 = [0, 0, 0];
var vX2 = [1, 1, 1];
var vY2 = [0, 0, 0];

var rX1;var rY1;
var rX2;var rY2;

var score = 0;
var scoreDiv;
var gameOver = false;
var controlDiv;
scoreDiv = document.getElementById("score");
controlDiv = document.getElementById("control");
var Interval = setTimeout(startgame, 1000/6);
window.onkeydown=keydown;
addLoadEvent(startgame);
function drawCanvasBoundary()		
{
    context.strokeStyle='white';
    context.strokeRect(0,0,width,height);
    context.lineWidth=4;
}
function drawPoint(x,y)				
{
	context.strokeStyle='white';
	context.strokeRect(x,y,sqSize, sqSize);
	context.lineWidth=4;
	context.lineJoin='round';
}
function placeRat()
{
    if(eaten1)
    {
        rX1 = Math.floor(width*Math.random()/sqSize)*sqSize;
        rY1 = Math.floor(height*Math.random()/sqSize)*sqSize;
        if(checkFoodCollision(rX1,rY1)||checkFoodCollision(rX2,rY2))
            placeRat();
        else
            eaten1 = false;
    }
    rX1+=sqSize;
    if (rX1==width||rY1==height)
    {
    	eaten1=true;
    	placeRat();
    }
    drawPoint(rX1, rY1);
    if(eaten2)
    {
        rX2 = Math.floor(width*Math.random()/sqSize)*sqSize;
        rY2 = Math.floor(height*Math.random()/sqSize)*sqSize;
        if(checkFoodCollision(rX2,rY2)||checkFoodCollision(rX1,rY1))
            placeRat();
        else
            eaten2 = false;
    }
    rY2+=sqSize;
    if (rX2==0||rY2==height)
    {
    	eaten2=true;
    	placeRat();
    }
    drawPoint(rX2, rY2);
}
function checkFoodCollision(x, y)
{
    for (var i = 0;i<snakeLength1||i<snakeLength2; i++)
        if((x == bodyX1[i]&&y == bodyY1[i])||(x== bodyX2[i]&&y==bodyY2[i]))
        {
            return true;
        }
    return false;
}
function moveSnakeOne(){
    for(var i=0; i < snakeLength1; i++)
    {
        bodyX1[i] += (vX1[i]*sqSize);
        bodyY1[i] += (vY1[i]*sqSize);
    }

    for(var i=snakeLength1-1; i>0; i--)
    {
        vX1[i] = vX1[i-1];
        vY1[i] = vY1[i-1];
    }

    eatRat();
}
function moveSnakeTwo(){
    for(var j=0; j < snakeLength2; j++)
    {
        bodyX2[j] += (vX2[j]*sqSize);
        bodyY2[j] += (vY2[j]*sqSize);
    }

    for(var j=snakeLength2-1; j>0; j--)
    {
        vX2[j] = vX2[j-1];
        vY2[j] = vY2[j-1];
    }

    eatRat();
}
function checkCollision()
{
    if(bodyX1[0] >= width || bodyX1[0] < 0 || bodyY1[0] < 0 || bodyY1[0] >= height
    	||bodyX2[0] >= width || bodyX2[0] < 0 || bodyY2[0] < 0 || bodyY2[0] >= height)
    {
    	deathsound();
        scoreDiv.innerHTML = "当前回合：" + level + " 当前得分： " + score
            +" <b>游戏结束</b>";
        controlDiv.innerHTML = "按 \"回车键\" 重新开始";
        gameOver = true;
        clearTimeout(Interval);
    }
    else if(snakeLength1 > 4||snakeLength2>4)
    {
        if(checkSelfCollision(bodyX1[0],bodyY1[0])
        	||checkSelfCollision(bodyX2[0],bodyY2[0]))
        {
        	deathsound();
            scoreDiv.innerHTML = "当前回合：" + level + " 当前得分： " + score
                +" <b>游戏结束</b>";
            controlDiv.innerHTML = "按 \"回车键\" 重新开始";
            gameOver = true;
            clearTimeout(Interval);
        }
    }
}
function checkSelfCollision(x, y)
{
    for (var i = 4; i < snakeLength1||i<snakeLength2; i++)
    {
    	if(x == bodyX1[i] && y == bodyY1[i])
        {
            return true;
        }
        if(x==bodyX2[i]&&y==bodyY2[i])
        {
        	return true;
        }
    }
    return false;
}
function eatRat()
{
    if(bodyX1[0] == rX1 && bodyY1[0] == rY1)
    {
    	eatsound();
        eaten1 = true;
        var newX1 = bodyX1[snakeLength1-1]-vX1[snakeLength1-1]*sqSize;
        var newY1 = bodyY1[snakeLength1-1]-vY1[snakeLength1-1]*sqSize;
        bodyX1.push(newX1);
        bodyY1.push(newY1);
        vX1.push(vX1[snakeLength1-1]);
        vY1.push(vY1[snakeLength1-1]);
        snakeLength1++;  
        score += 10;  
        if((score%100) == 0)
            level++;
        scoreDiv.innerHTML = "当前回合：" + level + " 当前得分： " + score ;
    }
    if(bodyX2[0] == rX2 && bodyY2[0] == rY2)
    {
    	eatsound();
        eaten2 = true;
        var newX2 = bodyX2[snakeLength2-1]-vX2[snakeLength2-1]*sqSize;
        var newY2 = bodyY2[snakeLength2-1]-vY2[snakeLength2-1]*sqSize;
        bodyX2.push(newX2);
        bodyY2.push(newY2);
        vX2.push(vX2[snakeLength2-1]);
        vY2.push(vY2[snakeLength2-1]);
        snakeLength2++;  
        score += 10;  
        if((score%100) == 0)
            level++;
        scoreDiv.innerHTML = "当前回合：" + level + " 当前得分： " + score ;
    }
}
function startgame()
{
	Interval=setTimeout(startgame,1000/(6*level));
	context.clearRect(0,0,width,height);
	drawCanvasBoundary();
	placeRat();
	drawsnake();
	moveSnakeOne();
	moveSnakeTwo();
	checkCollision();
}
function　drawsnake()
{
	for(var i=0; i < snakeLength1; i++)
        drawPoint(bodyX1[i],bodyY1[i]);
    for(var j=0; j < snakeLength2; j++)
        drawPoint(bodyX2[j],bodyY2[j]);
}
function keydown(e)
{
    if(e.keyCode == 65 && vX1[0] != 1){
        vX1[0] = -1;
        vY1[0] = 0;
        turnsound();
    }
    if (e.keyCode == 87 && vY1[0] != 1)
    {
        vY1[0] = -1;
        vX1[0] = 0;
        turnsound();
    }
    if (e.keyCode == 68 && vX1[0] != -1)
    {
        vX1[0] = 1;
        vY1[0] = 0;
        turnsound();
    }
    if (e.keyCode == 83 && vY1[0] != -1)
    {
        vY1[0] = 1;
        vX1[0] = 0;
        turnsound();
    }
    if (e.keyCode == 74 && vX2[0]!= 1)
    {
    	vX2[0]=-1;
    	vY2[0]=0;
    	turnsound();
    }
    if (e.keyCode == 73 && vY2[0]!= 1)
    {
    	vY2[0] = -1;
        vX2[0] = 0;
        turnsound();
    }
    if (e.keyCode==76 && vX2[0]!=-1)
    {
    	vX2[0] = 1;
        vY2[0] = 0;
        turnsound();
    }
    if (e.keyCode==75 && vY2[0]!=-1)
    {
    	vY2[0] = 1;
        vX2[0] = 0;
        turnsound();
    }
    if (e.keyCode == 13 && gameOver == true)
    {
        gameOver = false;
        restart();
    }
}
function restart()
{
    bodyX1 = [150+sqSize, 150, 150-sqSize];
    bodyY1 = [150, 150, 150];

    vX1 = [1, 1, 1];
    vY1 = [0, 0, 0];

    snakeLength1 = 3;

    bodyX2 = [150+sqSize, 150, 150-sqSize];
    bodyY2 = [180,180,180];

    vX2 = [1, 1, 1];
    vY2 = [0, 0, 0];

    snakeLength2 = 3;

    score = 0;
    level  = 1;

    eaten1 = true;
    eaten2 = true;

    scoreDiv.innerHTML = "当前回合：" + level + " 当前得分： " + score ;
    controlDiv.innerHTML = "玩家1：游戏控制：W=上；A=左；S=下；D=右"+"<br/>"
    +"玩家2：游戏控制：I=上；J=左；K=下；L=右"

    Interval = setTimeout(startgame, 1000/6);
}
function turnsound()
{
	var myTurn=document.getElementById("turn");
	myTurn.play();
	myTurn.loop=false;
}
function eatsound()
{
	var myEat=document.getElementById("eat");
	myEat.play();
	myEat.loop=false;
}
function deathsound()
{
	var myDeath=document.getElementById("death");
	myDeath.play();
	myDeath.loop=false;
}
function addLoadEvent(func)
{
	var oldonload=window.onload;
	if (typeof window.onload!='function')
	{
		window.onload=func;
	}
	else
	{
		window.onload=function()
		{
			oldonload();
			func();
		}
	}
}
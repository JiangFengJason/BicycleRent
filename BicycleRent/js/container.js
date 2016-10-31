window.onload=function()
{
	var content=document.getElementById('Content');
	var list=document.getElementById('list');
	var left=document.getElementById('left');
	var right=document.getElementById('right');
	var stop=document.getElementById('stop');
	var play=document.getElementById('play');
	var animated=false;
	var timer;
	function animate(set)
	{
		var newleft=parseInt(list.style.left)+set
		var time=1000;
		var interval=60;
		var speed=set/(time/interval);
		animated=true;

		function go()
		{
			if((speed<0&&parseInt(list.style.left)>newleft)||(speed>0&&parseInt(list.style.left)<newleft))
			{
				list.style.left=parseInt(list.style.left)+speed+'px';
				setTimeout(go,interval);
			}
			else
			{
				animated=false;
				list.style.left=newleft+'px';
				if(newleft>0)
				{
					list.style.left=-9562+'px';
				}
				if(newleft<-10928)
				{
					list.style.left=-1366+'px';
				}
			}
		}
		go();
	}
	play.onclick=function()
	{
		timer=setInterval("right.onclick()",4000);
	}
	stop.onclick=function()
	{
		clearInterval(timer);
	}
	timer=setInterval("right.onclick()",4000);
	right.onclick=function()
	{
		if(animated==false)
		{
			animate(-1366);
		}
	}
	left.onclick=function()
	{
		if(animated==false)
		{
			animate(1366);
		}
	}
}
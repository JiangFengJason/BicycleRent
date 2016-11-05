window.onload=function()
{
	var shandi=document.getElementById('shandi');
	var gonglu=document.getElementById('gonglu');
	var xiuxian=document.getElementById('xiuxian');
	var zhedie=document.getElementById('zhedie');
	var sifei=document.getElementById('sifei');

	var shandilist=document.getElementsByClassName('shandilist');
	var gonglulist=document.getElementsByClassName('gonglulist');
	var xiuxianlist=document.getElementsByClassName('xiuxianlist');
	var zhedielist=document.getElementsByClassName('zhedielist');
	var sifeilist=document.getElementsByClassName('sifeilist');

	shandi.onclick=function()
	{
		shandilist.style.display="block";
		gonglulist.style.display="none";
		xiuxianlist.style.display="none";
		zhedielist.style.display="none";
		sifeilist.style.display="none";
	}
	gonglu.onclick=function()
	{
		shandilist.style.display="block";
		gonglulist.style.display="none";
		xiuxianlist.style.display="none";
		zhedielist.style.display="none";
		sifeilist.style.display="none";
	}
}
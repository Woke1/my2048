/*
此文件存放所有的动画效果函数
*/
function showNumberWithAnimation(i, j, randNumber){
	var numbercell = $("#number-cell-"+i+"-"+j);

	numbercell.css('background-color' , getnumbercellBackgroundColor(randNumber));
	numbercell.css('color' , getnumbercellColor(randNumber));
	numbercell.css('font-size' , getnumbercellFontSize(randNumber));
	numbercell.text(randNumber);

	numbercell.animate({
		width: 100,
		height: 100,
		top: getPosTop(i,j),
		left: getPosLeft(i,j)
	},100);
}

function showMoveWithAnimation(fromx,fromy,tox,toy){
	var numbercell = $("#number-cell-"+fromx+"-"+fromy);
	numbercell.animate({
		top: getPosTop(tox,toy),
		left: getPosLeft(tox,toy)
	},200);
}
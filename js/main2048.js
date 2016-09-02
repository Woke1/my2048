var board = new Array();
var score = 0;
var conflicted = new Array();

$(document).ready(function(){
	newgame();
	$('header a').click(function(){
		$("#gameover").remove();
		newgame();
	});
});
//开始新游戏
function newgame(){
	//初始化棋盘格
	init();
	//在棋盘格上随机生成2个数字
	creatNumber();
	creatNumber();
}

function init(){
	$("#gameover").remove();//去除游戏结束遮罩
	score = 0;
	$("#score").text(score);
	for(var i = 0;i < 4;i++){
		board[i] = new Array();
		conflicted[i] = new Array();
		for(var j = 0;j < 4;j++){
			board[i][j] = 0;
			conflicted[i][j] = false;
			var cell = $("#grid-cell-"+i+"-"+j);
			cell.css('top' , getPosTop(i,j));
			cell.css('left' , getPosLeft(i,j));
		}
	}
	updateBoardView();
}
//更新视图
function updateBoardView(){
	$(".number-cell").remove();
	for(var i = 0;i < 4;i++){
		for(var j = 0;j < 4;j++){
			$("#grid-container").append("<div class='number-cell' id='number-cell-"+i+"-"+j+"'></div>");
			var numbercell = $("#number-cell-"+i+"-"+j);

			if(board[i][j] == 0){
				numbercell.css({'width': 0, 'height': 0});
				numbercell.css('top' , getPosTop(i,j) + 50);
				numbercell.css('left' , getPosLeft(i,j) + 50);
			}
			else{
				numbercell.css({'width': 100, 'height': 100});
				numbercell.css('top' , getPosTop(i,j));
				numbercell.css('left' , getPosLeft(i,j));
				numbercell.css('background-color' , getnumbercellBackgroundColor(board[i][j]));
				numbercell.css('color' , getnumbercellColor(board[i][j]));
				numbercell.css('font-size' , getnumbercellFontSize(board[i][j]));
				numbercell.text(board[i][j]);
			}
			conflicted[i][j] = false;
		}
	}
}
//在随机位置产生随机一个数
function creatNumber(){
	if(nospace(board)){
		return false;
	}
	//随机位置
	var time = 0;
	var randx = Math.floor(Math.random()*4);
	var randy = Math.floor(Math.random()*4);
	while(time < 50){
		time++;
		if(board[randx][randy] == 0){
			break;
		}
		randx = Math.floor(Math.random()*4);
	    randy = Math.floor(Math.random()*4);
	}
	if(time == 50){
		for(var i = 0;i < 4;i++){
			for(var j = 0;j < 4;j++){
				if(board[i][j] == 0){
					randx = i;
					randy = j;
					break;
				}

			}
		}
	}
	//随机数字
	var randNumber = Math.random() < 0.5 ? 2 : 4;
	//在该位置显示数字
	board[randx][randy] = randNumber;
	showNumberWithAnimation(randx, randy, randNumber);
	return true;
}
//检测按键
$(document).keydown(function(event){
	switch(event.keyCode) {
		case 37: //left
			if(moveLeft()){
				setTimeout('creatNumber()',210);
				setTimeout('isGameOver()',300);
			}
			break;
		case 38: //up
			if(moveUp()){
				setTimeout('creatNumber()',210);
				setTimeout('isGameOver()',300);
			}
			break;
		case 39: //right
			if(moveRight()){
				setTimeout('creatNumber()',210);
				setTimeout('isGameOver()',300);
			}
			break;
		case 40: //down
			if(moveDown()){
				setTimeout('creatNumber()',210);
				setTimeout('isGameOver()',300);
			}
			break;
		default: 
			break;
	}
})

function moveLeft(){
	if(!canMoveLeft(board)){//先判断能否左移
		return false;
	}
	for( var i = 0; i < 4 ; i++){
		for( var j = 1; j < 4 ; j++){
			if(board[i][j] != 0){
				for(var k = 0;k < j;k++){
					if(board[i][k] == 0 && noBlockX(i,k,j,board)){//把数移动到0的位置
						showMoveWithAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if(board[i][k] == board[i][j] && noBlockX(i,k,j,board) && !conflicted[i][k]){//把2个相等的数移动并相加
						showMoveWithAnimation(i,j,i,k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						conflicted[i][k] = true;
						score += board[i][k];
						$('#score').text(score);
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}

function moveUp(){
	if(!canMoveUp(board)){
		return false;
	}
	for( var j = 0; j < 4 ; j++){
		for( var i = 1; i < 4 ; i++){
			if(board[i][j] != 0){
				for(var k = 0;k < i;k++){
					if(board[k][j] == 0 && noBlockY(j,k,i,board)){
						showMoveWithAnimation(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if(board[k][j] == board[i][j] && noBlockY(j,k,i,board) && !conflicted[k][j]){
						showMoveWithAnimation(i,j,k,j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						conflicted[k][j] = true;
						score += board[k][j];
						$('#score').text(score);
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}

function moveRight(){
	if(!canMoveRight(board)){
		return false;
	}
	for( var i = 0; i < 4 ; i++){
		for( var j = 2; j >= 0; j--){
			if(board[i][j] != 0){
				for(var k = 3;k > j;k--){
					if(board[i][k] == 0 && noBlockX(i,j,k,board)){
						showMoveWithAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if(board[i][k] == board[i][j] && noBlockX(i,j,k,board) && !conflicted[i][k]){
						showMoveWithAnimation(i,j,i,k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						conflicted[i][k] = true;
						score += board[i][k];
						$('#score').text(score);
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}

function moveDown(){
	if(!canMoveDown(board)){
		return false;
	}
	for( var j = 0; j < 4 ; j++){
		for( var i = 2; i >= 0 ; i--){
			if(board[i][j] != 0){
				for(var k = 3;k > i;k--){
					if(board[k][j] == 0 && noBlockY(j,i,k,board)){
						showMoveWithAnimation(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}
					else if(board[k][j] == board[i][j] && noBlockY(j,i,k,board) && !conflicted[k][j]){
						showMoveWithAnimation(i,j,k,j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						conflicted[k][j] = true;
						score += board[k][j];
						$('#score').text(score);
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}
//判断是否游戏结束
function isGameOver(){
	if(nospace(board) && nomove(board)){
		//游戏结束遮罩
		$('#grid-container').append("<div id='gameover'><h2>游戏结束<h2><p>你的分数为: "+score+"<p></div>");
	}
}
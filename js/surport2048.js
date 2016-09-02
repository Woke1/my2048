function getPosTop(i,j){
	return i*120+20;
}

function getPosLeft(i,j){
	return j*120+20;
}
//传入数字并返回相应的颜色
function getnumbercellBackgroundColor(number){
	switch(number) {
		case 2: return "#eee4da";
			break;
		case 4: return "#ede0c8";
			break;
		case 8: return "#f2b179";
			break;
		case 16: return "#f59563";
			break;
		case 32: return "#f67c5f";
			break;
		case 64: return "#f65e3b";
			break;
		case 128: return "#edcf72";
			break;
		case 256: return "#edcc61";
			break;
		case 512: return "#9c0";
			break;
		case 1024: return "#33b5e5";
			break;
		case 2048: return "#09c";
			break;
		case 4096: return "#a6c";
			break;
		case 9192: return "#93c";
			break;
	}
	return 'black';
}

function getnumbercellColor(number){
	if(number <= 4){
		return "#776e65";
	}
	return 'white';
}
//当数字过大超过3位时，字体变小
function getnumbercellFontSize(number){
	if(number <= 64){
		return '60px';
	}
	if(number >64 && number <=512){
		return '40px';
	}
	if(number > 512){
		return '30px';
	}
	return '25px';
}
//判断是否有空间继续游戏
function nospace(board){
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			if(board[i][j] == 0){
				return false;
			}
		}
	}
	return true;
}
//判断是否能向左移动
function canMoveLeft(board){
	for( var i = 0; i < 4 ; i++){
		for( var j = 1; j < 4 ; j++){
			if(board[i][j] != 0){
				if(board[i][j-1] == 0 || board[i][j] == board[i][j-1]){
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveUp(board){
	for( var j = 0; j < 4 ; j++){
		for( var i = 1; i < 4 ; i++){
			if(board[i][j] != 0){
				if(board[i-1][j] == 0 || board[i][j] == board[i-1][j]){
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveRight(board){
	for( var i = 0; i < 4 ; i++){
		for( var j = 2; j >= 0 ; j--){
			if(board[i][j] != 0){
				if(board[i][j+1] == 0 || board[i][j] == board[i][j+1]){
					return true;
				}
			}
		}
	}
	return false;
}

function canMoveDown(board){
	for( var j = 0; j < 4 ; j++){
		for( var i = 2; i >= 0 ; i--){
			if(board[i][j] != 0){
				if(board[i+1][j] == 0 || board[i][j] == board[i+1][j]){
					return true;
				}
			}
		}
	}
	return false;
}
//判断在X轴上移动时2个块之间是否有其他块
function noBlockX(row,fromcol,tocol,board){
	for(var x = fromcol+1;x < tocol;x++){
		if(board[row][x] != 0){
			return false;
		}
	}
	return true;
}

function noBlockY(col,fromrow,torow,board){
	for(var x = fromrow +1;x < torow;x++){
		if(board[x][col] != 0){
			return false;
		}
	}
	return true;
}

function nomove(board){
	if(canMoveDown(board) || canMoveRight(board) || canMoveUp(board) || canMoveLeft(board)){
		return false;
	}
	return true;
}
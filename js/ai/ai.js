//imports respondible for:
//game status
//the winning comboc
//game logic for moves to be played 
import { gameState, WINNING_COMBO } from '../gamestate/gamestate.js';
import { placeMove, isOldest, checkGameOver, highlightOldest } from '../gamestate/gamelogic.js';

//decide the computer move
export function computerMove() {
    if (!gameState.gameActive) return; 
    let boardCopy = [...gameState.currBoard];
    let move = minimaxDecision(boardCopy);
    if (move !== null && gameState.gameActive) {  
    	if (isOldest(move, "O")) return;
        placeMove(move, "O");
        checkGameOver();
        if(gameState.gameActive)
        highlightOldest(gameState.curPlayer);
    }
}

//entry point for AI logic
//plays all possible moves and picks the one with the highest utility 
export function minimaxDecision(gameBoard) {
	let currentUtility = -Infinity;
	let emptyCellList = getValidMoves(gameBoard);
	let bestMove = null;
	let cutoff = emptyCellList;
	let alpha = -Infinity;
	let beta = Infinity;
	for(let row of emptyCellList){
		let copyBoard = [...gameBoard];
		updateBoard(row, "O", copyBoard);
		let utility = minValue(copyBoard, alpha, beta, cutoff);
		if(utility > currentUtility){
			currentUtility = utility;
			bestMove = row;
		}
	}
	return bestMove;
}

//min step of Minimax (simulates opponent "X")
//attempts to minimize the score (worst outcome for AI)
export function minValue(gameBoard, alpha, beta, cutoff){
	if(isGameOver(gameBoard) || cutoff === 0) return scoreGame(gameBoard);
	let value = Infinity;
	let list = getValidMoves(gameBoard);

	for (let move of list){
		let copyBoard = [...gameBoard];
		updateBoard(move, "X", copyBoard);
		let utility = maxValue(copyBoard, alpha, beta, cutoff-1);

		if(value > utility){
			value = utility;
		}

		if(value <= alpha){
			return value;
		}

		if(value < beta){
			beta = value;
		}
	}
	return value;
}

//max step of Minimax (simulates AI "O")
//attempts to maximize the score (best outcome for AI)
export function maxValue(gameBoard, alpha, beta, cutoff){
	if(isGameOver(gameBoard) || cutoff === 0) return scoreGame(gameBoard);
	let value = -Infinity;
	let list = getValidMoves(gameBoard);

	for (let move of list){
		let copyBoard = [...gameBoard];
		updateBoard(move, "O", copyBoard);
		let utility = minValue(copyBoard, alpha, beta, cutoff-1);

		if(value < utility){
			value = utility;
		}

		if(value >= beta){
			return value;
		}

		if(value > alpha){
			alpha = value;
		}
	}
	return value;
}

//returns a array of possible moves(empty cells)
export function getValidMoves(board){
	let moves = [];
	for(let i=0; i < 9; i++){
		if(board[i] === "") moves.push(i);
	} 
	return moves;
}

//updates board temporary 
//does not effect the real board only a copy of it
export function updateBoard(move, player, board){
	board[move] = player;
}

//evaluates the board state and assigns a score:
//10 if AI won
//-10 if opponent won
//+5 if two O in a row
//-7 if two X in a row
//+4 if O is in center
//-4 if X is in center
//+1 for each corner of O
//-1 for each corner of X
export function scoreGame(board){
	let winner = whoWon(board);
	if(winner === "O") return 10;
	if(winner === "X") return -10;
	let score = 0;
	for(let [a,b,c] of WINNING_COMBO) {
		let line = [board[a], board[b], board[c]];
		let oCount = line.filter(v => v === "O").length;
		let xCount = line.filter(v => v === "X").length;
		let empty = line.filter(v => v === "").length;
		if(oCount === 2 && empty === 1) score += 5;
		if(xCount === 2 && empty === 1) score += 7;
	}
	if(board[4] === "O") score += 4;
	if(board[4] === "X") score -= 4;
	let corners = [0,2,6,8];
		for(let i of corners){
			if (board[i] === "O") score += 1;
			if (board[i] === "X") score -= 1;
	}
	return score;
} 

//determines a win for the copied board
export function whoWon(board){
	for(let [a,b,c] of WINNING_COMBO) {
		if (board[a] && board[a] === board[b] && board[a] === board[c]){
			return board[a];
		}
	}
	return null;
}

//checks if the game has reached a terminal state
//either a win or a full board
export function isGameOver(board){
	return whoWon(board) !== null || board.every(cell => cell !== "");
}
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
	let cutoff = Infinity;
	for(let row of emptyCellList){
		let alpha = -Infinity;
		let beta = Infinity;
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
export function minValue(gameBoard, alpha, beta){
	if(isGameOver(gameBoard)) return scoreGame(gameBoard);
	let value = Infinity;
	let list = getValidMoves(gameBoard);

	for (let move of list){
		let copyBoard = [...gameBoard];
		updateBoard(move, "X", copyBoard);
		let utility = maxValue(copyBoard, alpha, beta);

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
export function maxValue(gameBoard, alpha, beta){
	if(isGameOver(gameBoard)) return scoreGame(gameBoard);
	let value = -Infinity;
	let list = getValidMoves(gameBoard);

	for (let move of list){
		let copyBoard = [...gameBoard];
		updateBoard(move, "O", copyBoard);
		let utility = minValue(copyBoard, alpha, beta);

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
//+1 if AI ("O") wins
//-1 if Player ("X") wins
//0 ofr draw or neutral state
export function scoreGame(board){
	let winner = whoWon(board);
	if (winner === "O") return 1;
	if (winner === "X") return -1;
	return 0;
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
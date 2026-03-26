//imports respondible for:
//board state updates
//UI elements(button, scoreboard)
//game logic for moves to be played 
//UI updates
//game status

import { boxes, rBtn, mBtn, infiniteBtn, curTurn, drawCountEl, oPlayer, drawsLabel, clearScoreBtn} from '../gamestate/dom.js'
import { placeMove, checkGameOver, highlightOldest, updateScoreboard, isOldest, clearBoard } from '../gamestate/gamelogic.js';
import { computerMove } from '../ai/ai.js';
import { gameState } from '../gamestate/gamestate.js'; 

//registers all event listeners for the application
//centralizing event binding
export function allEvents(){
	//handles when a box is clicked
	//once a move is placed then checks if a game is over
	//if game isnt over highlight oldest then switch to AI
	//if AI didnt win switch back to player
	boxes.forEach(box => {
 	   box.addEventListener("click", () => {
 	   		if(!gameState.gameActive) return;
        	const index = Number(box.dataset.index);
            if (!gameState.infiniteMode && gameState.currBoard[index] !== "") return;
            if(gameState.infiniteMode && gameState.currBoard[index] !== "" && !isOldest(index, gameState.curPlayer))
                return;
        	placeMove(index, gameState.curPlayer);
        	checkGameOver();
        	if (gameState.gameActive) {
        		highlightOldest(gameState.curPlayer);
        		if (gameState.singlePlayer) {
        			if (gameState.curPlayer === "X") {
                	curTurn.textContent = 'Computer Thinking ...';
                	gameState.curPlayer = "O"; 
                	setTimeout(() => {
                    	if (!gameState.gameActive) return;
                    	computerMove(); 
                    	gameState.curPlayer = "X"; 
                    	if(gameState.gameActive)
                    	curTurn.textContent = `Player ${gameState.curPlayer}'s turn`;
                	}, 200);
            	}
        	}else{
        		gameState.curPlayer = gameState.curPlayer === "X" ? "O" : "X";
        		curTurn.textContent = `Player ${gameState.curPlayer}'s turn`;
        		}
        	}
    	});
	});

	//clears the board 
	rBtn.addEventListener("click", () => {
		clearBoard();
	});

	//allows players to switch between single and two player mode
	//also changes the scoreboard
	mBtn.addEventListener("click", () => {
		gameState.singlePlayer = !gameState.singlePlayer; 
		mBtn.textContent = gameState.singlePlayer ? "Single\nPlayer" : "Two\nPlayer";
		oPlayer.textContent = gameState.singlePlayer ? "Computer Wins:" : "Player O Wins:";
		updateScoreboard();
		gameState.curPlayer = "X";
		clearBoard();
		gameState.xWins = 0;
		gameState.oWins = 0;
		gameState.drawCount = 0;
		updateScoreboard();
	});

	//changes from infinite to finite
	//shows or hides a draw score option 
	//resets score
	infiniteBtn.addEventListener("click", () =>{
		gameState.infiniteMode = !gameState.infiniteMode;
		infiniteBtn.textContent = gameState.infiniteMode ? "Infinite\nMode" : "Finite\nMode";
		drawCountEl.classList.toggle("hidden");
		drawsLabel.classList.toggle("hidden");
		clearBoard();
		gameState.xWins = 0;
		gameState.oWins = 0;
		gameState.drawCount = 0;
		updateScoreboard();
	});

	//sets scoreboard to 0
	clearScoreBtn.addEventListener("click", () =>{
		gameState.xWins = 0;
		gameState.oWins = 0;
		gameState.drawCount = 0;
		updateScoreboard();
	});
}

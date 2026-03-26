//imports respondible for:
//board state updates
//win/lose(ai wins)/draws tracker and detection
//infinte mode 
//ui synchronization
import { gameState, MAX_ACTIVE_PIECES, WINNING_COMBO, } from './gamestate.js';
import { boxes, curTurn, drawCountEl } from './dom.js';

//highlights the oldest active piece
//visually indicates the oldest piece before a move is made
export function highlightOldest(player) {
    if(!gameState.infiniteMode) return;
    let ageArray = player === "X" ? gameState.xAge : gameState.oAge;
    if (ageArray.length === MAX_ACTIVE_PIECES) {
        boxes[ageArray[0]].style.color = "red";
    }
}

//checks if the index is the oldest piece 
export function isOldest(index,player){
    if(player === "X"){
        return gameState.xAge[0] === index;
    }else if(player === "O"){
        return gameState.oAge[0] === index;
    }
    return false;
}

//Clears a box
export function clearBox(index){
    gameState.currBoard[index] = "";
    boxes[index].textContent = "";
    boxes[index].style.color = "white";
}

//resets the enitre board
export function clearBoard(){
    gameState.currBoard = Array(9).fill("");
    gameState.xAge = [];
    gameState.oAge = [];
    gameState.curPlayer = "X";
    gameState.gameActive = true;
    boxes.forEach(box => {
        box.textContent = "";
        box.style.color = "white";
    });
    curTurn.textContent = "Player X's turn";
}

//checks if win, lose or draw
//highlights winning combo
//updates the score board
//end the game
export function checkGameOver(){
    for (let condition of WINNING_COMBO) {
        const [a, b, c] = condition;
        if (gameState.currBoard[a] &&
            gameState.currBoard[a] === gameState.currBoard[b] &&
            gameState.currBoard[a] === gameState.currBoard[c]) {
            boxes[a].style.color = "gold";
            boxes[b].style.color = "gold";
            boxes[c].style.color = "gold";
            gameState.gameActive = false;
            if (gameState.currBoard[a] === "X") {
                gameState.xWins++;
                curTurn.textContent = `Player ${gameState.curPlayer} wins!`;
                updateScoreboard();
                return;
            } else {
                gameState.oWins++;
                if(gameState.singlePlayer){
                    curTurn.textContent = `Computer wins!`;
                }else{
                    curTurn.textContent = `Player ${gameState.curPlayer} wins!`;
                }
                updateScoreboard();
                return;
            }
        }
        //checks for draws
        //will only work in finite mode
        if(!gameState.infiniteMode  && gameState.currBoard.every(cell => cell !== "")){
            gameState.gameActive = false;
            gameState.drawCount++;
            curTurn.textContent = "It's a draw";
            boxes.forEach((boxes,i) => {
                boxes.style.color = "red";
            });
            updateScoreboard();
            return;
        }
    }
}

//updates the scoreboard UI
export function updateScoreboard(){
    document.getElementById("xWins").textContent = gameState.xWins;
    document.getElementById("oWins").textContent = gameState.oWins;
    document.getElementById("drawCount").textContent = gameState.drawCount;
} 

//handles the placing of moves
//in infinite mode ensures mac number of pieces
//uses a queue or FIFO like system
export function placeMove(index, player) {
    let ageArray = player === "X" ? gameState.xAge : gameState.oAge;
    if(gameState.infiniteMode){
        if (ageArray.length === MAX_ACTIVE_PIECES) {
            let oldIndex = ageArray.shift();
            clearBox(oldIndex);
        }
        ageArray.push(index);
    }
    gameState.currBoard[index] = player;
    boxes[index].textContent = player;
}

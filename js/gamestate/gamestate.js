//max pieces and board size
export const MAX_ACTIVE_PIECES = 3;
export const MAX_BOARD = 9;

export const gameState = {
//tracks wins and loses
xWins: 0,
oWins: 0,
drawCount: 0,

//checks if game is over
//turns false once a win or draw happens
gameActive: true,

//tracks the board
//pieces are store here
currBoard: Array(MAX_BOARD).fill(""),

//tracker for move order
xAge: [], 
oAge: [],

//tracks the current turn
curPlayer: "X",

//mode tackers
//vs AI or local(default AI)
//infinite or finite(default infinite)
singlePlayer: true,
infiniteMode: true,
}

//all possible winning moves
export const WINNING_COMBO = [
    [0,1,2], //top row
    [3,4,5], //middle row
    [6,7,8], //bottom row
    [0,3,6], //left column
    [1,4,7], //middle column
    [2,5,8], //right column
    [0,4,8], //top-left to bottom-right
    [2,4,6] //top-right to bottom-left
];

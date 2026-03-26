//centralized DOM references for the application.

//the "boxes" the X and O go in
export const boxes = document.querySelectorAll(".box");

//the current turn status
export const curTurn = document.getElementById("status");

//buttons
export const rBtn = document.getElementById("reset");
export const mBtn = document.getElementById("playerMode");
export const clearScoreBtn = document.getElementById("clearScoreBtn");
export const infiniteBtn = document.getElementById("infiniteBtn");

//player score display
export const xPlayer = document.getElementById("xPlayer");
export const oPlayer = document.getElementById("oPlayer");

//draw trackers
export const drawsLabel = document.getElementById("drawsLabel");
export const drawCountEl = document.getElementById("drawCount");

//set default for buttons 
mBtn.textContent = "Single\nPlayer";
infiniteBtn.textContent = "Infinite\nMode";
clearScoreBtn.textContent = "Clear\nScores";
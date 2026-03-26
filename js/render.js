//imports respondible for:
//event binding
//dom refernces
//game logic to highlight oldet
//game state logic
import { allEvents } from './event/event.js';
import { curTurn, infiniteBtn } from './gamestate/dom.js';
import { highlightOldest } from './gamestate/gamelogic.js';
import { gameState } from './gamestate/gamestate.js';

//intitalze applications only after the DOM is loaded
//make sures all elements(buttons, trackers, etc)
//prevents null refernces 
document.addEventListener("DOMContentLoaded", () => {
    //set inital UI state
    //displays players turn
    //label infinite button
    curTurn.textContent = "Player X's turn";
    infiniteBtn.textContent = "Infinite\nMode";
    //register all events listeners
    allEvents();
    //ensures UI is synchronized with the underlying state on initial load
    highlightOldest(gameState.curPlayer);
});

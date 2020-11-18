// TicTacToe game logic
// Benny Boyle, 11/2020

// DOM 
let indexes = [0, 1, 2];
let defaultVal = '--';
console.log(status);

var start = function () {
  addAllButtons();
  addStatus();
  addReset();
  addScoreboard();
}

var addAllButtons = function () {
  for (let rowIndex of indexes) {
    let newRow = document.createElement('div');
    newRow.classList.add(rowIndex);
    for (let column of indexes) {
      let button = makeButton(3 * rowIndex + column);
      newRow.appendChild(button);
    }
    document.body.appendChild(newRow);
  }
}

var makeButton = function (...classnames) {
  let button = document.createElement('button');
  button.innerHTML = defaultVal;
  button.onclick = pressed.bind(button);
  button.classList.add('button');
  classnames.map(classname => button.classList.add(classname));
  return button;
}

var pressed = function() {
  this.innerHTML = p1Turn() ? 'X' : 'O';
  this.disabled = true;
  moveUpdate(this.classList[1]);
}

var addStatus = function () {
  let status = document.createElement('div');
  status.innerHTML = 'Game in progress!';
  status.classList.add('status');
  document.body.appendChild(status);
}

var addReset = function () {
  let reset = document.createElement('button');
  reset.innerHTML = 'Reset';
  reset.classList.add('reset');
  reset.onclick = resetGame;
  document.body.appendChild(reset);
}

var addScoreboard = function () {
  let scoreboard = document.createElement('div');
  scoreboard.classList.add('scoreboard');
  document.body.appendChild(scoreboard);
  updateScoreboard();
}

var updateScoreboard = function () {
  let scores = getPlayerScores();
  let scoreboard = document.getElementsByClassName('scoreboard')[0];
  scoreboard.innerHTML = `Player 1: ${scores[0]}, Player 2: ${scores[1]}`;
}

var modifyAllButtons = function (action) {
  let buttons = document.getElementsByClassName('button');
  [...buttons].map(button => action(button));
}

var buttonDisable = function (button) {
  button.disabled = true;
}

var buttonEnable = function (button) {
  button.disabled = false;
  button.innerHTML = defaultVal;
}

var endGame = function (player) {
  modifyAllButtons(buttonDisable);
  if (!player) { status.innerHTML = "It's a Tie!"; }
  else { status.innerHTML = player + ' wins!'; }
  updateScoreboard();
}

var resetGame = function () {
  modifyAllButtons(buttonEnable);
  status.innerHTML = 'Game in progress!';
  gameReset();
}

// Logic 
let p1 = true;
let p1Board = [];
let p2Board = [];
let p1Score = 0;
let p2Score = 0;
let winningBoards = [['0', '1', '2'], ['3', '4', '5'], ['6', '7', '8'], ['0', '3', '6'], 
                    ['1', '4', '7'], ['2', '5', '8'], ['0', '4', '8'], ['2', '4', '6']];

var moveUpdate = function(pos) {
  p1 ? p1BoardUpdate(pos) : p2BoardUpdate(pos);
  p1 = !p1;
  gameEndCheck();
}

var gameEndCheck = function () {
  if (winningBoards.reduce((result, board) => result = result || subarrIncluded(board, p1Board), false)) { 
    p1Score++;
    endGame('P1');
  } else if (winningBoards.reduce((result, board) => result = result || subarrIncluded(board, p2Board), false)) { 
    p2Score++;
    endGame('P2');
  } else if (p1Board.length === 5) {
    endGame();
  }
}

var gameReset = function () {
  p1Board = [];
  p2Board = [];
  p1 = !p1;
}

var p1Turn = function () {
  return p1;
}

var p1BoardUpdate = function (val) {
  p1Board.push(val);
}

var p2BoardUpdate = function (val) {
  p2Board.push(val);
}

var getPlayerScores = function () {
  return [p1Score, p2Score];
}

// Helper Functions
var subarrIncluded = function (a, b) {
  return a.reduce((result, val) => result = result && b.includes(val), true);
}

// Initial setup call
start();


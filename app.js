// TicTacToe game logic
// Benny Boyle, 11/2020

// DOM 
let indexes = [0, 1, 2];
let defaultVal = '--';

var makeButton = function (...classnames) {
  let button = document.createElement('button');
  button.innerHTML = defaultVal;
  button.onclick = updateButton.bind(button);
  button.classList.add('button');
  classnames.map(classname => button.classList.add(classname));
  return button;
}

var updateButton = function() {
  this.innerHTML = p1Turn() ? 'X' : 'O';
  this.disabled = true;
  moveUpdate(this.classList[1]);
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

var modifyAllButtons = function (action) {
  let buttons = document.getElementsByClassName('button');
  console.log([...buttons]);
  [...buttons].map(button => action(button));
}

var buttonDisable = function (button) {
  button.disabled = true;
}

var buttonEnable = function (button) {
  button.disabled = false;
  button.innerHTML = defaultVal;
}

var gameEnd = function () {
  modifyAllButtons(buttonDisable);
}

var reset = function () {
  modifyAllButtons(buttonEnable);
  document.getElementsByClassName('result')[0].innerHTML = 'Game in progress!';
  gameReset();
}

// Logic 
let p1 = true;
let p1Board = [];
let p2Board = [];
let winningBoards = [['0', '1', '2'], ['3', '4', '5'], ['6', '7', '8'], ['0', '3', '6'], 
                    ['1', '4', '7'], ['2', '5', '8'], ['0', '4', '8'], ['2', '4', '6']];

var moveUpdate = function(pos) {
  p1 ? p1BoardUpdate(pos) : p2BoardUpdate(pos);
  p1 = !p1;
  gameEndCheck();
}

var gameEndCheck = function () {
  let result = document.getElementsByClassName('result')[0];
  if (winningBoards.reduce((result, board) => result = result || arraysEqual(board, p1Board), false)) { 
    gameEnd();
    result.innerHTML = 'P1 Wins!'; 
  } else if (winningBoards.reduce((result, board) => result = result || arraysEqual(board, p2Board), false)) { 
    console.log('p2 wins');
    gameEnd();
    result.innerHTML = 'P2 Wins!'; 
  } else if (p1Board.length === 5) {
    console.log('tie');
    gameEnd();
    result.innerHTML = "It's a Tie!";
  }
}

var gameReset = function () {
  p1Board = [];
  p2Board = [];
  p1 = true;
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

// Helper Functions
var arraysEqual = function (a, b) {
  return a.reduce((result, val) => result = result && b.includes(val), true);
}

// Initial setup call
addAllButtons();


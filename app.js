let p1 = true;
let p1Board = [];
let p2Board = [];
let indexes = [0, 1, 2];
let winningBoards = [['0', '1', '2'], ['3', '4', '5'], ['6', '7', '8'], ['0', '3', '6'], 
                    ['1', '4', '7'], ['2', '5', '8'], ['0', '4', '8'], ['2', '4', '6']];

var makeButton = function (...classnames) {
  let button = document.createElement('button');
  button.innerHTML = 'E';
  button.onclick = updateButton.bind(button);
  button.classList.add('button');
  classnames.map(classname => button.classList.add(classname));
  return button;
}

var updateButton = function() {
  console.log('pressed');
  this.innerHTML = p1 ? 'X' : 'O';
  this.disabled = true;
  let buttonVal = this.classList[1];
  if (p1) { p1Board.push(buttonVal); }
  else { p2Board.push(buttonVal); }
  gameEndCheck();
  p1 = !p1;
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
  button.innerHTML = 'E';
}

var gameEndCheck = function () {
  let result = document.getElementsByClassName('result')[0];

  if (winningBoards.reduce((result, board) => result = result || arraysEqual(board, p1Board), false)) { 
    console.log('p1 wins');
    modifyAllButtons(buttonDisable);
    result.innerHTML = 'P1 Wins!'; 
  } else if (winningBoards.reduce((result, board) => result = result || arraysEqual(board, p2Board), false)) { 
    console.log('p2 wins');
    modifyAllButtons(buttonDisable);
    result.innerHTML = 'P2 Wins!'; 
  } else if (p1Board.length === 5) {
    console.log('tie');
    modifyAllButtons(buttonDisable);
    result.innerHTML = "It's a Tie!'";
  }
}

var gameReset = function () {
  modifyAllButtons(buttonEnable);
  document.getElementsByClassName('result')[0].innerHTML = '';
  p1Board = [];
  p2Board = [];
  p1 = true;
}

var arraysEqual = function (a, b) {
  return a.reduce((result, val) => result = result && b.includes(val), true);
}

var subarrIncluded = function (arr, subarr) {
  if (arr.length > 0 && subarr.length === 0) { return false; }
  return arr.reduce((finder, val) => finder = finder || subarr.includes(val), true);
}

addAllButtons();


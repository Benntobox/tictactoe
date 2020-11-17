let rows = ['top', 'middle', 'bottom'];
let columns = ['left', 'center', 'right']
let curr = 0;

var makeButton = function (...classnames) {
  let button = document.createElement('button');
  button.innerHTML = 'Empty';
  button.onclick = updateButton.bind(button);
  classnames.map(classname => button.classList.add(classname));
  return button;
}

var updateButton = function() {
  console.log('pressed');
  this.innerHTML = "X";
}

var addAllButtons = function () {
  for (let row of rows) {
    let newRow = document.createElement('div');
    newRow.classList.add(row);
    for (let column of columns) {
      let button = makeButton(row, column);
      newRow.appendChild(button);
    }
    document.body.appendChild(newRow);
  }
}

addAllButtons();
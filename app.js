var addButton = function () {
  let button = document.createElement('button');
  button.innerHTML = 'Empty';
  document.appendChild(button);
}

var updateButton = function(button) {
  button.innerHTML = "X";
}
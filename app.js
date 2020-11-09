const ticTacToe = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// const grid = [...document.querySelectorAll(".row div")];
const grid = [...document.querySelectorAll(".row button")];
const ticTacToeDisplay = [
  [grid.slice(0, 3)],
  [grid.slice(3, 6)],
  [grid.slice(6, 9)],
];

function xs(event) {
  event.disabled = true;
  const node = document.createTextNode("x");
  event.appendChild(node);
  let arrayChange = event.getAttribute("value").split("");
  ticTacToe[+arrayChange[0]][+arrayChange[1]] = "x";
  let gameOver = ticTacToe
    .map((x) => x.every((y) => y !== null))
    .every((i) => i == true);

  if (!gameOver) {
    setTimeout(os, 1000, this.event.target);
  }
  win("x");
}

function os(event) {
  const node = document.createTextNode("o");
  let index1 = Math.floor(Math.random() * 3);
  let index2 = Math.floor(Math.random() * 3);

  while (ticTacToe[index1][index2] !== null) {
    index1 = Math.floor(Math.random() * 3);
    index2 = Math.floor(Math.random() * 3);
  }
  ticTacToe[index1][index2] = "o";
  const oPlace = ticTacToeDisplay[index1][0][index2];
  oPlace.appendChild(node);
  oPlace.disabled = true;
  win("o");
}

//Make function to check if there is a winner
function win(letter) {
  verticalChecker(letter);
  horizontalChecker(letter);
  diagonalChecker(letter);
}

//Check verticals
function verticalChecker(letter) {
  for (let i = 0; i < ticTacToe.length; i++) {
    let checker = [];
    let rowIndex = [];
    for (let j = 0; j < ticTacToe[i].length; j++) {
      if (ticTacToe[j][i] == letter) {
        checker.push(letter);
        rowIndex.push([j, i]);
      }
    }
    if (checker.length === 3) {
      alert(letter + " won");

      winDisplay(rowIndex);
    }
  }
}

//Check Horizontal
function horizontalChecker(letter) {
  let checker = ticTacToe.map((x) => x.every((y) => y == letter));

  if (checker.indexOf(true) !== -1) {
    alert(letter + " won");
    let horizontalIndex = (checker.indexOf(true) + "")
      .repeat(3)
      .split("")
      .map(Number);

    let horizontalIndexDirections = horizontalIndex.map((x, i) => [x, i]);
    winDisplay(horizontalIndexDirections);
  }
}

//Check diagonals
function diagonalChecker(letter) {
  let firstDiagonal = [ticTacToe[0][0], ticTacToe[1][1], ticTacToe[2][2]].every(
    (x) => x == letter
  );
  let secondDiagonal = [
    ticTacToe[0][2],
    ticTacToe[1][1],
    ticTacToe[2][0],
  ].every((x) => x == letter);
  if (firstDiagonal || secondDiagonal) {
    alert(letter + " won");
    if (firstDiagonal) {
      winDisplay([
        [0, 0],
        [1, 1],
        [2, 2],
      ]);
    } else {
      winDisplay([
        [0, 2],
        [1, 1],
        [2, 0],
      ]);
    }
  }
}

function winDisplay(indexDirections) {
  let nodeList = [];
  for (let i = 0; i < indexDirections.length; i++) {
    nodeList.push(
      ticTacToeDisplay[indexDirections[i][0]][0][indexDirections[i][1]]
    );
  }
  nodeList.forEach((x) => (x.style.color = "red"));
}

const myNodeList = document.querySelectorAll(".row button");
myNodeList.forEach((x) =>
  x.addEventListener("click", (x) => xs(this.event.target))
);

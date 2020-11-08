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
  verticalChecker("x");
  horizontalChecker("x");
  diagonalChecker("x");
  //win()
}

function os(event) {
  const node = document.createTextNode("o");
  let index1 = Math.floor(Math.random() * 3);
  let index2 = Math.floor(Math.random() * 3);

  console.log(ticTacToe);

  while (ticTacToe[index1][index2] !== null) {
    index1 = Math.floor(Math.random() * 3);
    index2 = Math.floor(Math.random() * 3);
  }
  ticTacToe[index1][index2] = "o";
  const oPlace = ticTacToeDisplay[index1][0][index2];
  oPlace.appendChild(node);
  oPlace.disabled = true;
  verticalChecker("o");
  horizontalChecker("o");
  diagonalChecker("o");
}

//Make function to check if there is a winner
function win() {}

//Check verticals
function verticalChecker(letter) {
  for (let i = 0; i < ticTacToe.length; i++) {
    let checker = [];
    for (let j = 0; j < ticTacToe[i].length; j++) {
      if (ticTacToe[j][i] == letter) {
        checker.push(letter);
      }
    }
    if (checker.length === 3) {
      alert(letter + " won");
    }
  }
}

//Check Horizontal
function horizontalChecker(letter) {
  let checker = ticTacToe.map((x) => x.every((y) => y == letter));
  if (checker.indexOf(true) !== -1) {
    alert(letter + " won");
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
  }
}

const myNodeList = document.querySelectorAll(".row button");
myNodeList.forEach((x) =>
  x.addEventListener("click", (x) => xs(this.event.target))
);
console.log(myNodeList);

let ticTacToe = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const grid = [...document.querySelectorAll(".row button")];
const ticTacToeDisplay = [
  [grid.slice(0, 3)],
  [grid.slice(3, 6)],
  [grid.slice(6, 9)],
];

let oTimer = null;

const userScoreSelector = document.querySelector("#x-score");
let userScore = 0;

const computerScoreSelector = document.querySelector("#o-score");
let computerScore = 0;

function xs(event) {
  event.disabled = true;
  const node = document.createTextNode("x");
  event.appendChild(node);
  let arrayChange = event.getAttribute("value").split("");
  ticTacToe[+arrayChange[0]][+arrayChange[1]] = "x";
  let allSlotsTaken = ticTacToe
    .map((x) => x.every((y) => y !== null))
    .every((i) => i == true);

  if (!allSlotsTaken) {
    //Disable everything if is not game over so the user doesn't click while setTimeout acts
    myNodeList.forEach((x) => (x.disabled = true));
    // oTimer = setTimeout(os, 1000, this.event.target);
    oTimer = setTimeout(os, 1000, this.event.target);
  } else {
    playAgain = setTimeout(restartGame, 1500);
  }
  winChecker("x");
}

function os() {
  //Implement the new defenses one by one
  const node = document.createTextNode("o");
  //Predict a spot that will stop the user from winning

  //stop propagation
  let index1 = null;
  let index2 = null;
  let moveHorizontalChecker = moveHorizontal();
  let moveVerticalChecker = moveVertical();
  let moveDiagonalChecker = moveDiagonal();

  if (moveHorizontalChecker !== undefined) {
    console.log("horizontal condition was used");

    index1 = moveHorizontalChecker[0];
    index2 = moveHorizontalChecker[1];
  } else if (moveVerticalChecker !== undefined) {
    console.log("vertical condition was used");
    index1 = moveVerticalChecker[0];
    index2 = moveVerticalChecker[1];
  } else if (moveDiagonalChecker !== undefined) {
    console.log("diagonal condition was used");
    index1 = moveDiagonalChecker[0];
    index2 = moveDiagonalChecker[1];
  } else {
    console.log("else condition was used");
    index1 = Math.floor(Math.random() * 3);
    index2 = Math.floor(Math.random() * 3);

    while (ticTacToe[index1][index2] !== null) {
      index1 = Math.floor(Math.random() * 3);
      index2 = Math.floor(Math.random() * 3);
    }
  }
  ticTacToe[index1][index2] = "o";
  const oPlace = ticTacToeDisplay[index1][0][index2];
  oPlace.appendChild(node);
  oPlace.disabled = true;
  winChecker("o");

  for (let i = 0; i < ticTacToe.length; i++) {
    for (let j = 0; j < ticTacToe[i].length; j++) {
      if (ticTacToe[i][j] == null) {
        ticTacToeDisplay[i][0][j].disabled = false;
      }
    }
  }
}

function horizontal(letter) {
  for (let i = 0; i < ticTacToe.length; i++) {
    //attack will be try to make 'o' win, defense will try to prevent 'x' from winning
    let letterCount = 0;
    for (let j = 0; j < ticTacToe[i].length; j++) {
      if (ticTacToe[i][j] == letter) {
        letterCount++;
      }
      if (letterCount == 2) {
        if (ticTacToe[i].indexOf(null) != -1) {
          return [i, ticTacToe[i].indexOf(null)];
        }
      }
    }
  }
}

function moveHorizontal() {
  //Attack will always be "o". If a placement of 'o' will make the
  //computer win then that movement will be chosen
  //Defense will always be "x". If the computer can't win it will try to set a defense
  let attack = horizontal("o");
  let defense = horizontal("x");
  return attack !== undefined ? attack : defense;
}

function vertical(letter) {
  for (let i = 0; i < ticTacToe.length; i++) {
    let rowIndex;
    let letterAmount = 0;

    let mappingCheck = Array.from([0, 1, 2]);
    for (let j = 0; j < ticTacToe[i].length; j++) {
      if (ticTacToe[j][i] == letter) {
        letterAmount++;
        rowIndex = i;
      }
    }
    if (letterAmount == 2) {
      mappingCheck = mappingCheck.map((x) => [x, rowIndex]);
      for (let i = 0; i < mappingCheck.length; i++) {
        if (ticTacToe[i][mappingCheck[i][1]] == null) {
          return [i, mappingCheck[i][1]];
        }
      }
    }
  }
}

function moveVertical() {
  let attack = vertical("o");
  let defense = vertical("x");
  return attack !== undefined ? attack : defense;
}

function attackDiagonal() {
  let firstDiagonal = [ticTacToe[0][0], ticTacToe[1][1], ticTacToe[2][2]];
  let secondDiagonal = [ticTacToe[0][2], ticTacToe[1][1], ticTacToe[2][0]];
  if (
    firstDiagonal.indexOf("o") !== firstDiagonal.lastIndexOf("o") &&
    firstDiagonal.indexOf(null) != -1
  ) {
    return [firstDiagonal.indexOf(null), firstDiagonal.indexOf(null)];
  } else if (
    secondDiagonal.indexOf("o") !== secondDiagonal.lastIndexOf("o") &&
    secondDiagonal.indexOf(null) != -1
  ) {
    return [
      secondDiagonal.indexOf(null),
      secondDiagonal.length - 1 - secondDiagonal.indexOf(null),
    ];
  }
}

function defenseDiagonal() {
  let firstDiagonal = [ticTacToe[0][0], ticTacToe[1][1], ticTacToe[2][2]];
  let secondDiagonal = [ticTacToe[0][2], ticTacToe[1][1], ticTacToe[2][0]];
  if (
    firstDiagonal.indexOf("x") !== firstDiagonal.lastIndexOf("x") &&
    firstDiagonal.indexOf(null) != -1
  ) {
    return [firstDiagonal.indexOf(null), firstDiagonal.indexOf(null)];
  } else if (
    secondDiagonal.indexOf("x") !== secondDiagonal.lastIndexOf("x") &&
    secondDiagonal.indexOf(null) != -1
  ) {
    return [
      secondDiagonal.indexOf(null),
      secondDiagonal.length - 1 - secondDiagonal.indexOf(null),
    ];
  }
}

function moveDiagonal() {
  let attack = attackDiagonal();
  let defense = defenseDiagonal();
  return attack !== undefined ? attack : defense;
}

function winChecker(letter) {
  verticalChecker(letter);
  horizontalChecker(letter);
  diagonalChecker(letter);
}

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
      scores(letter);
      //clearTimeout(oTimer)
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
    scores(letter);
    //clearTimeout(oTimer)
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
    scores(letter);
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
    //clearTimeout(oTimer)
  }
}
//Set time out after 2 seconds to play again
let playAgain;
function winDisplay(indexDirections) {
  let winIndexes = [];
  for (let i = 0; i < indexDirections.length; i++) {
    winIndexes.push(
      ticTacToeDisplay[indexDirections[i][0]][0][indexDirections[i][1]]
    );
  }
  myNodeList.forEach((x) => (x.style.color = "#a4aeb0"));
  myNodeList.forEach((x) => (x.disabled = true));
  winIndexes.forEach((x) => (x.style.color = "#eb2f06"));
  clearTimeout(oTimer);
  playAgain = setTimeout(restartGame, 1500);
}

function restartGame() {
  //CLear all slots
  myNodeList.forEach((x) => (x.innerText = ""));
  myNodeList.forEach((x) => (x.style.color = " #0a3d62"));
  for (let i = 0; i < ticTacToe.length; i++) {
    for (let j = 0; j < ticTacToe[i].length; j++) {
      ticTacToe[i][j] = null;
    }
  }
  myNodeList.forEach((x) => (x.disabled = false));
  //Clear all ticTacToe Array
}
function scores(winner) {
  if (winner == "x") {
    userScore++;
  } else {
    computerScore++;
  }
  userScoreSelector.innerHTML = userScore;
  computerScoreSelector.innerHTML = computerScore;
}

const myNodeList = document.querySelectorAll(".row button");
myNodeList.forEach((x) =>
  x.addEventListener("click", (x) => xs(this.event.target))
);

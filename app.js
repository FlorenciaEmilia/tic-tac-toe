let ticTacToe = [
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
    oTimer = setTimeout(os, 1000, this.event.target);
  } else {
    playAgain = setTimeout(restartGame, 1500);
  }
  winChecker("x");
}
//Make algorithm to prevent user winning
//Make algorithm to win
function os(event) {
  const node = document.createTextNode("o");
  //Predict a spot that will stop the user from winning

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
  winChecker("o");

  for (let i = 0; i < ticTacToe.length; i++) {
    for (let j = 0; j < ticTacToe[i].length; j++) {
      if (ticTacToe[i][j] == null) {
        ticTacToeDisplay[i][0][j].disabled = false;
      }
    }
  }
}

//Function defense
function defense() {
  //Check the user moves
  //Check if the user is about to win horizontally
  //It only needs 2 out of 3 to win
  //Predict that win adding a x to the ticTactToe Array
  //Make a copy of the array OR make sure to not modify the array itself to not cause a bug
}

function moveHorizontal() {
  for (let i = 0; i < ticTacToe.length; i++) {
    let amountOfXs = 0;
    let amountOfOs = 0;
    for (let j = 0; j < ticTacToe[i].length; j++) {
      if (ticTacToe[i][j] == "x") {
        amountOfXs++;
      } else if (ticTacToe[i][j] == "o") {
        amountOfOs++;
      }
      //beware of bugs
      if (amountOfXs == 2 || amountOfOs == 2) {
        if (ticTacToe[i].indexOf(null) != -1) {
          //MAKE THIS SHOW ON DISPLAY
          console.log(ticTacToe[i].indexOf(null));
          ticTacToe[i][ticTacToe[i].indexOf(null)] = "o";
        }
      }
    }
  }
}

function moveVertical() {
  for (let i = 0; i < ticTacToe.length; i++) {
    let amountOfXs = 0;
    //let rowIndexXs = [];
    let amountOfOs = 0;
    //let rowIndexOs = [];
    for (let j = 0; j < ticTacToe[i].length; j++) {
      if (ticTacToe[j][i] == "x") {
        amountOfXs++;
        //rowIndexXs.push([j, i]);
      }
      if (ticTacToe[j][i] == "o") {
        amountOfOs++;
        //rowIndexOs.push([j, i]);
      }
    }
    let mappingCheck = Array.from([0, 1, 2], (x) => [x, i]);
    //let openSlot = null;
    let oMove = () => {
      for (let i = 0; i < mappingCheck.length; i++) {
        if (ticTacToe[i][mappingCheck[i][1]] == null)
          ticTacToe[i][mappingCheck[i][1]] = "o";
      }
    };
    if (amountOfOs == 2 || amountOfXs == 2) {
      //Check for possible bugs
      return oMove();
    }
  }
}

//Make function to check if there is a winner
function winChecker(letter) {
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

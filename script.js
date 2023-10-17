let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
/** The document.getElementById() method is a way to access a specific element in the
 *  DOM based on its id attribute. This line fetches the HTML element with the id attribute
 * set to 'playerText' and assigns it to the playerText variable. So now, playerText holds a
 * reference to that element, and you can use it in your script to manipulate or retrieve information
 *  from that element. document: Refers to the global document object, representing the current webpage or the DOM.
.getElementById('playerText'): Is the method being called on the document object, fetching the element with the ID of 'playerText'.
let playerText = ...: Declares a variable named playerText and assigns the result of the document.getElementById('playerText') method 
call to it.*/
let boxes = Array.from(document.getElementsByClassName('box'));
let winnerIndicator = getComputedStyle(document.body).getPropertyValue(
  '--winning-blocks'
);

//console.log(boxes);

const O_TEXT = 'O';
const X_TEXT = 'X';
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);

// function declaraion:
const startGame = () => {
  boxes.forEach(box => box.addEventListener('click', boxClicked));
};

function boxClicked(e) {
  // console.log(e.target); // e.target refers to the actual HTML element that was clicked
  const id = e.target.id; // Getting the ID of the clicked element:

  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (playerHasWon() !== false) {
      playerText.innerText = `${currentPlayer} has won!`;
      let winning_blocks = playerHasWon();
      winning_blocks.map(
        box => (boxes[box].style.backgroundColor = winnerIndicator)
      );

      return;
    }
    currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT;
  }
}
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
function playerHasWon() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition;

    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      return [a, b, c];
    }
  }
  return false;
}

restartBtn.addEventListener('click', restart);

function restart() {
  spaces.fill(null);

  boxes.forEach(box => {
    box.innerText = '';
    box.style.backgroundColor = '';
  });
  playerText.innerText = 'Tic Tac Toe';
  currentPlayer = X_TEXT;
}
startGame();

/*let player1 = X_TEXT;
let player2 = O_TEXT;
let game_over = false;

while (!game_over) {}*/

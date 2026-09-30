// script.js – Simple Tic‑Tac‑Toe logic

/**
 * Game state representation:
 * board: Array of 9 elements, each can be 'X', 'O', or null.
 * currentPlayer: 'X' or 'O'
 */
const board = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;

// Cached DOM elements
const cells = document.querySelectorAll('.cell');
const statusDiv = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');

/** Winning combinations – indices of the board array */
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

/** Update the status message displayed to the players */
function updateStatus(message) {
  statusDiv.textContent = message;
}

/** Reset the board and UI for a new game */
function resetGame() {
  board.fill(null);
  currentPlayer = 'X';
  gameActive = true;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o', 'winning');
  });
  updateStatus("Player X's Turn");
}

/** Highlight the three winning cells */
function highlightWinning(cellsIdx) {
  cellsIdx.forEach(idx => {
    cells[idx].classList.add('winning');
  });
}

/** Check if the current board contains a win or a draw */
function checkGameResult() {
  // Check for a win
  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      // Winner found
      highlightWinning(combo);
      updateStatus(`Player ${board[a]} Wins!`);
      gameActive = false;
      return;
    }
  }
  // Check for draw (no empty cells left)
  if (!board.includes(null)) {
    updateStatus("It's a Draw!");
    gameActive = false;
  }
}

/** Handle a player's click on a cell */
function handleCellClick(event) {
  const cell = event.target;
  const index = parseInt(cell.dataset.index, 10);

  // Ignore click if game over or cell already occupied
  if (!gameActive || board[index]) return;

  // Update board state
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase()); // add 'x' or 'o' class for styling

  // Check for win/draw
  checkGameResult();

  // Switch player if game still active
  if (gameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus(`Player ${currentPlayer}'s Turn`);
  }
}

/** Initialize event listeners */
function init() {
  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
  restartBtn.addEventListener('click', resetGame);
}

// Run init when the DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

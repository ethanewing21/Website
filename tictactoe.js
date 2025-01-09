const cells = document.querySelectorAll('[data-cell]');
const gameStatus = document.getElementById('game-status');
const restartButton = document.getElementById('restart-button');
let isXTurn = true;

const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6]  // Diagonal top-right to bottom-left
];

const checkWin = (currentPlayer) => {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentPlayer);
        });
    });
};

const checkDraw = () => {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o');
    });
};

const handleClick = (e) => {
    const cell = e.target;
    const currentPlayer = isXTurn ? 'x' : 'o';

    // Place the player's mark
    cell.textContent = currentPlayer.toUpperCase();
    cell.classList.add(currentPlayer, 'taken');

    // Check for win or draw
    if (checkWin(currentPlayer)) {
        gameStatus.textContent = `Player ${currentPlayer.toUpperCase()} Wins!`;
        endGame();
        return;
    }

    if (checkDraw()) {
        gameStatus.textContent = "It's a Draw!";
        endGame();
        return;
    }

    // Switch turns
    isXTurn = !isXTurn;
    gameStatus.textContent = `Player ${isXTurn ? 'X' : 'O'}'s Turn`;
};

const endGame = () => {
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
};

const startGame = () => {
    isXTurn = true;
    gameStatus.textContent = "Player X's Turn";
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'taken');
        cell.addEventListener('click', handleClick, { once: true });
    });
};

// Event listeners
restartButton.addEventListener('click', startGame);

// Initialize the game
startGame();

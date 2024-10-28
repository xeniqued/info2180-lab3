document.addEventListener("DOMContentLoaded", function() {
    // Select the New Game button
    const button = document.querySelector('.btn');
    
    // Select the board div and status div
    const board = document.getElementById('board');
    const status = document.getElementById('status');

    // Initialize the scores and game variables
    let scoreX = 0;
    let scoreO = 0;
    let switching = 0; // 0 for X, 1 for O
    let boardState = Array(9).fill('');
    let gameOver = false; // Flag to prevent further gameplay if there's a winner

    //Initally hide the gameboard
    board.style.display = 'none';

    const originalStatus = "Move your mouse over a square and click to play an X or an O.";

    // Add event listener for the New Game button
    button.addEventListener('click', function() {
        // Display the gameboard when the New Game button is clicked
        board.style.display = 'grid';

        // Reset all game variables
        switching = 0;
        gameOver = false; // Reset the gameOver flag
        boardState.fill(''); // Clear the board state

        // Clear the board visually and remove the X and O classes
        const cells = board.querySelectorAll('div');
        cells.forEach(cell => {
            cell.textContent = ''; // Clear the content
            cell.classList.remove('X', 'O', 'hover'); // Remove any classes
        });

        //Reset the Status
        status.textContent = originalStatus;
        status.classList.remove('you-won');
    });

    // Setup game board interactions
    const cells = board.querySelectorAll('div');
    cells.forEach((cell, index) => {
        cell.classList.add('square'); // Apply initial square class to each cell

        // Handle cell clicks for placing X or O
        cell.addEventListener('click', function() {
            if (cell.textContent === '' && !gameOver) {
                if (switching === 0) {
                    cell.textContent = 'X';
                    cell.classList.add('X');
                    boardState[index] = 'X';
                    switching = 1;
                } else {
                    cell.textContent = 'O';
                    cell.classList.add('O');
                    boardState[index] = 'O';
                    switching = 0;
                }

                // Check if we have a winner after the move
                const winner = checkWinner();
                if (winner) {
                    gameOver = true; // Set gameOver flag to true
                    status.classList.add('you-won');
                    status.textContent = `Congratulations! ${winner} is the Winner!`;
                } 
                
                else if (boardState.every(cell => cell !== '')) 
                {
                    // If all cells are filled and no winner, it's a draw
                    gameOver = true;
                    status.classList.add('you-won');
                    status.textContent = "It's a draw!";
                }
            }
        });

        // Add hover effect to the cells
        cell.addEventListener('mouseover', function() {
            if (cell.textContent === '' && !gameOver) {
                cell.classList.add('hover');
            }
        });

        // Remove hover effect when the mouse leaves
        cell.addEventListener('mouseout', function() {
            cell.classList.remove('hover');
        });
    });

    // Function to check if there's a winner
    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let combo of winningCombinations) {
            const [a, b, c] = combo;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return boardState[a]; // Return 'X' or 'O' as the winner
            }
        }
        return null; // No winner
    }
});

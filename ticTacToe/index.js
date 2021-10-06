// add event listener on the window object to listen for the DOMContentLoaded event
// Makes sure that this js file is first loaded on the browser before the html page

window.addEventListener('DOMContentLoaded', () => {

    // Saving references to all needed html elements using DOM APIs

    // For the tiles we are wrappng this around with the from function because querySelectorAll returns a node like object 

    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');


    


    //Create an empty array that will act as the board.
    let board = ['', '', '', '', '', '', '', '', ''];
    //Store the current player which can be X or O
    let currentPlayer = 'X';
    // Store if we have end game result or is the game is still active
    let isGameActive = true;


    // End-game states
    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';


    /*
        Indexes within the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */


    // Lists all the possible winning combinations
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    /*
    123
    456
    789
    xxx
    */
    function handleResultValidation() {
        // Checks if we have a winner or not by looping through the winningConditions array and for every sub array

        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
                // if any element is empty we will skip using continue
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
                // if they are equal it changes the roundWon to true, and exits the loop
            }
        }

    if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

    if (!board.includes(''))
        announce(TIE);
    }

    const announce = (type) => {
        // Helps announce a winner
        // Receives a string called 'type'to modify the announcers in the html 
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        announcer.classList.remove('hide');
        // Removes the 'hide' class to show the announcer to the user
    };

    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }

        return true;
    };

    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        // First removes the classList of the current player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        // Changes the currentPlayer to X if it was O or O if it was X
        playerDisplay.innerText = currentPlayer;
        // Update playerDisplay 
        playerDisplay.classList.add(`player${currentPlayer}`);
        // Update currentPlayer with appropriate class
    }


    // Represents a turn in the game
    
    
    const userAction = (tile, index) => {
        if(isValidAction(tile) && isGameActive) {
            // First checks to make sure the action is valid & whether the game is active or not
            tile.innerText = currentPlayer;
            //Sets the innerText to the current player X or O
            tile.classList.add(`player${currentPlayer}`);
            // Sets the class based on the currentPlayer
            updateBoard(index);
            // Call and  update the board array
            handleResultValidation();
            // Runs handleResultValidation to check whether there is a winner or not
            changePlayer();
            // Call the changePlayer function to switch turns with currentPlayer to next player
        }
    }
    
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }


    // Go through tiles array, and attach an EventListener, so when the tile is clicked on, userAction function will be called to log the tile and index
    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);
});

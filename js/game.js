'use strict'

const MINE = '🧨'

var gBoard;
var gLevel;
var gGame;

// start the game
function onInit(size, minesCount) {

    gLevel = {
        SIZE: size,
        MINES: minesCount
    }

    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }


    gBoard = buildBoard()
    setRandomBombs();
    setMinesNegsCount(); // Count for each non-bomb cell how many bombs cells are around him.
    renderBoard(gBoard)
}


//build the board
function buildBoard() {
    var Board = []

    for (var i = 0; i < gLevel.SIZE; i++) {
        Board.push([])
        for (var j = 0; j < gLevel.SIZE; j++) {
            Board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: true
            }
        }
    }
    // console.table(Board)
    return Board
}
// RENDER THE BOARD !
function renderBoard(Board) {
    var strHTML = ''
    console.log(Board.length);
    for (var i = 0; i < Board.length; i++) {
        strHTML += `<tr>\n`
        for (var j = 0; j < Board[0].length; j++) {
            var currCell = Board[i][j]
            var strClass = getClassName({ i: i, j: j })

            var boardBtn = ' ';

            strHTML += `\t<td id="td" onclick="onCellClicked(${i},${j})" class="cell ${strClass}">${boardBtn}</td>`
        }
        strHTML += `</tr>\n`
    }
    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
    console.log(strHTML)
}

function setMinesNegsCount()
{
    for (let i = 0; i < gBoard.length; i++) {
        for(let j = 0;j<gBoard[i].length; j++) {

            // For each cell check cell around him.
            if(!gBoard[i][j].isMine)
            {
                for(let checkedRows = -1;checkedRows < 2; checkedRows++) {
                    for(let checkedCols = -1; checkedCols < 2; checkedCols++) {
                        let x = i+checkedRows // row
                        let y = j+checkedCols // col
                        
                        if(x >= 0 && x < gBoard.length
                            && y >= 0 && y < gBoard[j].length
                                && gBoard[x][y].isMine)
                            {
                                gBoard[i][j].minesAroundCount++;
                            }
                    }
                }
            }
        }
        
    }
}

function onCellClicked(row, col) {

    if(!gBoard[row][col].isShown)
    {
        const objectClassName = getClassName({i: row, j: col});
        const tdObject = document.querySelector("." + objectClassName);
        
        if(!gBoard[row][col].isMine)
            tdObject.innerHTML = gBoard[row][col].minesAroundCount;
        else 
            tdObject.innerHTML = MINE;

        gBoard[row][col].isShown = true;
    }

    if(gBoard[row][col].isMine)
    {
        console.log("Mine ! you lost!!!");
    }
}

function setRandomBombs() {

    for(let i = 0; i<gLevel.MINES;i++)
    {

        const row = getRandomInt(0, gLevel.SIZE); // row: 0 - 3.
        const col = getRandomInt(0, gLevel.SIZE); // col: 0 - 3.

        if (!gBoard[row][col].isMine)
        {
            gBoard[row][col].isMine = true;
            continue;
        } 
        
        // Give random another chance.
        i -= 1;

    }


}
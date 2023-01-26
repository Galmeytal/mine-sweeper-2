'use strict'


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}



function createMat(ROWS, COLS) {
    const mat = []
    for (var i = 0; i < ROWS; i++) {
        const row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}

function getClassName(location) {
    const cellClass = 'cell-' + location.i + location.j
    return cellClass
}

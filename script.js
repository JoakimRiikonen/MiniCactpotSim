const arrow1_div = document.getElementById("arrow1");
const arrow2_div = document.getElementById('arrow2');
const arrow3_div = document.getElementById('arrow3');
const arrow4_div = document.getElementById('arrow4');
const arrow5_div = document.getElementById('arrow5');
const arrow6_div = document.getElementById('arrow6');
const arrow7_div = document.getElementById('arrow7');
const arrow8_div = document.getElementById('arrow8');
const arrowsArray = [arrow1_div,arrow2_div,arrow3_div,arrow4_div,
arrow5_div,arrow6_div,arrow7_div, arrow8_div];
const gridBackground_div = document.getElementById('gridbackground');
const cell1_div = document.getElementById('cell1');
const cell2_div = document.getElementById('cell2');
const cell3_div = document.getElementById('cell3');
const cell4_div = document.getElementById('cell4');
const cell5_div = document.getElementById('cell5');
const cell6_div = document.getElementById('cell6');
const cell7_div = document.getElementById('cell7');
const cell8_div = document.getElementById('cell8');
const cell9_div = document.getElementById('cell9');
const cellsArray = [cell1_div, cell2_div, cell3_div, cell4_div,
cell5_div, cell6_div, cell7_div, cell8_div, cell9_div];
const arrow1cells = [cell7_div, cell8_div, cell9_div];
const arrow2cells = [cell4_div, cell5_div, cell6_div];
const arrow3cells = [cell1_div, cell2_div, cell3_div];
const arrow4cells = [cell1_div, cell5_div, cell9_div];
const arrow5cells = [cell1_div, cell4_div, cell7_div];
const arrow6cells = [cell2_div, cell5_div, cell8_div];
const arrow7cells = [cell3_div, cell6_div, cell9_div];
const arrow8cells = [cell3_div, cell5_div, cell7_div];
const infoText_div = document.getElementById('infotext');
const gamesPlayed_td = document.getElementById('gamesplayed');
const amountWon_td = document.getElementById('amountwon');

const scores = {
    6: 10000,
    7: 36,
    8: 720,
    9: 360,
    10: 80,
    11: 252,
    12: 108,
    13: 72,
    14: 54,
    15: 180,
    16: 72,
    17: 180,
    18: 119,
    19: 36,
    20: 306,
    21: 1080,
    22: 144,
    23: 1800,
    24: 3600
}

var gameDone = false;
var cellsSelected = 0;
var gamesPlayed = 0;
var amountWon = 0;

function setListeners(){
    arrowsArray.forEach(function(arrow){
        arrow.addEventListener("click", function(){
            handleArrowPress(arrow);
        });
        arrow.addEventListener("mouseover", function(){
            handleArrowHover(arrow);
        });
        arrow.addEventListener("mouseout", function(){
            handleArrowHoverOff(arrow);
        });
    })

    cellsArray.forEach(function(cell){
        cell.addEventListener("click", function(){
            handleCellButtonPress(cell);
        });
    });

    document.addEventListener("click", function(){
        if(gameDone){
            newGame();
        }
    })
}

function handleArrow(arrow, functionToBeRan){
    if(!arrow.classList.contains('enabled')){
        return;
    }
    var returnValue;
    switch (arrow.id) {
        case "arrow1":
            returnValue = functionToBeRan(arrow1cells);
            break;
        case "arrow2":
            returnValue = functionToBeRan(arrow2cells);
            break;
        case "arrow3":
            returnValue = functionToBeRan(arrow3cells);
            break;
        case "arrow4":
            returnValue = functionToBeRan(arrow4cells);
            break;
        case "arrow5":
            returnValue = functionToBeRan(arrow5cells);
            break;
        case "arrow6":
            returnValue = functionToBeRan(arrow6cells);
            break;
        case "arrow7":
            returnValue = functionToBeRan(arrow7cells);
            break;
        case "arrow8":
            returnValue = functionToBeRan(arrow8cells);
            break;
    }
    return returnValue;
}

function handleArrowHover(arrow){
    handleArrow(arrow, addGlow);
}

function addGlow(cellList){
    cellList.forEach(function(cell){
        cell.classList.add("glow");
        cell.children[0].classList.add("numberglow");
    });
}

function handleArrowHoverOff(arrow){
    handleArrow(arrow, removeGlow);
}

function removeGlow(cellList){
    cellList.forEach(function(cell){
        cell.classList.remove("glow");
        cell.children[0].classList.remove("numberglow");
    });
}

function handleArrowPress(arrow){
    var sum = handleArrow(arrow, getLineSum);
    if(sum !== undefined){
        endGame(sum);
    }
}

function getLineSum(cellList){
    var sum = 0;
    cellList.forEach(function(cell){
        sum += parseInt(cell.children[0].innerHTML);
    });
    return sum;
}


function handleCellButtonPress(cell_div){
    if(!cell_div.classList.contains('enabled')){
        return;
    }
    selectCell(cell_div);
    if(cellsSelected > 3){
        gotoSelectRowMode();
        setInfoText("Now select a line, payout is based on the total sum of the line");
    }
    else{
        setInfoText("Open " + (4-cellsSelected) + " more cell(s).");
    }
}

function gotoSelectRowMode(){
    //disable cells
    cellsArray.forEach(function(cell){
        cell.classList.remove("enabled");
    });
    //switch highlight
    gridBackground_div.classList.remove("enabled");
    arrowsArray.forEach(function(arrow){
        arrow.classList.add("enabled");
    })
}

function newGame(){
    console.log("starting new game");
    gameDone = false;

    cellsSelected = 0;

    //set cellBackground active
    gridBackground_div.classList.add('enabled');

    // hide all numbers and set cells active
    cellsArray.forEach(function(cell) {
        cell.children[0].classList.remove('shownumber');
        cell.classList.add("enabled");
    });

    //remove glow
    removeGlow(cellsArray);

    //show a random number
    var c = cellsArray[Math.floor(Math.random() * 9)];
    selectCell(c);
    gridNumbers = createRandomCells();
    for (var i = 0; i < 9; i++) {
        cellsArray[i].children[0].innerHTML = gridNumbers[i];
    }

    //set info info
    setInfoText("To begin, open three cells from the eight hidden on the ticket.");
}

function endGame(sum){
    //disable arrows
    arrowsArray.forEach(function(arrow){
        arrow.classList.remove("enabled");
    });
    //show all numbers
    cellsArray.forEach(function(cell){
        cell.children[0].classList.add("shownumber");
    });
    //set games played and amount won
    gamesPlayed++;
    amountWon += scores[sum];
    updateScore();
    //set infoText
    setInfoText("You won " + scores[sum] + "! Click to play again.");
    //set gameDone to true after a small delay
    setTimeout(function(){
        gameDone = true;
    }, 1000);
}

function updateScore(){
    gamesPlayed_td.innerHTML = gamesPlayed;
    amountWon_td.innerHTML = amountWon;
}

function createRandomCells(){
    var numbers = [1,2,3,4,5,6,7,8,9];
    for (var i = 8; i > 0; i--) {
        var j = Math.floor(Math.random() * (i+1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return numbers;
}

function selectCell(cell_div){
    cell_div.children[0].classList.add('shownumber');
    cell_div.classList.remove('enabled');
    cellsSelected++;
}

function setInfoText(text){
    infoText_div.innerHTML = text;
}

function main(){
    setListeners();
    newGame();
}

main();

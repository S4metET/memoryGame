const memoryGameContainer = document.querySelector('.memory-game-container');
const movesCounter = document.querySelector('.moves-counter');
const timeCounter = document.querySelector('.time-counter');
const restartBtns = document.querySelectorAll('.restart-btn');
const gameOverModal = document.querySelector('.gameover-modal');
const gameResultTime = document.querySelector('#game-result-time');
const gameResultMoves = document.querySelector('#game-result-moves');
const continueGameBtn = document.querySelector('#continue-game-btn');
const menuModal = document.querySelector('.btn-modal');
const menuBtn = document.querySelector('.menu-btn');

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8"];
const gameElements = [...numbers, ...numbers];
let moves = 0;
let secondCounter = 0;
let minuteCounter = 0;
let score = 0;
let pairs = [];
let findedElements = [];

function init(){
    hideModal();
    moves = 0;
    secondCounter = 0;
    minuteCounter = 0;
    score = 0;
    pairs = [];
    findedElements = [];
    timeCounter.innerHTML = `${minuteCounter}:0${secondCounter}`;
    movesCounter.innerText = moves;
    memoryGameContainer.innerHTML = '';
    shuffleElements();
    gameElements.forEach(element =>{
        memoryGameContainer.innerHTML += `
            <div class="box" data-number=${element}>
                <span>${element}</span>
            </div>
        `
    });
    bindEvents();
}

menuBtn.addEventListener('click', () => {
    clearInterval(timeInterval);
    menuModal.classList.add('show');
})

continueGameBtn.addEventListener('click',() =>{
    timeInterval = setInterval(gameTimer, 1000);
    menuModal.classList.remove('show');
})

restartBtns.forEach(btn =>{
    btn.addEventListener('click', init);
})

function shuffleElements(){
    gameElements.sort(() => Math.random() - 0.5);
}

function bindEvents(){
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => box.addEventListener('click', elementBoxClicked));
}

function elementBoxClicked(){
    const elementValue = this.dataset.number;
    if(
        (pairs.includes(elementValue) && this.classList.contains(`active`)) ||
        findedElements.includes(elementValue) ||
        pairs.length == 2
    ) return;
    this.classList.add('active')
    pairs.push(elementValue);
    moves++;
    movesCounter.innerText = moves;
    if(pairs.length === 2){
        if(pairs[0] === pairs[1]){
            findedElements.push(pairs[0]);
            score++;
    }
    setTimeout(checkGameStatus, 1000);
}
}

function checkGameStatus(){
    const activeElements = document.querySelectorAll('.active');
    activeElements.forEach((box) => {
        if(findedElements.includes(box.dataset.number)){
            box.classList.add('matched');
        }
        box.classList.remove('active');
    })
    pairs = [];

    if(score === numbers.length){
        gameResultTime.innerHTML = `${minuteCounter}: ${secondCounter}`;
        gameResultMoves.innerHTMK = `${moves} Moves`;
        showModal();
    }
}

let timeInterval = setInterval(() => {
    gameTimer();
},1000)

function gameTimer(){
    if(secondCounter < 10){
        timeCounter.innerHTML = `${minuteCounter}:0${secondCounter}`;
    }
    else{
        timeCounter.innerHTML = `${minuteCounter}:${secondCounter}`;
    }
    secondCounter++;
    if(secondCounter == 60){
        minuteCounter++;
        secondCounter = 0;
    }
}

function showModal(){
    gameOverModal.classList.add('show');
}

function hideModal(){
    gameOverModal.classList.remove('show');
    menuModal.classList.remove('show');
}

init();
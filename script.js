const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let prevHole;
let isTimeout = true;
let score;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const i = Math.floor(Math.random() * holes.length);
    const hole = holes[i];
    if (prevHole == hole) {
        return randomHole(holes);
    }
    prevHole = hole;
    return hole;
}

function showMole() {
    const upTime = randomTime(200, 800);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!isTimeout) showMole();
    }, upTime);
}

function startGame() {
    scoreBoard.textContent = 0;
    isTimeout = false;
    score = 0;
    showMole();
    setTimeout(() => isTimeout = true, 10000);
}

function hit(e) {
    if (!e.isTrusted) return;
    score++;
    scoreBoard.textContent = score;
    this.parentNode.classList.remove('up');
}

moles.forEach((mole) => mole.addEventListener('click', hit));
const hs = document.querySelector('.hs');
const moles = document.querySelectorAll('.mole');
const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const settings = document.querySelector('.settings');
const menu = document.querySelector('.dropdown-menu');
const difficulty = [
    [350, 900],
    [250, 700],
    [150, 500]
];
let score;
let prevHole;
let runtime = 10;
let isTimeout = true;
let difficultyIndex = 0;
let initialHs = localStorage.getItem('hs');
let highscore = (initialHs == null) ? 0 : initialHs;
hs.textContent = highscore;

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
    const upTime = randomTime(difficulty[difficultyIndex][0], difficulty[difficultyIndex][1]);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!isTimeout) showMole();
    }, upTime);
}

function startGame() {
    if (!isTimeout) return;
    const run = runtime;
    scoreBoard.textContent = 0;
    isTimeout = false;
    score = 0;
    showMole();
    setTimeout(() => {
        isTimeout = true;
        if (initialHs !== highscore)
            localStorage.setItem('hs', highscore);
    }, run * 1000);

}

function hit(e) {
    if (!e.isTrusted) return;
    score++;
    if (score > highscore) {
        highscore = score;
        hs.textContent = highscore;
    }
    scoreBoard.textContent = score;
    this.parentNode.classList.remove('up');
}

function settingsAction() {
    settings.classList.toggle('open');
    menu.classList.toggle('show');
}

function saveSettings(e) {
    e.preventDefault();
    const formData = new FormData(menu);
    for (var pair of formData.entries()) {
        if (pair[0] === 'duration') runtime = pair[1];
        if (pair[0] === 'difficulty') difficultyIndex = pair[1];
    }
    settingsAction();
}

moles.forEach((mole) => mole.addEventListener('click', hit));
settings.addEventListener('click', settingsAction);
menu.addEventListener('submit', saveSettings);
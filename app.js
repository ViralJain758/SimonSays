let gameSeq = [];
let userSeq = [];

const btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

const h2 = document.querySelector("h2");

/* ---------- GAME START ---------- */
document.addEventListener("keypress", function () {
  if (!started) {
    started = true;
    setTimeout(levelUp, 500);
  }
});

/* ---------- FLASH EFFECTS ---------- */
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => btn.classList.remove("userflash"), 250);
}

function wrongFlash(btn) {
  btn.classList.add("wrongflash");
  setTimeout(() => btn.classList.remove("wrongflash"), 500);
}

/* ---------- LEVEL UP ---------- */
function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  const randIdx = Math.floor(Math.random() * btns.length);
  const randColor = btns[randIdx];
  const randBtn = document.querySelector(`.${randColor}`);

  gameSeq.push(randColor);
  gameFlash(randBtn);
}

/* ---------- BUTTON PRESS ---------- */
function btnPress() {
  if (!started) return;

  const btn = this;
  const userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  const idx = userSeq.length - 1;

  if (userSeq[idx] === gameSeq[idx]) {
    userFlash(btn);

    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    wrongFlash(btn);
    gameOver();
  }
}

/* ---------- GAME OVER ---------- */
function gameOver() {
  h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Press any key to restart.`;
  document.body.style.backgroundColor = "red";

  setTimeout(() => {
    document.body.style.backgroundColor = "white";
  }, 150);

  reset();
}

/* ---------- RESET ---------- */
function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}

/* ---------- EVENT LISTENERS ---------- */
const allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

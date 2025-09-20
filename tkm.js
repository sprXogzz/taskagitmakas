let userScore = 0;
let computerScore = 0;
let maxRounds = 5;
let currentRound = 0;
let gameActive = false;

let selectedRounds = null;

const resultDiv = document.getElementById("result");
const scoreDiv = document.getElementById("score");
const choiceDisplay = document.getElementById("choiceDisplay");
const choicesDiv = document.getElementById("choices");
const resetBtn = document.getElementById("reset");
const startScreen = document.getElementById("startScreen");
const startBtn = document.getElementById("startBtn");

function selectRounds(rounds) {
  selectedRounds = rounds;
  startBtn.disabled = false;

  document.querySelectorAll('.round-buttons button').forEach(btn => {
    btn.style.background = (parseInt(btn.textContent) === rounds) ? '#1976d2' : '#2196f3';
  });
}

function startGame() {
  if (!selectedRounds) return;
  maxRounds = selectedRounds;
  userScore = 0;
  computerScore = 0;
  currentRound = 0;
  gameActive = true;

  startScreen.style.display = "none";
  choicesDiv.style.display = "block";
  resetBtn.style.display = "block";

  resultDiv.textContent = "";
  scoreDiv.textContent = `Sen: 0 | Bilgisayar: 0 (Toplam ${maxRounds} Tur)`;
  choiceDisplay.innerHTML = "";
}
function play(userChoice, userEmoji) {
  if (!gameActive) return;

  const choices = [
    {name: "taş", emoji: "🪨"},
    {name: "kağıt", emoji: "📄"},
    {name: "makas", emoji: "✂️"}
  ];
  const computer = choices[Math.floor(Math.random() * 3)];

  choiceDisplay.innerHTML = `
    <div class="player">Sen: ${userEmoji}</div>
    <div class="computer">PC: ${computer.emoji}</div>
  `;

  if (userChoice === computer.name) {
    resultDiv.textContent = `🤝 Berabere!`;
  } else if (
    (userChoice === "taş" && computer.name === "makas") ||
    (userChoice === "kağıt" && computer.name === "taş") ||
    (userChoice === "makas" && computer.name === "kağıt")
  ) {
    resultDiv.textContent = `🎉 Kazandın!`;
    userScore++;
  } else {
    resultDiv.textContent = `😢 Kaybettin!`;
    computerScore++;
  }

  currentRound++;
  scoreDiv.textContent = `Sen: ${userScore} | Bilgisayar: ${computerScore} (Tur: ${currentRound}/${maxRounds})`;

  if (currentRound >= maxRounds) {
    gameActive = false;
    if (userScore > computerScore) {
      resultDiv.textContent = `🏆 Oyun bitti! Sen kazandın (${userScore} - ${computerScore}) 🎉`;
    } else if (computerScore > userScore) {
      resultDiv.textContent = `💻 Oyun bitti! Bilgisayar kazandı (${computerScore} - ${userScore}) 😢`;
    } else {
      resultDiv.textContent = `🤝 Oyun bitti! Berabere (${userScore} - ${computerScore})`;
    }
  }
}

function resetGame() {
  gameActive = false;
  userScore = 0;
  computerScore = 0;
  currentRound = 0;
  selectedRounds = null;
  startBtn.disabled = true;

  resultDiv.textContent = "";
  choiceDisplay.innerHTML = "";
  scoreDiv.textContent = "";
  choicesDiv.style.display = "none";
  startScreen.style.display = "block";

  
  document.querySelectorAll('.round-buttons button').forEach(btn => {
    btn.style.background = '#2196f3';
  });
}

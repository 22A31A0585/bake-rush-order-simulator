const orders = [
  ["🎂 Cake", "🍩 Donut"],
  ["🍪 Cookie", "🍩 Donut"],
  ["🍩 Donut", "☕ Coffee"],
  ["🧁 Cupcake", "🍪 Cookie"],
  ["🎂 Cake", "🧁 Cupcake"]
];

let currentOrder = [];
let selectedItems = [];
let timeLeft = 30;
let timerInterval;
let score = 0;
let round = 0;
let playerName = "";
let playerAge = "";

window.onload = () => {
  document.getElementById("theme-select").addEventListener("change", function () {
    const theme = this.value;
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  });

  document.getElementById("start-btn").addEventListener("click", () => {
    const nameInput = document.getElementById("player-name").value.trim();
    const ageInput = document.getElementById("player-age").value.trim();
    if (!nameInput || !ageInput) {
      alert("Please enter both name and age!");
      return;
    }

    playerName = nameInput;
    playerAge = ageInput;
    document.getElementById("player-display").innerText = `${playerName} (Age: ${playerAge})`;
    document.getElementById("menu-screen").style.display = "none";
    document.getElementById("order-area").style.display = "block";

    setupItemButtons();
    startOrder();
  });

  document.getElementById("restart-btn").addEventListener("click", () => {
    score = 0;
    round = 0;
    document.getElementById("final-summary").style.display = "none";
    document.getElementById("order-area").style.display = "block";
    document.getElementById("score-count").innerText = "0";
    startOrder();
  });
};

function startOrder() {
  if (round === 5) {
    document.getElementById("order-area").style.display = "none";
    document.getElementById("summary-text").innerText = `🎉 ${playerName}, you served ${score} out of 5 orders correctly!`;
    document.getElementById("final-summary").style.display = "block";
    return;
  }

  currentOrder = orders[Math.floor(Math.random() * orders.length)];
  document.getElementById("order-item").innerText = currentOrder.join(" + ");
  document.getElementById("customer-face").innerText = "😄";

  timeLeft = 30;
  updateTimer();

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimer();

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      document.getElementById("customer-face").innerText = "😠";
      alert("⏰ Time's up! Customer left 😠");
      round++;
      startOrder();
    }
  }, 1000);
}

function updateTimer() {
  document.getElementById("time-left").innerText = `${timeLeft}s`;
}

function setupItemButtons() {
  selectedItems = [];
  document.querySelectorAll(".item-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedItems.push(btn.innerText.trim());
      btn.classList.add("selected");
    });
  });

  document.getElementById("serve-btn").addEventListener("click", () => {
    const sortedSelected = [...selectedItems].sort().join(",");
    const sortedOrder = [...currentOrder].sort().join(",");

    if (sortedSelected === sortedOrder) {
      document.getElementById("customer-face").innerText = "😍";
      alert(`✅ Great job, ${playerName}! Order served correctly!`);
      score++;
    } else {
      document.getElementById("customer-face").innerText = "😢";
      alert(`❌ Oops, ${playerName}. Wrong order.`);
    }

    document.getElementById("score-count").innerText = score;
    selectedItems = [];
    document.querySelectorAll(".item-btn").forEach((btn) => btn.classList.remove("selected"));
    clearInterval(timerInterval);
    round++;
    startOrder();
  });
}

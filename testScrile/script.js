class Observable {
  constructor() {
    this.value = undefined;
    this.callbacks = [];
  }
  onChange(callback) {
    this.callbacks.push(callback);
  }
  set(value) {
    this.value = value;
    this.callbacks.forEach(cb => cb(value));
  }
}

/**
 * Fixes 0.1 + 0.2 = 0.30000000000000004 floats into 0.3.
 */
function fixFloat(f) {
  return Number(f.toFixed(1));
}

const store = {
  balance: new Observable(),
  incrementingBalanceIntervalId: undefined,
};

function getBalance() {
  fetch("https://alex.devel.softservice.org/testapi/").then(async response => {
    if (response.status !== 200) {
      return;
    }
    const data = await response.json();

    store.balance.set(data.balance_usd);
  });
}

const BALANCE_TARGET = 15;
const BALANCE_INCREMENT_AMOUNT = 0.2;
const BALANCE_INCREMENT_INTERVAL = 2000;

function renderProgress(balance) {
  const progressBar = document.querySelector(".progress-bar__value");
  const progress = balance / BALANCE_TARGET;
  progressBar.style.transform = `scaleX(${progress})`;

  const label = document.querySelector(".progress-bar-label");
  label.style.display = "flex";
  document.querySelector(".progress-bar-label__value").innerText = `$${balance}`;

  document.querySelector(".reach__amount").innerText = `$${fixFloat(BALANCE_TARGET - balance)}`;

  if (!store.incrementingBalanceIntervalId) {
    console.log(!store.incrementingBalanceIntervalId)
    store.incrementingBalanceIntervalId = setInterval(() => {
      balance += BALANCE_INCREMENT_AMOUNT;
      store.balance.set(fixFloat(balance));
    }, BALANCE_INCREMENT_INTERVAL);
  } else if (balance >= BALANCE_TARGET) {

    clearInterval(store.incrementingBalanceIntervalId);
    console.log(store.incrementingBalanceIntervalId)

    document.querySelector(".target").style.background = "#00A910";
    document.querySelector(".reach").style.visibility = "hidden";
    label.style.display = "none";
  }
}
store.balance.onChange(renderProgress);
getBalance();
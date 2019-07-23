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

const store = {
  balance: new Observable()
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

function outputBalance() {
  store.balance.onChange(balance => {
    document.querySelector(".initial__value").innerText = `$${balance}`;
    let countProgress = balance * 6.666666666666667 + "%";
    let value = document.querySelector(".progress-bar__value");
    value.style.width = countProgress;
    const interval = setInterval(targetCount, 2000);

    function targetCount() {
      if (balance >= 15) {
        clearInterval(interval);
      } else {
        balance += 0.2;
        console.log(balance);
        countProgress = balance * 6.66666666666667 + "%";
        value = document.querySelector(".progress-bar__value");
        value.style.width = countProgress;
      }
      if (value.style.width > 93 + "%") {
        document.querySelector(".initial").style.display = "flex";
      }
      if (value.style.width == 100 + "%") {
        document.querySelector(".target").style.background = "#00A910";
        document.querySelector(".reach").style.opacity = "0";
      }
    }
  });
}
outputBalance();
getBalance();

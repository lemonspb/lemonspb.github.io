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

function getCount() {
  fetch("https://alex.devel.softservice.org/testapi/").then(async response => {
    if (response.status !== 200) {
      return;
    }
    const data = await response.json();

    store.balance.set(data.balance_usd);
    
  });
  
}

function outputCount() {
  store.balance.onChange(balance => {
    console.log(balance)

    document.querySelector(".initial__value").innerText = `$${balance}`;
    let countProgress = balance *6.666666666666667 + '%'
    let value = document.querySelector(".progress-bar__value");
    value.style.width = countProgress;

var id = setInterval(frame, 2000);

function frame() {
  if (balance >= 15) {
    clearInterval(id);
  } else {
    balance+=0.2;
    let countProgress = balance *6.666666666666667 + '%'
    let value = document.querySelector(".progress-bar__value");
    value.style.width = countProgress;

  }
  if(value.style.width > 93+ '%'){
    document.querySelector('.initial').style.display = 'flex';
    }
  if(value.style.width == 100 +'%'){
    document.querySelector('.target').style.background  = '#00A910';
    document.querySelector('.reach').style.opacity = '0';
  }
}

  });
}
outputCount();
getCount();


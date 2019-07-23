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
    document.querySelector(".initial__value").innerText = `$${balance}`;
    let width = 8;
    let finalWidth = width/5;
    console.log(finalWidth)
    const countProgress = balance * width + "px";
    let value = document.querySelector(".progress-bar__value");
    value.style.width = countProgress;
    var id = setInterval(frame, 2000);

// if(value.style.width == 120 + 'px'){
//   document.querySelector('.target').style.background  = '#00A910';
//   document.querySelector('.reach').style.opacity = '0';
// }
    function frame() {
      if (value.style.width >= 120) {
        clearInterval(id);
      } else {
        finalWidth++; 
        value.style.width = countProgress +  finalWidth + 'px';
      }
    }

  });
}
outputCount();
getCount();


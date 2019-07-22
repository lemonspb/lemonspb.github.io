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
    count: new Observable(),
  };

function getCount(){
         fetch('http://alex.devel.softservice.org/testapi/').then(async response => {
          if (response.status !== 200) {
            return;
          }
          const data = await response.json();
         
          store.count.set(data.balance_usd);
        });
}

function outputCount(){
store.count.onChange((count)=>{
    let width = 8;
   const countProgress = count*width;
   const value = document.querySelector(".progress-bar__value");   
   const interval = setInterval(progress, 1);
   function progress() {
     if (width >= countProgress) {
       clearInterval(interval);
     } else {
       width++; 
       value.style.width = width + 'px'; 
       }
     }
   

}); 
};
outputCount();
getCount();

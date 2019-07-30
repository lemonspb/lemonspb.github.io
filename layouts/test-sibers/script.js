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
  contats: new Observable()
};
fetch(`http://demo.sibers.com/users`).then(async response => {
  if (response.status !== 200) {
    return;
  }
  const data = await response.json();

  store.contats.set(data);
});

store.contats.onChange(contacts => {
   console.log(contacts)
  contacts.forEach(({ name,avatar , phone, address, website}) => {
    const contactBlock = document.createElement('div');
    contactBlock.classList.add('contact');
const  nameContact =  document.createElement('div');
const  avatarContact =  document.createElement('img');
avatarContact.classList.add('contact__img');
avatarContact.setAttribute('src' , avatar);

nameContact.classList.add('contact__name');
nameContact.innerText = name;
contactBlock.appendChild(avatarContact)
contactBlock.appendChild(nameContact)
document.querySelector('.container').appendChild(contactBlock)
contactBlock.addEventListener('click', (e)=>{
    document.getElementById("myModal").style.display = "block";
    document.querySelector('.modal__name').innerText = name;
    document.querySelector('.modal__phone').innerText = phone;
    document.querySelector('.modal__city').innerText = address.city;
    document.querySelector('.modal__website').innerText = website;
    document.querySelector('.modal__country').innerText = address.country;
    document.querySelector('.modal__img').src = avatar;

})
  });
});



window.onclick = function(event) {
    if (event.target == document.getElementById("myModal")) {
        document.getElementById("myModal").style.display = "none";
    }
  }
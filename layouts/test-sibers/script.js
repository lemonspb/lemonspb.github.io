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
  console.log(contacts);
  contacts.forEach(({ id,name, avatar, phone, address, website, email }) => {
    const contactBlock = document.createElement("div");
    contactBlock.classList.add("contact");
    const nameContact = document.createElement("div");
    const avatarContact = document.createElement("img");
    avatarContact.classList.add("contact__img");
    avatarContact.setAttribute("src", avatar);

    nameContact.classList.add("contact__name");
    nameContact.innerText = name;
    contactBlock.appendChild(avatarContact);
    contactBlock.appendChild(nameContact);
    document.querySelector(".container").appendChild(contactBlock);
    contactBlock.addEventListener("click", e => {
      document.getElementById("myModal").style.display = "block";
     document.querySelector(".modal__name").innerText = name;
        document.querySelector(".modal__phone").innerText = phone;
         document.querySelector(".modal__city").innerText = address.city;
         document.querySelector(".modal__website").innerText = website;
        document.querySelector(".modal__country").innerText = address.country;
                               document.querySelector(".modal__img").src = avatar;
          document.querySelector(".modal__email").innerText = email;
 

document.querySelector(".edit").addEventListener("click", () => {
    document.querySelectorAll('.val').forEach( (val)=>{
        val.setAttribute("contenteditable", true);
    
    });
    document.querySelector(".edit").style.display = 'none'; 
    document.querySelector(".save").style.display = 'block';
    
    });
    document.querySelector('.save').addEventListener('click', ()=>{
        document.querySelectorAll('.val').forEach( (val)=>{
            val.setAttribute("contenteditable", false);
    });
    document.querySelector(".edit").style.display = 'block';
    document.querySelector(".save").style.display = 'none'; 
    console.log( document.querySelector(".modal__website").innerText)
  changeContacts(id,document.querySelector(".modal__name").innerText, avatar,  ContactPhone , address, ContactWebsite, Contactmail);
    });
    closeModal();
});
});
});
function closeModal() {
  const modal = document.getElementById("myModal");
  window.addEventListener("click", e => {
    if (event.target === modal) {
      modal.style.display = "none";
      document.querySelector(".edit").style.display = 'block'; 

    }
  });
  document.querySelector(".close").addEventListener("click", () => {
    modal.style.display = "none";
    document.querySelector(".edit").style.display = 'block'; 

  });

}



function changeContacts(id,name, avatar, phone, address, website, email) {
    const contacts = JSON.parse(localStorage.getItem("storageContacts")) || {};
    contacts[id] = [name, avatar, phone, address, website, email];
    localStorage.setItem("storageContacts", JSON.stringify(contacts));
  }
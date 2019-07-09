const searchBlock = document.querySelector('.hero__search-container')
const arrow = document.querySelector(".upArrow");

function headerMove(){
    window.pageYOffset > 265? searchBlock.classList.add('sticky'): searchBlock.classList.remove('sticky');
}

window.addEventListener('scroll', () => {
    headerMove();
    scrollFunction();
});


function scrollFunction() {
  document.body.scrollTop > 20 || document.documentElement.scrollTop > 20? arrow.classList.add('visible') : arrow.classList.remove('visible');
}

arrow.addEventListener('click', (e) => {
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0;
});



document.querySelectorAll(".portfolio-item__title").forEach(title => {
  title.addEventListener("click", e => {
    window.open(`${e.target.nextElementSibling.href}`, "_blank");
  });
});

function scrollNavBlock() {
  window.addEventListener("scroll", () => {
    document.body.scrollTop > 0 || document.documentElement.scrollTop > 0
      ? document.querySelector(".page-nav").classList.add("scroll-nav")
      : document.querySelector(".page-nav").classList.remove("scroll-nav");
  });
}
function NavMobile(){
    document.querySelector('.burger-menu').addEventListener('click', ()=>{
const  navLost = document.querySelector('.page-nav__list')
navLost.classList.toggle('flex');


    });

}
NavMobile()
scrollNavBlock();

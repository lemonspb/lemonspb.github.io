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
function NavMobile() {
  document.querySelector(".burger-menu").addEventListener("click", () => {
    document.querySelector(".page-nav__list").classList.toggle("flex");
  });
  document.querySelectorAll(".page-nav__item").forEach(item => {
    item.addEventListener("click", () => {
      document.querySelector(".page-nav__list").classList.remove("flex");
    });
  });
}
NavMobile();
scrollNavBlock();
AOS.init();

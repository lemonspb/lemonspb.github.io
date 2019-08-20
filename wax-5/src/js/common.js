$(document).ready(function() {
    // slider
  
    $(".posts__inner").slick({
      infinite: true,
      autoplay: true,
      arrows: true,
      prevArrow:
        "<div  class='slick-prev'><i class='fa fa-angle-left' aria-hidden='true'></i></div>",
      nextArrow:
        "<div  class='slick-next'><i class='fa fa-angle-right' aria-hidden='true'></div>",
      slidesToShow: 3,
      slidesToScroll: 3,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
    const MODAL_STATE = {
      block() {
        document.querySelector(".modal").style.display = "block";
      },
      none() {
        document.querySelector(".modal").style.display = "none";
      },
      scrollHidden() {
        document.body.style.overflow = "hidden";
      },
      scrollVisible() {
        document.body.style.overflow = "visible";
      }
    };
  
    function Modal() {
      const CONTENT = document.querySelector(".modal__content");
  
      document.querySelectorAll(".btn")[0].addEventListener("click", () => {
        if (CONTENT.children.length > 2) {
          CONTENT.removeChild(CONTENT.lastChild);
        }
        MODAL_STATE.block();
        MODAL_STATE.scrollHidden();
        const IMG = document.createElement("img");
        IMG.classList.add('modal__img')
        IMG.setAttribute(
          "src",
          `https://pbs.twimg.com/profile_images/1843440492/images__1__400x400.jpg`
        );
        CONTENT.appendChild(IMG);
      });
      document.querySelector(".modal__close").addEventListener("click", () => {
        MODAL_STATE.scrollVisible();
        MODAL_STATE.none();
      });
    }
  
    function zoomImg() {
      document.querySelector(".close").addEventListener("click", () => {
        MODAL_STATE.scrollVisible();
        ZOOM_MODAL.style.display = "none";
      });
      const ZOOM_MODAL = document.querySelector(".zoom");
      document.querySelectorAll(".card--project").forEach(project => {
        project.querySelector(".icon__lupa").addEventListener("click", () => {
          ZOOM_MODAL.style.display = "block";
          document
            .querySelector(".zoom__content")
            .setAttribute(
              "src",
              `${project.querySelector(".card__img img").src}`
            );
          document.querySelector(".zoom__caption").innerHTML = `${
            project.querySelector(".description__title").innerHTML
          }`;
          MODAL_STATE.scrollHidden();
        });
      });
    }
  
    function loadMore() {
      document.querySelector(".load__more").addEventListener("click", () => {
        document.querySelectorAll(".card--project").forEach(card => {
          document
            .querySelector(".projects__inner")
            .appendChild(card.cloneNode(true));
        });
        document
          .querySelector(".projects__inner")
          .parentElement.appendChild(document.querySelector(".load__more"));
        zoomImg();
        if (document.querySelector(".projects__inner").children.length > 19) {
          document.querySelector(".load__more").style.display = "none";
        }
      });
    }
  
    function tabs() {
      const NAV_TAB = document.querySelector(".nav--tabs");
  
      NAV_TAB.querySelectorAll(".btn--tab").forEach((nav, i, arr) => {
        nav.addEventListener("click", e => {
          arr.forEach(toogle => {
            toogle.classList.remove("btn__active");
          });
          nav.classList.add("btn__active");
  
          e.preventDefault();
          document.querySelectorAll(".card--project").forEach(project => {
            project.style.display = "none";
            if (project.dataset.nav.includes(e.target.dataset.nav)) {
              project.style.display = "block";
            }
          });
        });
      });
    }
    function mobileMenu() {
      const NAV_HEADER = document.querySelector(".nav--header");
      const MOBILE_MENU = document.querySelector(".mobile-menu");
      const CLONE_NAV = NAV_HEADER.cloneNode(true);
      const CONTENT = MOBILE_MENU.querySelector(".mobile-menu__content");
      document.querySelector(".burger").addEventListener("click", () => {
        MODAL_STATE.scrollHidden();
  
        MOBILE_MENU.style.display = "block";
        CLONE_NAV.classList.add("flex");
        CLONE_NAV.classList.add("mobile");
        CONTENT.appendChild(CLONE_NAV);
        document
          .querySelector(".mobile-menu__close")
          .addEventListener("click", () => {
            MODAL_STATE.scrollVisible();
  
            MOBILE_MENU.style.display = "none";
            NAV_HEADER.classList.remove("flex");
            CONTENT.removeChild(CONTENT.lastChild);
          });
      });
      window.addEventListener("resize", () => {
        if (window.innerWidth > 1000) {
          CONTENT.removeChild(CONTENT.lastChild);
          MOBILE_MENU.style.display = "none";
          MODAL_STATE.scrollVisible();
  
        }
      });
    }
  
    mobileMenu();
    Modal();
    tabs();
    loadMore();
    zoomImg();
  });
  
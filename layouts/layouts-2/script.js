$(document).ready(function() {
  // slider
  $(".team").slick({
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow: '<div><button class="slide-arrow prev-arrow"></button></div>',
    nextArrow: '<button class="slide-arrow next-arrow"></button>',
    responsive: [
      {
        breakpoint: 940,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 760,
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
  $(".clients__inner").slick({
    dots: true,
    arrows: false,
    autoplay: true,
    infinite: true,
    fade: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1
  });

  ///</slider>
  function headerFixed() {
    window.addEventListener("scroll", () => {
      if (document.documentElement.scrollTop > 0) {
        document.querySelector(".header").classList.add("fixed");
      } else {
        document.querySelector(".header").classList.remove("fixed");
      }
    });
  }

  document.querySelector(".burger__menu").addEventListener("click", () => {
    if (document.querySelector(".nav").classList.contains("toogle")) {
      document.querySelector(".header").style.backgroundColor = "transparent";
    } else {
      document.querySelector(".header").style.backgroundColor =
        "rgba(0, 0, 0, 0.7)";
    }
    document.querySelector(".nav").classList.toggle("toogle");
  });

  function readMore() {
    document.querySelectorAll(".blog__content").forEach(content => {
      content.querySelectorAll(".blog__readmore").forEach(read => {
        read.addEventListener("click", () => {
          content.querySelector(".blog__text").style.height = "100%";
          content.querySelector(".blog__text").style.overflow = "auto";
          read.style.display = "none";
        });
      });
    });
  }

  function Modal() {
    const modal = document.querySelector(".modal");

    document.querySelectorAll(".open-modal").forEach(button => {
      button.addEventListener("click", () => {
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
      });
    });
    document.querySelector(".close").addEventListener("click", () => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    });
    window.addEventListener("click", e => {
      if (e.target.className === "modal") {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }

      window.addEventListener("keydown", e => {
        if (e.keyCode === 27) {
          modal.style.display = "none";
          document.body.style.overflow = "auto";
        }
      });
    });
  }
  function zoomImg() {
    document.querySelectorAll(".works__image").forEach(img => {
      img.querySelector(".btn").addEventListener("click", () => {
        document
          .querySelector(".modal-content__img")
          .setAttribute("src", `${img.querySelector("img").src}`);
        document.querySelector(".modal-img").style.display = "block";
        document.body.style.overflow = "hidden";
      });
    });
    document.querySelector(".close__img").addEventListener("click", () => {
      document.querySelector(".modal-img").style.display = "none";
      document.body.style.overflow = "auto";
    });
  }

  function WorksTab(...tabs) {
    document.querySelectorAll(".nav-title__item").forEach(item => {
      item.addEventListener("click", e => {
        tabs.forEach((tab)=>{
          if (e.target.innerText === tab) {
            document.querySelectorAll(".works__item").forEach(works => {
              works.style.display = "none";
              if (works.classList.contains(tab.toLowerCase())) {
                works.style.display = "block";
              }
            });
          }
        });
      });
    });
  }

  Modal();
  readMore();
  headerFixed();
  zoomImg();
  WorksTab("Branding", "All", "Design", "Development", "Strategy");
});

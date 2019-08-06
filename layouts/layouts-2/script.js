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
    document.querySelector(".nav").classList.toggle("toogle");
  });


function readMore(){
document.querySelectorAll('.blog__content').forEach((content)=>{
content.querySelectorAll('.blog__readmore').forEach((read)=>{
read.addEventListener('click', ()=>{
    content.querySelector('.blog__text').style.height = '100%';
    content.querySelector('.blog__text').style.overflow = 'auto';
    read.style.display = 'none';
});
});
});
}
readMore()
  headerFixed();



});

$('document').ready(function () {
    AOS.init();

    (function headerMenu(){
document.querySelector('.burger-menu').addEventListener('click', function(){
    document.querySelector(".mobile-menu").style.width = "250px";
});
document.querySelector('.btn__close').addEventListener('click', function(){
    document.querySelector(".mobile-menu").style.width = "0px";

})
window.addEventListener('resize', function(){
    if(window.innerWidth >= 993)
        document.querySelector(".mobile-menu").style.width = "0";
    
    
})

    })();









});
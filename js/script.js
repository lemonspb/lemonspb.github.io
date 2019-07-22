document.querySelectorAll('.portfolio-item__title').forEach((title)=>{
    title.addEventListener('click', (e)=>{
            window.open(`${e.target.nextElementSibling.href
            }`, '_blank');
    });
});
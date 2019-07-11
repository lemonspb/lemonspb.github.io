
  

  function differentMovieSearch(request, title) {
    fetch(`${BASE_URL}/movie/${request}?${SEARCH_PARAMS}&page=1`).then(
      async response => {
        if (response.status !== 200) {
          return;
        }
  
        const data = await response.json();
const moveTitile = document.createElement('h3');
moveTitile.classList.add('movie-title');
moveTitile.innerText = title; 

        store.films.set(data.results);
        document.querySelector('.wrapper').appendChild(moveTitile);
      }
    );
  }


 

  document.querySelector('.item-icon.upcoming').addEventListener('click', ()=>{
    differentMovieSearch('upcoming', 'Скоро в кино');
});
document.querySelector('.item-icon.now_playing').addEventListener('click', ()=>{
    differentMovieSearch('now_playing','Сейчас в кино');
});

document.querySelector('.item-icon.popular').addEventListener('click', ()=>{
  differentMovieSearch('popular', "Популярные сейчас");
});
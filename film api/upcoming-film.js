function differentMovieSearch(request, title, page) {
  fetch(`${BASE_URL}/movie/${request}?${SEARCH_PARAMS}&page=${page}`).then(
    async response => {
      if (response.status !== 200) {
        return;
      }

      const data = await response.json();
      const moveTitile = document.createElement("h3");
      moveTitile.classList.add("movie-title");
      moveTitile.innerText = title;

      store.films.set(data.results);
      document.querySelector(".wrapper").appendChild(moveTitile);
    }
  );
}

document.querySelector(".item-icon.upcoming").addEventListener("click", () => {
  differentMovieSearch("upcoming", "Скоро в кино", 1);
  paginationVisible('flex');
});
document
  .querySelector(".item-icon.now_playing")
  .addEventListener("click", () => {
    differentMovieSearch("now_playing", "Сейчас в кино");
    paginationVisible('flex');
  });

document.querySelector(".item-icon.popular").addEventListener("click", () => {
  differentMovieSearch("popular", "Популярные сейчас", 1);
  paginationVisible('flex');
});

document.querySelectorAll(".page-item").forEach(paginator => {
  paginator.addEventListener("click", e => {
    const title = document.querySelector(".movie-title");
    console.log(title.innerText);
    if (title.innerText === "Популярные сейчас") {
      differentMovieSearch("popular", "Популярные сейчас", e.target.innerText);
    }
    if (title.innerText === "Скоро в кино") {
      differentMovieSearch("upcoming", "Скоро в кино", e.target.innerText);
    }
    if (title.innerText === "Сейчас в кино") {
      differentMovieSearch("now_playing", "Сейчас в кино", e.target.innerText);
    }
  });
});

function paginationVisible(visible) {
  document.querySelector(".page-pagination").style.display = visible;
}

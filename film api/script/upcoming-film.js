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
  document.documentElement.scrollTop = 400;
  differentMovieSearch("upcoming", "Скоро в кино", 1);
  paginationVisible("flex");
  scrollDown();
});
document
  .querySelector(".item-icon.now_playing")
  .addEventListener("click", () => {
    differentMovieSearch("now_playing", "Сейчас в кино");
    paginationVisible("flex");
    scrollDown();
  });

document.querySelector(".item-icon.popular").addEventListener("click", () => {
  differentMovieSearch("popular", "Популярные сейчас", 1);
  paginationVisible("flex");
  scrollDown();
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

document.querySelector(".your-best").addEventListener("click", () => {
  document.querySelector(".modal").style.display = "block";
  const bestFilmList = JSON.parse(localStorage.getItem("storageFilm"));
  const addFilm = [];
  const modalContent = document.querySelector(".modal-body");
  for (let key in bestFilmList) {
    addFilm.push(bestFilmList[key]);
  }

  addFilm.forEach((x) => {
    const BestFilm = document.createElement("div");
    BestFilm.classList.add("best-film");
    const BestFilmTitle = document.createElement("h3");
    BestFilmTitle.classList.add("best-film__title");
    BestFilmTitle.innerText = x[0];
    const BestFilmOverlay = document.createElement("div");
    BestFilmOverlay.classList.add("best-film__overlay");
    BestFilmOverlay.innerText = x[2];
    const BestFilmImg = document.createElement("img");
    BestFilmImg.classList.add("best-film__overlay");
    BestFilmImg.setAttribute('src', `${x[1]}`)
    const BestFilmButton = document.createElement("button");
    BestFilmButton.classList.add('best-film__button')
    BestFilmButton.setAttribute("data-id", `${x[3]}`);
    BestFilmButton.innerText = 'удалить';
    BestFilm.appendChild(BestFilmTitle);
    BestFilm.appendChild(BestFilmOverlay);
    BestFilm.appendChild(BestFilmImg);  
    BestFilm.appendChild(BestFilmButton);
    modalContent.appendChild(BestFilm);
    BestFilmButton.addEventListener('click',(e)=>{
      removeFavorite(e.target.dataset.id) 
      e.target.parentNode.remove();
      
    })
  });
});
document.querySelector(".close").addEventListener("click", () => {
  document.querySelector(".modal").style.display = "none";
});
window.addEventListener("click", e => {
  if (e.target === document.querySelector(".modal")) {
    document.querySelector(".modal").style.display = "none";
  }
});

const arrow = document.querySelector(".upArrow");

window.addEventListener("scroll", () => {
  scrollFunction();
});

function scrollFunction() {
  document.body.scrollTop > 200 || document.documentElement.scrollTop > 200
    ? arrow.classList.add("visible")
    : arrow.classList.remove("visible");
}

arrow.addEventListener("click", e => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

function scrollDown() {
  document.documentElement.scrollTop = 800;
  document.body.scrollTop = 800;
}

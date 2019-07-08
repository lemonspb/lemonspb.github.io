/* Utilities */

class Observable {
  constructor() {
    this.value = undefined;
    this.callbacks = [];
  }
  onChange(callback) {
    this.callbacks.push(callback);
  }
  set(value) {
    this.value = value;
    this.callbacks.forEach(cb => cb(value));
  }
}

function requestFilm(url, params, callback) {
  fetch(`${BASE_URL}${url}?${SEARCH_PARAMS}&${params}`).then(async response => {
    if (response.status !== 200) {
      return;
    }
    const data = await response.json();
    callback(data);
  });
}

const API_KEY = "23315c01cb32eba5fcb03d0ad0a1ef43";
const BASE_URL = "https://api.themoviedb.org/3";
const SEARCH_PARAMS = `api_key=${API_KEY}&language=ru`;

const store = {
  films: new Observable(),
  recommendations: new Observable(),
  similar: new Observable(),
  more: new Observable()
};

function searchFilm(film) {
  fetch(`${BASE_URL}/search/movie?query=${film}&${SEARCH_PARAMS}`).then(
    async response => {
      if (response.status !== 200) {
        return;
      }

      const data = await response.json();
      store.films.set(data.results);
    }
  );
}
const wrapper = document.querySelector(".wrapper");
const filmInput = document.querySelector(".film-input");
filmInput.addEventListener("keyup", e => {
  if (e.key === "Enter") {
    searchFilm(filmInput.value);
  }
});
document.querySelector(".search-film").addEventListener("click", () => {
  searchFilm(filmInput.value);
});

[store.films, store.recommendations, store.similar].forEach(filmsObservable => {
  filmsObservable.onChange(films => {
    const filmListNode = document.createElement("div");
    filmListNode.classList.add("film-list");
    while (filmListNode.firstChild) {
      filmListNode.removeChild(filmListNode.firstChild);
    }
    while (wrapper.firstChild) {
      wrapper.removeChild(wrapper.firstChild);
    }
    wrapper.appendChild(filmListNode);

    films.forEach((film, i) => {
      const filmNode = document.createElement("div");
      filmNode.classList.add("film-item");
      const containerImage = document.createElement("div");
      containerImage.classList.add("container-image");
      const overlay = document.createElement("div");
      overlay.classList.add("overlay");
      const poster = document.createElement("img");
      poster.classList.add("image");
      poster.setAttribute(
        "src",
        `https://image.tmdb.org/t/p/w300/${film.poster_path ||
          "9Tl1O1tfeu8zBh1rSS4lPbJzwTM.jpg"}`
      );
      containerImage.appendChild(poster);
      containerImage.appendChild(overlay);
      const nameFilm = document.createElement("div");
      nameFilm.classList.add("name-film");
      nameFilm.innerText = film.title;
      const releaseDate = document.createElement("div");
      releaseDate.classList.add("release-date");
      releaseDate.innerText =
        "дата выхода: " + film.release_date.slice(0, 4) + " год";

      const rating = document.createElement("div");
      rating.classList.add("rating");
      rating.innerText = "рейтинг: " + film.vote_average;
      const divOverview = document.createElement("div");
      divOverview.classList.add("Overview");
      const h3 = document.createElement("h3");
      h3.innerText = "описание";
      h3.style.color = "tomato ";
      divOverview.innerText = film.overview;

      overlay.appendChild(nameFilm);
      overlay.appendChild(releaseDate);
      overlay.appendChild(rating);
      overlay.appendChild(h3);
      overlay.appendChild(divOverview);

      filmNode.appendChild(containerImage);

      const similarBtn = document.createElement("button");
      similarBtn.innerText = "похожие фильмы";
      filmNode.appendChild(similarBtn);

      const recommendedBtn = document.createElement("button");
      recommendedBtn.innerText = "рекомендации";
      filmNode.appendChild(recommendedBtn);

      const moreBtn = document.createElement("button");
      moreBtn.innerText = "подробнее";
      filmNode.appendChild(moreBtn);

      similarBtn.addEventListener("click", e => {
        requestFilm(`/movie/${film.id}/similar`, undefined, data =>
          store.similar.set(data.results)
        );
      });

      moreBtn.addEventListener("click", e => {
        requestFilm(
          `/movie/${film.id}`,
          `append_to_response=credits,videos`,
          data => {

            store.more.set(data);
          }
        );
      });

      recommendedBtn.addEventListener("click", e => {
        requestFilm(`/movie/${film.id}/recommendations`, undefined, data =>{
        console.log(data)

          store.recommendations.set(data.results)
        });
      });

      filmListNode.appendChild(filmNode);
    });
  });
});

store.more.onChange(films => {
  console.log(films);
 
  ///create contaner film
  const containerMoreFilm = document.createElement("div");
  containerMoreFilm.classList.add("container-more");
  const backgroundMoreFilm = document.createElement('div');
  backgroundMoreFilm.classList.add('background-container__more')
  ///containerMoreFilm.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500/${films.backdrop_path})`;

  ///create poster film
  const poster = document.createElement("img");
  poster.classList.add("container-more__poster");
  poster.setAttribute(
    "src",
    `https://image.tmdb.org/t/p/w300/${films.poster_path ||
      "9Tl1O1tfeu8zBh1rSS4lPbJzwTM.jpg"}`
  );

  /// create info film

  const infoFilmBlock = document.createElement("div");
  infoFilmBlock.classList.add("container-more__info");

  /// create info inner
  const infoInner = document.createElement("div");
  infoInner.classList.add("info-inner");

  /// create info inner components
  const titleFilm = document.createElement("h3");
  titleFilm.classList.add("info-inner__title");
  const releaseFilm = document.createElement("span");
  releaseFilm.classList.add("info-inner__release");
  const ratingFilm = document.createElement("div");
  ratingFilm.classList.add("info-inner__rating");
  const overviewFilm = document.createElement("div");
  overviewFilm.classList.add("info-inner__overview");
  /// inner text info inner components
  titleFilm.innerText = films.title;
  ratingFilm.innerText = `Рейтинг зрителей ${films.vote_average}`;
  releaseFilm.innerText = `(${films.release_date.slice(0, 4)})`;
  overviewFilm.innerText = films.overview;

  ////// create genres 
  const innerGenres = document.createElement('div')
  innerGenres.classList.add('info-inner__genres')
  films.genres.forEach((genre)=>{
const genres = document.createElement('span')
genres.classList.add('item-genres');
genres.innerText = genre.name;
innerGenres.appendChild(genres)
  });

 
  //////////////////create actor

  const innerActors = document.createElement("div");
  innerActors.classList.add("info-inner__actors");

  const titleActors = document.createElement("h4");
  titleActors.innerText = "В главной роли";
  innerActors.appendChild(titleActors);

  films.credits.cast.slice(0, 5).forEach(actor => {
    const itemActors = document.createElement("div");
    itemActors.classList.add("actors-item");
    const actorCharacter = document.createElement("span");
    const actorName = document.createElement("span");
    const actorImage = document.createElement("img");
    actorImage.classList.add("actors-img");
    actorCharacter.classList.add("actors-character");
    actorName.classList.add("actors-name");
    actorImage.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
    );
    actorCharacter.innerText = actor.character;
    actorName.innerText = actor.name;
    itemActors.appendChild(actorImage);
    itemActors.appendChild(actorCharacter);
    itemActors.appendChild(actorName);
    innerActors.appendChild(itemActors);
  });
////////////////////////////create  crew
const innerCrew = document.createElement("div");
innerCrew.classList.add("info-inner__crew");
const titleCrew = document.createElement("h4");
  titleCrew.innerText = "Cъемочная группа";
  innerCrew.appendChild(titleCrew);
films.credits.crew.slice(0, 5).forEach(crew => {
    const crewName = document.createElement('div');
    crewName.classList.add('name-crew');
    crewName.innerText = crew.name;
    const crewDepartment = document.createElement('div');
    crewDepartment.classList.add('department-crew');
    crewDepartment.innerText = crew.department;
    const crewImage = document.createElement('img');
    crewImage.classList.add('crew-image');
    crewImage.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w200/${crew.profile_path}`
    );
    const crewItem = document.createElement('div');
    crewItem.classList.add('crew-item');
    crewItem.appendChild(crewImage);
    crewItem.appendChild(crewName);
    crewItem.appendChild(crewDepartment);
    innerCrew.appendChild(crewItem)
});
//////////////append all  
    infoInner.appendChild(titleFilm);
    infoInner.appendChild(releaseFilm);
    infoInner.appendChild(ratingFilm);
    infoInner.appendChild(overviewFilm);
    infoInner.appendChild(innerGenres);
    infoInner.appendChild(innerActors);
    infoInner.appendChild(innerCrew)
    infoFilmBlock.appendChild(infoInner);
    containerMoreFilm.appendChild(poster);
    containerMoreFilm.appendChild(infoFilmBlock);
    backgroundMoreFilm.appendChild(containerMoreFilm);
    document.querySelector('.container-main').appendChild(backgroundMoreFilm)

});

store.films.onChange(() => {
  document.querySelector(".header-hero").style.position = "relative";
});


function closeMoreFilm(){
window.addEventListener('click', (e)=>{
if(e.target.className === 'background-container__more'){
  document.querySelector('.container-main').removeChild(document.querySelector('.container-main').lastChild); 
}
})
window.addEventListener('keydown', (e)=>{
if(e.key  === "Escape"){
  document.querySelector('.container-main').removeChild(document.querySelector('.container-main').lastChild); 
}

})
}

closeMoreFilm()
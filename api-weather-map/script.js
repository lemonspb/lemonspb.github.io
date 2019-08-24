const MAP = L.map("mapid");
const SEARCH_CITY = document.querySelector(".control__search");
const API_KEY = "APPID=9c8eb3371091b748edb50cc9d42feed3";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

L.tileLayer(
  "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
  {
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken:
      "pk.eyJ1IjoibWlzaGFza29wZW5rbyIsImEiOiJjanptcGhocm0wZjAyM25wN3NmZndlYnNrIn0.iRrbRZu8d_zkoLH5VXezAA"
  }
).addTo(MAP.setView([55.75, 37.62], 3));

/* Fetch data */

function SEARCH(city) {
  fetch(`${BASE_URL}/weather?q=${city},ru&units=metric&${API_KEY}`).then(
    async response => {
      if (response.status !== 200) {
        return;
      }
      const data = await response.json();
      store.weather.set(data);
    }
  );
}

fetch(
  `https://gist.githubusercontent.com/gorborukov/0722a93c35dfba96337b/raw/435b297ac6d90d13a68935e1ec7a69a225969e58/russia`
).then(async response => {
  if (response.status !== 200) {
    return;
  }
  const data = await response.json();
  store.listCity.set(data);
});

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

function numberT(n, text) {
  n = Math.abs(n) % 100;
  var n1 = n % 10;

  if (n > 10 && n < 20) {
    return text[2];
  }

  if (n1 > 1 && n1 < 5) {
    return text[1];
  }

  if (n1 === 1) {
    return text[0];
  }

  return text[2];
}

document.querySelector(".control__button").addEventListener("click", () => {
  SEARCH(SEARCH_CITY.value);
  TEMP();
});

document.addEventListener("keydown", e => {
  if (e.keyCode === 13) {
    SEARCH(SEARCH_CITY.value);
    TEMP();
  }
});

const store = {
  weather: new Observable(),
  listCity: new Observable()
};

function TEMP() {
  store.weather.onChange(weather => {
    MAP.setView([weather.coord.lat, weather.coord.lon], 10);
    const MARKER = L.marker([weather.coord.lat, weather.coord.lon]).addTo(MAP);
    MARKER.bindPopup(
      `
    <div class='popup__name'>${weather.name} </div>
  
   <div class='popup__temp'> температура:<span>${Math.round(
     weather.main.temp
   )}&#8451;</span> ${numberT(weather.main.temp, [
        "градус",
        "градуса",
        "градуcов"
      ])}
     </div>
    <img src='http://openweathermap.org/img/wn/${
      weather.weather[0].icon
    }@2x.png' title='${weather.weather[0].main}'></img>
    <div>Местное время ${getDate(weather.timezone)}</div>`
    
    ).openPopup();
  
  });

}



function getDate(timezone) {
  const data = new Date().getUTCHours();

  if (data + timezone / 60 / 60 >= 24) {
    return `0${data + timezone / 60 / 60 - 24}:${new Date().getMinutes()<10? '0'+new Date().getMinutes(): new Date().getMinutes() }`;
  } else {
    return `${data + timezone / 60 / 60}:${new Date().getMinutes()<10? '0'+new Date().getMinutes(): new Date().getMinutes() }`;
  }
}

function insertMark(string, pos, len) {
  
  return `${string.slice(0, pos)}<mark>${string.slice(pos, pos + len)}</mark>${string.slice(pos + len)}`
}
function GetCityList() {
  store.listCity.onChange(listCities => {
    const List = document.querySelector(".listCity");
    const names = listCities.map(c => c.city.trim());
    const unique = Array.from(new Set(names));

    unique.sort().forEach(cityName => {
      const ListItem = document.createElement("li");
      ListItem.classList.add("list__item");
      ListItem.innerHTML = cityName;
      ListItem.addEventListener("click", () => {
        SEARCH(ListItem.innerText);
        TEMP();
      });
      List.append(ListItem);
    });
    SEARCH_CITY.addEventListener("input", () => {
      while (List.firstChild) {
        List.removeChild(List.firstChild);
      }
      unique
        .filter(city =>
          city.toLowerCase().startsWith(SEARCH_CITY.value.toLowerCase())
        )
        .sort()
        .forEach(cityName => {
          const ListItem = document.createElement("li");
          ListItem.classList.add("list__item");
          ListItem.innerHTML = insertMark(cityName, cityName.toLowerCase().startsWith(SEARCH_CITY.value.toLowerCase().length), SEARCH_CITY.value.toLowerCase().length) ;
          ListItem.addEventListener("click", () => {
            SEARCH(ListItem.innerText);
            TEMP();
          });
          List.append(ListItem);
        });
    });
  });
}

GetCityList();
SEARCH();

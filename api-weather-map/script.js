const MAP = L.map("mapid");
const SEARCH_CITY = document.querySelector(".search");
const API_KEY = "APPID=9c8eb3371091b748edb50cc9d42feed3";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

L.tileLayer(
    "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken: "pk.eyJ1IjoibWlzaGFza29wZW5rbyIsImEiOiJjanptcGhocm0wZjAyM25wN3NmZndlYnNrIn0.iRrbRZu8d_zkoLH5VXezAA"
    }
).addTo(MAP.setView([55.75, 37.62], 13));



/* Fetch data */

function SEARCH(city) {
    fetch(`${BASE_URL}/weather?q=${city},ru&units=metric&${API_KEY}`).then(async response => {
        if (response.status !== 200) {
            return;
        }
        const data = await response.json();
        store.weather.set(data);
    });
}


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

document.querySelector(".search_button").addEventListener("click", () => {
    console.log(SEARCH_CITY.value);
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
    weather: new Observable()
};

function TEMP(){
store.weather.onChange(weather=>{
    console.log(weather)
    MAP.setView([weather.coord.lat, weather.coord.lon], 13);
    const marker = L.marker([weather.coord.lat, weather.coord.lon]).addTo(MAP);
   marker.bindPopup(`
   <div class='temp'> температура: ${Math.round(weather.main.temp)} градусов </div>
   ` ).openPopup();
})  
}

SEARCH();

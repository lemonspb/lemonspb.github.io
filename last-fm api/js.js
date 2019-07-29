const API_KEY = "eee301d58fa69f9c700b2aadfb915a71";
const BASE_URL =
  window.location.protocol === "http:"
    ? "http://ws.audioscrobbler.com/2.0"
    : "https://ws.audioscrobbler.com/2.0";
const scrollDown = () => {
  if (document.body.scrollTop <= 100) {
    document.body.scrollTop = 500;
  }
};
("/2.0/?method=tag.gettopartists&tag=disco&api_key=YOUR_API_KEY&format=json");
/* Fetch data */

function fetchArtist(artist) {
  const searchParams = `artist=${artist}&api_key=${API_KEY}&format=json`;

  fetch(`${BASE_URL}/?method=artist.gettopalbums&limit=5&${searchParams}`).then(
    async response => {
      if (response.status !== 200) {
        return;
      }

      const data = await response.json();
      const arrName = data.topalbums.album.map(({ name }) => {
        return name;
      });
      store.albums.set(data.topalbums.album);

      const requests = arrName.map(name => {
        return fetch(
          `${BASE_URL}/?method=album.getinfo&api_key=${API_KEY}&artist=${artist}&album=${name}&format=json`
        ).then(async response => {
          if (response.status !== 200) {
            return;
          }
          const data = await response.json();
          return data;
        });
      });
      const albums = await Promise.all(requests);
      store.albumsData.set(albums);
    }
  );
  fetch(
    `${BASE_URL}/?method=artist.getTopTracks&limit=15&${searchParams}`
  ).then(async response => {
    if (response.status !== 200) {
      return;
    }
    const data = await response.json();
    store.tracks.set(data.toptracks.track);
  });
  fetch(`${BASE_URL}/?method=artist.getTopTags&${searchParams}`).then(
    async response => {
      if (response.status !== 200) {
        return;
      }
      const data = await response.json();
      store.tags.set(data.toptags.tag);
    }
  );
  fetch(`${BASE_URL}/?method=artist.getsimilar&limit=20&${searchParams}`).then(
    async response => {
      if (response.status !== 200) {
        return;
      }

      const data = await response.json();
      store.similar.set(data.similarartists.artist);
    }
  );
  fetch(`${BASE_URL}/?method=artist.getinfo&lang=ru&${searchParams}`).then(
    async response => {
      if (response.status !== 200) {
        return;
      }
      const data = await response.json();
      console.log(data);
      store.bio.set(data.artist.bio);
    }
  );
}

/* Utilities */

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

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

/* Init */
function showHeadlines(selector, val) {
  document.querySelectorAll(selector).forEach(title => {
    title.style.display = "block";
  });
  document.querySelectorAll(val).forEach(val => {
    val.innerHTML = searchInput.value;
  });
}

const placeholders = [
  "nirvana",
  "metallica",
  "the doors",
  "кино",
  "u2",
  "сплин",
  "ддт",
  "the cure",
  "soundgarden",
  "nin",
  "психея"
];
const searchInput = document.querySelector(".searchInput");
searchInput.placeholder = `Например ${getRandomItem(placeholders)}`;



document.querySelector(".searchButton").addEventListener("click", () => {
  scrollDown();
  fetchArtist(searchInput.value);
  showHeadlines("h3", ".artist-name");
});

document.addEventListener("keydown", e => {
  if (e.keyCode === 13) {
    // enter
    scrollDown();
    fetchArtist(searchInput.value);
    showHeadlines("h3", ".artist-name");
  }
});

const store = {
  albumsData: new Observable(),
  albums: new Observable(),
  similar: new Observable(),
  tracks: new Observable(),
  bio: new Observable(),
  tags: new Observable(),
  tagsArtist: new Observable(),
  tagsText: new Observable()
};

/* Render the data from the store */
function OutArtistInfo() {
  store.albums.onChange(albums => {
    const html = albums.map(album => {
      const name =
        album.name === "(null)" ? "с этим альбомом что то не так" : album.name;
      const image =
        album.image[3]["#text"] ||
        "https://pp.userapi.com/smNSUs97pLs2BT0jiiKIdEy6uaCJ3lHadeuJsw/qnlRTo3pAb8.jpg?ava=1";
      return `<div class='item-album'><a href=${
        album.url
      }><div>${name}</div></a><div class='album-image'><img src=${image}><div class='album-info'></div></div></div>`;
    });

    document.querySelector(".albums").innerHTML = html.join("");
  });

  store.tracks.onChange(tracks => {
    const html = tracks.map(
      ({ url, name, playcount }) =>
        `<li><a href=${url}>${name}</a> прослушиваний <span>${playcount}</span></li>`
    );

    document.querySelector(".tracks").innerHTML = html.join("");
  });
  store.tags.onChange(tags => {
    tags.length = 20;
    const html = tags.map(({ name }) => `<span class ='tags'>#${name}</span>`);

    document.querySelector(".tags-artist").innerHTML = html.join("");
    document.querySelectorAll(".tags").forEach(tag => {
      tag.addEventListener("click", e => {
        fetch(`${BASE_URL}/?method=tag.gettopartists&tag=${e.target.innerText.slice(
          1
        )}&limit=20&api_key=${API_KEY}&format=json
  `).then(async response => {
          if (response.status !== 200) {
            return;
          }
          const data = await response.json();
          store.tagsText.set(e.target.innerText.slice(1));
          store.tagsArtist.set(data.topartists.artist);

        });
      });
    });
  });
  store.tagsArtist.onChange(topArtist => {
    const TagArtist = document.createElement("div");
    TagArtist.classList.add("artists-by-tags");
    const tagsA = document.querySelector(".tags-artist");
    while (similarBlock.firstChild) {
      similarBlock.removeChild(similarBlock.firstChild);
    }
    topArtist.forEach(top => {

      const topArtistName = document.createElement("span");
      topArtistName.innerText = top.name;
      TagArtist.appendChild(topArtistName);
      topArtistName.addEventListener("click", () => {
        searchInput.value = topArtistName.innerText;
        fetchArtist(searchInput.value);
        showHeadlines("h3", ".artist-name");
      });
      tagsA.parentNode.insertBefore(TagArtist, tagsA.nextSibling);
    });
  });
  store.albumsData.onChange(albums => {
    const albumNodes = document.querySelectorAll(".item-album");
    while (albumNodes.firstChild) {
      albumNodes.removeChild(albumNodes.firstChild);
    }
    albums.forEach((album, i) => {
      const tracksNode = document.createElement("ol");
      tracksNode.classList.add("list-track");
      album.album.tracks.track.forEach(track => {
        const li = document.createElement("li");
        li.classList.add("album-track");
        li.innerText = track.name;
        tracksNode.appendChild(li);
      });
      console.log(tracksNode);
      const albumNode = albumNodes[i];
      // const still = document.createElement('span')
      // still.classList.add('still');
      // still.innerText = 'показать полностью'
      // still.addEventListener('click', ()=>{
      //   albumNode.style.height = 'auto';
      //   tracksNode.style.overflow = 'visible'
      //   tracksNode.style.height = ''
      //   still.style.display = 'none';
      // })
      albumNode.appendChild(tracksNode);
      //       if(tracksNode.childNodes.length > 12){
      //         tracksNode.style.overflow = 'hidden'
      // document.querySelectorAll('.item-album').forEach((x)=>{
      // x.appendChild(still)

      // })
      //       }
    });
  });
  store.similar.onChange(similar => {
    const similarBlock = document.querySelector(".similar");
    // similarBlock.childNodes.forEach(child => {
    //   child.remove();
    // });
    while (similarBlock.firstChild) {
      similarBlock.removeChild(similarBlock.firstChild);
    }
    similar.forEach(name => {
      const span = document.createElement("span");
      span.classList.add("similar-artist");
      span.innerText = name.name;

      span.addEventListener("click", () => {
        searchInput.value = span.innerText;
        fetchArtist(searchInput.value);
        showHeadlines("h3", ".artist-name");
      });
      const similarBlock = document.querySelector(".similar");
      similarBlock.appendChild(span);
    });
  });
  store.bio.onChange(bio => {
    const bioBlock = document.querySelector(".bio");
    while (bioBlock.firstChild) {
      bioBlock.removeChild(bioBlock.firstChild);
    }
    const biography = document.createElement("div");
    biography.innerHTML = bio.content || "We know nothing about this artist.";
    biography.classList.add("biography");
    const still = document.createElement("span");
    still.classList.add("still");
    still.innerText = "показать полностью";
    still.addEventListener("click", () => {
      biography.style.height = "auto";
      still.style.display = "none";
    });
    bioBlock.appendChild(biography);
    bioBlock.appendChild(still);

    if (biography.innerText.length > 300) {
      biography.style.height = 300 + "px";
    }
    else{
      still.style.display = "none";
 
    }
  });
}

OutArtistInfo();

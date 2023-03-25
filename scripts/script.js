import { arrayVideos } from "./data.js";

// console.log(arrayVideos);

// Actualizar el array de videos
const videos =
  JSON.parse(sessionStorage.getItem("videos")) || arrayVideos;

// Mostrar los videos listados en containers.
// 1. Capturamos el contenedor donde vamos a pintar todos los videos.
const containerVideos = document.querySelector(".main_cards");
console.log(containerVideos);

//2. Construir una función que nos permita pintar los videos dentro de un elemento contenedor
const printVideos = (container, videosList) => {
  //Vaciar el contenedor
  container.innerHTML = "";
  //Recorremos el array
  videosList.forEach((video) => {
    container.innerHTML += `
    <article class="videos" data-video="videos" name=${video.id}>
    <figure class="videos__figure" data-video="videos" name=${video.id}>
        <img class="videos__thumbnail" name=${video.id} src=${video.thumbnail} alt=${video.seeIn.title} data-video="videos">
    </figure>
    <div class="container__duration" data-video="videos" name=${video.id}><p class="videos__duration" data-video="videos" name=${video.id}>${video.duration}</p></div>
    <section class="infoVideos" data-video="videos" name=${video.id}>
        <div class="contenedor__title" data-video="videos" name=${video.id}>
            <figure class="infoVideos__figure" data-video="videos" name=${video.id}>
                <img class="infoVideos__imageAuthor" name=${video.id} src=${video.seeIn.imageAuthor} alt=${video.seeIn.author} data-video="videos">
            </figure>
            <h3 class="infoVideos__title" name=${video.id} data-video="videos">${video.seeIn.title}</h3>
        </div>
        <h4 class="infoVideos__author" data-video="videos" name=${video.id}>${video.seeIn.author}</h4>
        <h4 class="infoVideos__viewsAndPublication" data-video="videos" name=${video.id}>${video.seeIn.views} - ${video.seeIn.publicationYear}</h4>
    </section>
    </article>`;
    });
};

// 3. Escuchamos el evento DomContentLoad y luego imprimimos los thumbnails de los videos y su información.
document.addEventListener("DOMContentLoaded", () => {
  printVideos(containerVideos, videos);
});

//4. Escuchar el evento click que lleva a la página de detalles y reproduce el video. 

document.addEventListener("click", (event) => {
  console.log("Hice click en ", event.target);
  if (event.target.classList.contains('videos__thumbnail')) {
      console.log("Hice click aquí");
      console.log(event.target);
      const dataCardAttribute = event.target.getAttribute('data-video');
      console.log(dataCardAttribute);
  
    const id = event.target.getAttribute("name");
    sessionStorage.setItem("idvideo", JSON.stringify(id));
    window.location.href = "./pages/details.html";
  }
});

// 5. Escuchar evento click para filtrar 

let category = {};
document.addEventListener("click", (event) => {
  switch (event.target.id) {
    case "category__Todos":
      category = arrayVideos;
      printVideos(containerVideos, category);
      break;
    case "category__Música":
      category = arrayVideos.filter(
        (video) => video.seeIn.category === "Música"
      );
      printVideos(containerVideos, category);

      break;
    case "category__Programación":
      category = arrayVideos.filter(
        (video) => video.seeIn.category === "Programación"
      );
      printVideos(containerVideos, category);
      break;
    case "category__Antropología":
      category = arrayVideos.filter(
        (video) => video.seeIn.category === "Antropología"
      );
      printVideos(containerVideos, category);
      break;

  }
});


// 6. Búsqueda de videos por título.

const filterByTitle = (termSearch = "", videosList) => {
  const videosFiltered = videosList.filter((video) =>
    video.seeIn.title.toLowerCase().includes(termSearch.toLowerCase())
  );
  const result = videosFiltered.length ? videosFiltered : videosList;

  const messageResult = videosFiltered.length ? false : "Este video no existe.";

  return {
    resultSearch: result,
    messageSearch: messageResult,
  };
};

// 7. Capturamos el form y luego escuchamos el evento submit 
const formSearch = document.querySelector(".header__containerSearch");

formSearch.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputSearch = formSearch.children[0];
  const searchTerm = inputSearch.value;

  if (searchTerm) {
    const searchResult = filterByTitle(searchTerm, arrayVideos);
    printVideos(containerVideos, searchResult.resultSearch);

    if (searchResult.messageSearch) {
      Swal.fire("Oops!", searchResult.messageSearch, "error");
    }
  } else {
    Swal.fire("Oops!", "No has ingresado un video para buscar.", "error");
  }
});
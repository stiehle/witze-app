import { home_icon, star_mini, trash_icon } from "./data";
import { mainSiteEl, mainSiteFooter, start } from "./main";
import { getRatedJokes, saveToLocalStorage } from "./storage";
import "./styles/index.scss";

export function showFavoritesSite() {
  mainSiteEl.innerHTML = `${favoritesSiteNavigation()}${favoritesContent()}${mainSiteFooter()}`;

  const homeEl = document.querySelector(".app_nav__home");
  homeEl.addEventListener("click", start);

  const trashButtonEl = document.querySelectorAll(".favorites-joke__button");
  trashButtonEl.forEach((element) => {
    element.addEventListener("click", deleteFavorite);
  });
}

function favoritesSiteNavigation() {
  const html = `
    <div class="app-nav">
      <div class="app-nav__icons app-nav__icons--left">
        <div class="app_nav__home">${home_icon}</div>      
      </div>
    </div>`;
  return html;
}

function favoritesContent() {
  let html = `
    <div class="app-content">
        <h1 class="app-content__heading app-content__heading--setup">Witze App</h1>
        <h1 class="app-content__heading app-content__heading--setup">Favoriten</h1>
        <div class="favorites-jokes__list">
        `;

  const joke = getSortedRatedJokes();

  joke.forEach((element) => {
    const index = joke.indexOf(element);
    html += `
            <div class="favorites-joke">
                <div class="favorites-joke__wrapper">
                    <div class="favorites-joke__text">${element.text}</div>`;

    html += `
                    <div class="favorites-joke__star">`;
    for (let i = 0; i < element.rating; i++) {
      html += `${star_mini}`;
    }

    html += `       </div>
                </div>
                <button class="favorites-joke__button" data-id="${element.id}">${trash_icon}</button> 
            
            </div>`;
  });

  html += `
        </div>
    </div>`;

  return html;
}

function deleteFavorite(e) {
  const id = e.currentTarget.getAttribute("data-id");
  const joke = getSortedRatedJokes();

  const filteredJoke = joke.filter((element) => Number(id) !== Number(element.id));

  saveToLocalStorage(filteredJoke);
  showFavoritesSite();
}

function getSortedRatedJokes() {
  const joke = getRatedJokes();

  const sortedJokes = joke.sort((A, B) => B.rating - A.rating || B.id - A.id);

  return sortedJokes;
}

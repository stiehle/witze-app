import { star, star_ghost, theme_day_icon, theme_night_icon, setup_icon } from "./data";
import { showFavoritesSite } from "./favorites";
import { getJokeWithCategory, getRandomJoke } from "./jokeAPI";
import { selectedJokeCategory, showSetupSite } from "./setup";
import { getRatedJokes, saveToLocalStorage } from "./storage";
import "./styles/index.scss";

let rating = 0;
let ratingEl = null;
let joke = null;
let colorTheme = "night";

export const mainSiteEl = document.querySelector("#app");

start();

export function start() {
  showMainSite();
  getNewJoke();
  setColorTheme();
}

export function showMainSite() {
  mainSiteEl.innerHTML = `${mainSiteNavigation()}${mainSiteContent()}${mainSiteFooter()}`;

  ratingEl = document.querySelector(".current-joke__rating");
  ratingEl.addEventListener("click", updateRating);

  const favoritesEl = document.querySelector(".app_nav__star");
  favoritesEl.addEventListener("click", showFavoritesSite);

  const setupEl = document.querySelector(".app_nav__setup");
  setupEl.addEventListener("click", showSetupSite);

  const buttonJokeEl = document.querySelector(".current-joke__generate");
  buttonJokeEl.addEventListener("click", getNewJoke);

  const nightDaytEl = document.querySelector(".app_nav__night-day");
  if (colorTheme === "night") {
    nightDaytEl.innerHTML = `${theme_day_icon}`;
  } else {
    nightDaytEl.innerHTML = `${theme_night_icon}`;
  }
  nightDaytEl.addEventListener("click", changeColorTheme);
}

function setColorTheme() {
  if (colorTheme === "night") {
    const bodyEl = document.querySelector("body");
    bodyEl.classList.remove("app__theme-day");
    bodyEl.classList.add("app__theme-night");

    const jokeTextEL = document.querySelector(".current-joke__text");
    jokeTextEL.classList.add("current-joke__text--theme-night");
  } else {
    const bodyEl = document.querySelector("body");
    bodyEl.classList.remove("app__theme-night");
    bodyEl.classList.add("app__theme-day");

    const jokeTextEL = document.querySelector(".current-joke__text");
    jokeTextEL.classList.add("current-joke__text--theme-day");
  }
}

function changeColorTheme() {
  if (colorTheme === "night") {
    colorTheme = "day";
  } else {
    colorTheme = "night";
  }

  start();
}

function mainSiteNavigation() {
  const html = `
  <div class="app-nav">
    <div class="app-nav__icons">
      <div class="app_nav__star">${star}</div>
      <div class="app_nav__night-day"></div>     
      <div class="app_nav__setup">${setup_icon}</div>
    </div>
  </div>`;

  return html;
}

function mainSiteContent() {
  let html = `
  <div class="app-content">
    <h1 class="app-content__heading">Witze App</h1>
    
        <h4 class="app-content__category-text">Kategorie: ${selectedJokeCategory}</h4>    
      <div class="current-joke">
        <div class="current-joke__text">JOKE</div>
      </div>
    
    <div class="current-joke__actions">   
      <div class="current-joke__rating">        
        <div class="current-joke__star">${getStars(rating)}</div>        
      </div>   
        <button class="current-joke__generate">Neuer Witz laden</button>
    </div>
  </div>`;
  return html;
}

export function mainSiteFooter() {
  const html = `
  </div>
    <footer class="app-footer">
      
      <a href="#" class="app-footer__links">Impressum</a>
      <a href="#" class="app-footer__links">Datenschutzerklärung</a>      
      <a href="#" class="app-footer__links">www.stiehle.de</a><br>
      <h4>&copy;2024 www.stiehle.de</h4>
      
    </footer>    
  </div>`;
  return html;
}

function getStars(quantity) {
  const maxStars = 5;
  let html = "";

  for (let i = 0; i < maxStars; i++) {
    if (i < quantity) {
      html += `${star}`;
    } else {
      html = `${star_ghost}` + html;
    }
  }

  return html;
}

function updateRating() {
  rating += 1;

  if (rating > 5) {
    rating = 0;
  }
  showRating(rating);

  joke[0].rating = rating;
  joke[0].id = getNewID();

  saveRatedJokes(joke);
}

function showRating() {
  ratingEl.innerHTML = `<div class="current-joke__star">${getStars(rating)}</div>`;
}

function getNewID() {
  return Date.now();
}

function saveRatedJokes(joke) {
  let ratedJokes = getRatedJokes();

  const foundJoke = ratedJokes.find((element) => element.text === joke[0].text);

  if (foundJoke) {
    if (joke[0].rating !== 0) {
      foundJoke.rating = joke[0].rating;
    } else {
      ratedJokes.pop();
    }
    saveToLocalStorage(ratedJokes);
  } else {
    ratedJokes.push(joke[0]);
    saveToLocalStorage(ratedJokes);
  }
}

async function getNewJoke() {
  const jokeEl = document.querySelector(".current-joke__text");

  const parameter = {
    category: selectedJokeCategory,
  };

  if (selectedJokeCategory) {
    joke = await getJokeWithCategory(parameter);
  } else {
    joke = await getRandomJoke();
  }

  joke.forEach((element) => {
    const text = element.text;

    if (text.length > 250) {
      jokeEl.setAttribute("style", "font-size:1.1rem;");
    } else {
      jokeEl.removeAttribute("style");
    }

    jokeEl.innerHTML = element.text;
  });

  rating = 0;
  showRating(rating);
}

import { home_icon } from "./data";
import { getJokeCategory } from "./jokeAPI";
import { mainSiteEl, mainSiteFooter, start } from "./main";
import "./styles/index.scss";

export let selectedJokeCategory = "";

export async function showSetupSite() {
  mainSiteEl.innerHTML = `${setupSiteNavigation()}${await setupContent()}${mainSiteFooter()}`;

  const homeEl = document.querySelector(".app_nav__home");
  homeEl.addEventListener("click", start);

  const categoryEl = document.querySelectorAll(".app-content__category-wrapper");

  categoryEl.forEach((element) => {
    element.addEventListener("click", selectCategory);
  });

  selectedJokeCategory = "";
}

function setupSiteNavigation() {
  const html = `
    <div class="app-nav">
      <div class="app-nav__icons app-nav__icons--left">
        <div class="app_nav__home">${home_icon}</div>      
      </div>
    </div>`;
  return html;
}

async function setupContent() {
  const jokeCategories = await getJokeCategory();

  let html = `
    <div class="app-content">
        <h1 class="app-content__heading app-content__heading--setup">Witze App</h1>
        <h2 class="app-content__heading app-content__heading--setup">Setup</h2>         
        <h2 class="app-content__heading app-content__heading--setup">Kategorie wählen</h2> 
        <div class="app-content__category-list">
        `;

  jokeCategories.forEach((element) => {
    html += `
        <div class="app-content__category-wrapper" data-category="${element.name}">${element.name}</div>
        `;
  });

  html += `
        </div>
    </div>`;

  return html;
}

function selectCategory(e) {
  const jokeCategory = e.target.getAttribute("data-category");

  const selectedEL = document.querySelector(".app-content__category-wrapper--selected");

  if (selectedEL) {
    selectedEL.classList.remove("app-content__category-wrapper--selected");
    console.log(selectedEL);
  }

  e.target.classList.add("app-content__category-wrapper--selected");

  selectedJokeCategory = jokeCategory;
}

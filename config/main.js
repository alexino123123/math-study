// This changes the title of your site

var sitename = "math study"; // Change this to change the name of your website.
var subtext = "v1.2"; // set the subtext

// more settings in main.css



// END CONFIG
// DO NOT MODIFY IF YOU DO NOT KNOW WHAT YOUR DOING!

import "/./config/custom.js";

var serverUrl1 = "https://gms.parcoil.com";
var currentPageTitle = document.title;
document.title = `${currentPageTitle} | ${sitename}`;
let gamesData = []; 

function displayFilteredGames(filteredGames) {
  const gamesContainer = document.getElementById("gamesContainer");
  gamesContainer.innerHTML = ""; 

  filteredGames.forEach((game) => {
    const gameDiv = document.createElement("div");
    gameDiv.classList.add("game");

    const gameImage = document.createElement("img");
    gameImage.src = `${serverUrl1}/${game.url}/${game.image}`;
    gameImage.alt = game.name;
    gameImage.onclick = () => {
      window.location.href = `play.html?gameurl=${game.url}/`;
    };

    const gameName = document.createElement("p");
    gameName.textContent = game.name;

    gameDiv.appendChild(gameImage);
    gameDiv.appendChild(gameName);
    gamesContainer.appendChild(gameDiv);
  });
}

function displayCookieClickerResult() {
  const gamesContainer = document.getElementById("gamesContainer");

  const gameDiv = document.createElement("div");
  gameDiv.classList.add("game");

  // Optional: add a small placeholder image if you want
  // const gameImage = document.createElement("img");
  // gameImage.src = "config/images/cookie-placeholder.png"; // add an image if available
  // gameImage.alt = "Cookie Clicker";
  // gameDiv.appendChild(gameImage);

  const link = document.createElement("a");
  link.href = "cookieclicker.html";
  link.style.textDecoration = "none";
  link.onclick = () => {
    // allow normal navigation; this is only for clarity if you want analytics or prevention
  };

  const gameName = document.createElement("p");
  gameName.textContent = "Cookie Clicker";
  gameName.style.fontWeight = "700"; // make it stand out

  link.appendChild(gameName);
  gameDiv.appendChild(link);
  gamesContainer.appendChild(gameDiv);
}

function handleSearchInput() {
  const searchInputValue = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const filteredGames = gamesData.filter((game) =>
    game.name.toLowerCase().includes(searchInputValue)
  );
  displayFilteredGames(filteredGames);

  // If nothing matched in games.json but the user searched for cookie/clicker,
  // show the Cookie Clicker link (case-insensitive).
  if (
    filteredGames.length === 0 &&
    (searchInputValue.includes("cookie") ||
      searchInputValue.includes("clicker") ||
      searchInputValue.includes("cookie clicker"))
  ) {
    displayCookieClickerResult();
  }
}


fetch("./config/games.json") 
  .then((response) => response.json())
  .then((data) => {
    gamesData = data;
    displayFilteredGames(data); 
  })
  .catch((error) => console.error("Error fetching games:", error));


document
  .getElementById("searchInput")
  .addEventListener("input", handleSearchInput);

document.getElementById("title").innerHTML = `${sitename}`;

document.getElementById("subtitle").innerHTML = `${subtext}`

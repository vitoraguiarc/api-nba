"use strict";

//div existente no html
const container = document.getElementById("player-card");

const searchPlayers = async (nameTeam) => {
  const url = `https://data.nba.net/data/10s/prod/v1/2021/teams/${nameTeam}/roster.json`;
  const response = await fetch(url);
  const data = await response.json();
  return data.league.standard.players;
};

const playerPoints = async (id) => {
  const url = `https://data.nba.net/data/10s/prod/v1/2021/players/${id}_profile.json`;
  const response = await fetch(url);
  const data = await response.json();
  return data.league.standard.stats.latest.ppg;
};

const playerAssists = async (id) => {
  const url = `https://data.nba.net/data/10s/prod/v1/2021/players/${id}_profile.json`;
  const response = await fetch(url);
  const data = await response.json();
  return data.league.standard.stats.latest.apg;
};

const playerRebounds = async (id) => {
  const url = `https://data.nba.net/data/10s/prod/v1/2021/players/${id}_profile.json`;
  const response = await fetch(url);
  const data = await response.json();
  return data.league.standard.stats.latest.rpg;
};

const criarImg = async (player) => {
  //chamada função para limpar os cards
  limparElementos(container);

  //div que vai conter os cards
  const cards = document.createElement("div");
  cards.classList.add("cards");
  cards.setAttribute('id', `card-${player.personId}`);


  //div para as stats
  const blockStats = document.createElement("div");
  blockStats.classList.add("card-stats");

  //divs para centralizar o ppg
  const containerPpg = document.createElement("div");
  containerPpg.classList.add("cont-ppg");

  const pointsDiv = document.createElement("div");
  pointsDiv.classList.add("div-point");

  const central = document.createElement("div");
  central.classList.add("central");

  //pontos por jogo do player
  const points = document.createElement("p");
  const ppg = await playerPoints(player.personId);
  points.textContent = `${ppg}`;
  const poinsPerGame = document.createElement("h2");
  poinsPerGame.textContent = "PPG";
  containerPpg.appendChild(poinsPerGame);
  pointsDiv.appendChild(points);
  central.appendChild(containerPpg);
  central.appendChild(pointsDiv);

  //divs para centralizar o apg
  const containerApg = document.createElement("div");
  containerApg.classList.add("cont-apg");

  const assistDiv = document.createElement("div");
  assistDiv.classList.add("div-ass");

  const centralAssist = document.createElement("div");
  centralAssist.classList.add("central-ass");

  //assistencias por jogo do player
  const assists = document.createElement("p");
  const apg = await playerAssists(player.personId);
  assists.textContent = `${apg}`;
  const assistsPerGame = document.createElement("h2");
  assistsPerGame.textContent = "APG";
  containerApg.appendChild(assistsPerGame);
  assistDiv.appendChild(assists);
  centralAssist.appendChild(containerApg);
  centralAssist.appendChild(assistDiv);
  

  //divs para centralizar o rpg
  const containerRpg = document.createElement("div");
  containerRpg.classList.add("cont-rpg");

  const rebDiv = document.createElement("div");
  rebDiv.classList.add("div-reb");

  const centralReb = document.createElement("div");
  centralReb.classList.add("central-reb");

  //rebotes por jogo do player
  const rebounds = document.createElement("p");
  const rpg = await playerRebounds(player.personId);
  rebounds.textContent = `${rpg}`;
  const reboundsPerGame = document.createElement("h2");
  reboundsPerGame.textContent = "RPG";
  containerRpg.appendChild(reboundsPerGame);
  rebDiv.appendChild(rebounds);
  centralReb.appendChild(containerRpg);
  centralReb.appendChild(rebDiv);
  
  //adc no bloco de stats
  blockStats.appendChild(central);
  blockStats.appendChild(centralAssist);
  blockStats.appendChild(centralReb);


  //div excluisiva para a imagem
  const blockImg = document.createElement("div");
  blockImg.classList.add("card-imagem");

  //imagem de cada player
  const img = document.createElement("img");
  img.classList.add("style-img");
  img.src = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.personId}.png`;
  blockImg.appendChild(img);

  //explicando sigla
  const contExp = document.createElement('div');
  contExp.classList.add('cont-exp');

  const expPpg = document.createElement('p');
  expPpg.classList.add('exp');
  expPpg.textContent = "PPG - Points per game";

  const expApg = document.createElement('p');
  expApg.classList.add('exp');
  expApg.textContent = "APG - Assists per game";

  const expRpg = document.createElement('p');
  expRpg.classList.add('exp');
  expRpg.textContent = "RPG - Rebounds per game";

  contExp.appendChild(expPpg);
  contExp.appendChild(expApg);
  contExp.appendChild(expRpg);




  //adicionando a img e as stats no card
  cards.appendChild(blockImg);
  cards.appendChild(blockStats);
  cards.appendChild(contExp);

  container.appendChild(cards);
};

const carregarCard = async () => {
  const time = document.getElementById("team").value;

  const players = await searchPlayers(time);
  players.map(criarImg);
};

//function para limpar elementos ao pesquisar
const limparElementos = (elemento) => {
  while (elemento.firstChild) {
    elemento.removeChild(elemento.lastChild);
  }
};

//pega o click no container das imagens dos times
const handleClick = async ({ target }) => {
  //identifica se uma imagem de time foi clicada
  if (target.classList.value === "logos") {
    //chamada função para limpar os cards
    limparElementos(container);

    //buscando players por meio do id da imagem
    const players = await searchPlayers(target.id);

    players.map(criarImg);

    document.getElementById("team").value = target.id;
  }
};

// const modal = () => {

//   const modalAc = document.getElementById(cards)


// }

document.getElementById("buscar").addEventListener("click", carregarCard);

document
  .getElementById("container-teams")
  .addEventListener("click", handleClick);

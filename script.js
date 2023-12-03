// Prikaz svih igara na početku
const games = [
    // Unesite podatke o igrama u JSON formatu
];

const gamesListContainer = document.getElementById('games-list');
const genreFilter = document.getElementById('genre-filter');
const sortFilter = document.getElementById('sort-filter');
const resetFilterButton = document.getElementById('reset-filter');

// Funkcija za prikaz igara
function displayGames(gameList) {
    gamesListContainer.innerHTML = '';

    gameList.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');

        const img = document.createElement('img');
        img.src = game.url;
        img.alt = game.name + ' cover';

        const name = document.createElement('h3');
        name.textContent = game.name;

        const genres = document.createElement('p');
        genres.textContent = 'Žanrovi: ' + game.genres.join(', ');

        const score = document.createElement('p');
        score.textContent = 'Ocena: ' + game.reviewScore;

        gameCard.appendChild(img);
        gameCard.appendChild(name);
        gameCard.appendChild(genres);
        gameCard.appendChild(score);

        gamesListContainer.appendChild(gameCard);
    });
}

// Funkcija za primenu filtera
function applyFilters() {
    let filteredGames = games.slice(); // Kopiranje originalnog niza

    // Filtriranje po žanru
    const selectedGenre = genreFilter.value;
    if (selectedGenre !== 'all') {
        filteredGames = filteredGames.filter(game => game.genres.includes(selectedGenre));
    }

    // Sortiranje po oceni
    const sortOrder = sortFilter.value === 'asc' ? 1 : -1;
    filteredGames.sort((a, b) => sortOrder * (a.reviewScore - b.reviewScore));

    // Prikazivanje rezultata
    displayGames(filteredGames);
}

// Event listeneri za promene u filterima
genreFilter.addEventListener('change', applyFilters);
sortFilter.addEventListener('change', applyFilters);
resetFilterButton.addEventListener('click', () => {
    // Resetovanje filtera
    genreFilter.value = 'all';
    sortFilter.value = 'asc';
    // Ponovno primenjivanje filtera
    applyFilters();
});

// Prikazivanje svih igara na početku
displayGames(games);

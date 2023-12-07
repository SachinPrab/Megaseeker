// app.js

document.addEventListener('DOMContentLoaded', getAiringShows);

function getAiringShows() {
  const apiKey = '9ad6e393df1c4b0f1419750ed91640cd'; // Replace with your actual API key
  const apiUrl = 'https://api.themoviedb.org/3/tv/airing_today';

  axios.get(apiUrl, {
    params: {
      api_key: apiKey,
      language: 'en-US',
      page: 1,
      region: 'IN', // Specify the region (India)
    },
  })
  .then(response => {
    const shows = response.data.results;
    displayShows(shows);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}

function displayShows(shows) {
  const resultsContainer = document.getElementById('results-container');

  shows.forEach(show => {
    const card = createCard(show);
    resultsContainer.appendChild(card);
  });
}


function createCard(show) {
  const card = document.createElement('div');
  card.classList.add('card');

  const img = document.createElement('img');
  img.src = `https://image.tmdb.org/t/p/w500${show.poster_path}`;
  img.alt = show.name;

  const content = document.createElement('div');
  content.classList.add('card-content');

  const title = document.createElement('div');
  title.classList.add('card-title');
  title.innerHTML = `${show.name}<br><br>`;

  const overview = document.createElement('div');
  overview.classList.add('card-overview');
  overview.innerHTML = `${show.overview} <br><br>`;

  const popularity = document.createElement('div');
  popularity.classList.add('card-popularity');
  popularity.innerHTML = `Popularity: ${show.popularity}<br><br>`;

  const firstAirDate = document.createElement('div');
  firstAirDate.classList.add('card-info');
  firstAirDate.innerHTML = `First Air Date: ${show.first_air_date}<br><br>`;

  const voteAverage = document.createElement('div');
  voteAverage.classList.add('card-info');
  voteAverage.innerHTML = `Vote Average: ${show.vote_average}<br><br>`;

  const genres = document.createElement('div');
genres.classList.add('card-info');
genres.textContent = show.genres && show.genres.length
  ? `Genres: ${show.genres.map(genre => genre.name).join(', ')}`
  : 'Genres: N/A';

  const language = document.createElement('p');
    language.textContent = `Original Language: ${show.original_language}`;

    const originalName = document.createElement('p');
    originalName.textContent = `Original Name: ${show.original_name}`;

    const originCountry = document.createElement('p');
    originCountry.textContent = `Origin Country: ${show.origin_country.join(', ')}`;

  content.appendChild(title);
  content.appendChild(overview);
  content.appendChild(firstAirDate);
  content.appendChild(voteAverage);
  content.appendChild(popularity);
  content.appendChild(language);
  content.appendChild(originalName);
  content.appendChild(originCountry);
content.appendChild(genres);

  card.appendChild(img);
  card.appendChild(content);

  return card;
}

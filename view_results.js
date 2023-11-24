document.addEventListener("DOMContentLoaded", async () => {
  const resultsContainer = document.getElementById('results-container');

  try {
      // Retrieve the query parameter from the URL
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const showId = urlParams.get('id'); // Assuming the show ID is passed as a query parameter

      // Fetch seasons data from the API endpoint
      const response = await axios.get(`https://api.tvmaze.com/shows/${showId}/seasons`);
      const seasonsData = response.data;

      // Process and display results on the page
      seasonsData.forEach(season => {
          const seasonDiv = document.createElement('div');

          const seasonImg = document.createElement('img');
          seasonImg.src = season.image.medium;
          seasonImg.alt = `Season ${season.number} poster`;

          // Create elements for each property you want to display
          const seasonNumber = document.createElement('p');
          seasonNumber.innerHTML = `Season Number: ${season.number}`;

          const seasonName = document.createElement('p');
          seasonName.innerHTML = `Season Name: ${season.name}`;

          const seasonEpisodes = document.createElement('p');
          seasonEpisodes.innerHTML = `Episodes: ${season.episodeOrder}`;

          const premiereDate = document.createElement('p');
          premiereDate.innerHTML = `Premiere Date: ${season.premiereDate}`;

          const endDate = document.createElement('p');
          endDate.innerHTML = `End Date: ${season.endDate}`;

          // Add elements to the seasonDiv
          seasonDiv.appendChild(seasonImg);
          seasonDiv.appendChild(seasonNumber);
          seasonDiv.appendChild(seasonName);
          seasonDiv.appendChild(seasonEpisodes);
          seasonDiv.appendChild(premiereDate);
          seasonDiv.appendChild(endDate);

          // Append the seasonDiv to the container
          resultsContainer.appendChild(seasonDiv);
      });
  } catch (error) {
      console.error('Error fetching seasons data:', error);
  }
});

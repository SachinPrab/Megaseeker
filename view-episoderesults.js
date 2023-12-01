document.addEventListener("DOMContentLoaded", async () => {
  const resultsContainer2 = document.getElementById('results-container2');

  try {
      // Retrieve the query parameter from the URL
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const showId = urlParams.get('id'); // Assuming the show ID is passed as a query parameter

      if (!showId) {
          throw new Error("Show ID not found, unable to gather data.");
      }

      // Fetch episodes data from the API endpoint for the specified show
      const response = await axios.get(`https://api.tvmaze.com/shows/${showId}/episodes`);
      const episodesData = response.data;

      // Process and display results on the page
      episodesData.forEach(episode => {
          const episodeDiv = document.createElement('div');

          const episodeImg = document.createElement('img');
          episodeImg.src = episode.image.medium;
          episodeImg.alt = episode.name;
          // Create elements for each property you want to display
          const episodeNumber = document.createElement('p');
          episodeNumber.innerHTML = `Episode Number: ${episode.number}`;

          const episodeName = document.createElement('p');
          episodeName.innerHTML = `Episode Name: ${episode.name}`;

          const episodeSeason = document.createElement('p');
          episodeSeason.innerHTML = `Season: ${episode.season}`;

          const episodeAirdate = document.createElement('p');
          episodeAirdate.innerHTML = `Airdate: ${episode.airdate}`;

          const episodeRuntime = document.createElement('p');
          episodeRuntime.innerHTML = `Runtime: ${episode.runtime} minutes`;

          const episodeSummary = document.createElement('p');
          episodeSummary.innerHTML = `Summary: ${episode.summary}`;

          // Add elements to the episodeDiv
          episodeDiv.appendChild(episodeImg);
          episodeDiv.appendChild(episodeNumber);
          episodeDiv.appendChild(episodeName);
          episodeDiv.appendChild(episodeSeason);
          episodeDiv.appendChild(episodeAirdate);
          episodeDiv.appendChild(episodeRuntime);
          episodeDiv.appendChild(episodeSummary);

          // Append the episodeDiv to the container
          resultsContainer2.appendChild(episodeDiv);
      });
  } catch (error) {
      console.error('Error fetching episodes data:', error);
  }

});

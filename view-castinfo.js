document.addEventListener("DOMContentLoaded", async () => {
  const resultsContainer = document.getElementById('results-container');

  try {
      // Retrieve the query parameter from the URL
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const showId = urlParams.get('id'); // Assuming the show ID is passed as a query parameter

      // Fetch cast data from the API endpoint
      const response = await axios.get(`https://api.tvmaze.com/shows/${showId}/cast`);
      const castData = response.data;

      // Process and display results on the page
      castData.forEach(castMember => {
          const castDiv = document.createElement('div');

          const castImg = document.createElement('img');
          castImg.src = castMember.person.image.medium;
          castImg.alt = castMember.person.name;
          // Create elements for each property you want to display
          const castName = document.createElement('p');
          castName.innerHTML = `Name: ${castMember.person.name}`;

          const castCharacter = document.createElement('p');
          castCharacter.innerHTML = `Character: ${castMember.character.name}`;
          // Add elements to the castDiv
          castDiv.appendChild(castImg);
          castDiv.appendChild(castName);
          castDiv.appendChild(castCharacter);
          

          // Append the castDiv to the container
          resultsContainer.appendChild(castDiv);
      });
  } catch (error) {
      console.error('Error fetching cast data:', error);
  }
});

document.addEventListener("DOMContentLoaded", async () => {
    const resultsContainer = document.getElementById('results-container');

    try {
        // Retrieve the query parameter from the URL
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const showId = urlParams.get('id'); // Assuming the show ID is passed as a query parameter

        // Fetch crew data from the API endpoint
        const response = await axios.get(`https://api.tvmaze.com/shows/${showId}/crew`);
        const crewData = response.data;

        // Process and display results on the page
        crewData.forEach(crewMember => {
            const crewDiv = document.createElement('div');
            crewDiv.className = 'crew-member';

            const crewImg = document.createElement('img');
            crewImg.className = 'crew-img';
            crewImg.src = crewMember.person.image.medium;
            crewImg.alt = crewMember.person.name;

            // Create elements for each property you want to display
            const crewName = document.createElement('p');
            crewName.innerHTML = `Name: ${crewMember.person.name}`;

            const crewType = document.createElement('p');
            crewType.innerHTML = `Type: ${crewMember.type}`;
            
            // Add elements to the crewDiv
            crewDiv.appendChild(crewImg);
            crewDiv.appendChild(crewName);
            crewDiv.appendChild(crewType);

            // Append the crewDiv to the container
            resultsContainer.appendChild(crewDiv);
        });
    } catch (error) {
        console.error('Error fetching crew data:', error);
    }
});
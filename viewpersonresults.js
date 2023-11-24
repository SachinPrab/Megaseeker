document.addEventListener("DOMContentLoaded", async () => {
    const resultsContainer = document.getElementById('results-container');

    try {
        // Retrieve the query parameter from the URL
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const personName = urlParams.get('q'); // Assuming the person's name is passed as a query parameter

        // Fetch person data from the API endpoint
        const response = await axios.get(`https://api.tvmaze.com/search/people?q=${personName}&embed=castcredits&embed=crewcredits`);
        const searchResults = response.data;

        // Clear previous results
        resultsContainer.innerHTML = '';

        // Process and display results on the page
        searchResults.forEach(personData => {
            const personDiv = document.createElement('div');

            const personImg = document.createElement('img');
            personImg.src = personData.person.image?.medium || 'default-image-url';
            personImg.alt = personData.person.name;

            // Create elements for each property you want to display
            const personNameElement = document.createElement('p');
            personNameElement.innerHTML = `Name: ${personData.person.name || 'N/A'}`;

            const personCountryElement = document.createElement('p');
            personCountryElement.innerHTML = `Country: ${personData.person.country.name || "Not Available"}`;
            
            const personBirthdayElement = document.createElement('p');
            personBirthdayElement.innerHTML = `Birthday: ${personData.person.birthday || 'N/A'}`;

            const personDeathdayElement = document.createElement('p');
            personDeathdayElement.innerHTML = `Date of passing: ${personData.person.deathday || 'N/A'}`;

            const personGenderElement = document.createElement('p');
            personGenderElement.innerHTML = `Gender: ${personData.person.gender || "Not Available"}`;
            
            // Add elements to the personDiv
            personDiv.appendChild(personImg);
            personDiv.appendChild(personNameElement);
            personDiv.appendChild(personCountryElement);
            personDiv.appendChild(personBirthdayElement);
            personDiv.appendChild(personDeathdayElement);
            personDiv.appendChild(personGenderElement);
            // Append the personDiv to the container
            resultsContainer.appendChild(personDiv);
        });
    } catch (error) {
        console.error('Error fetching person data', error);
    }
});

function performSearch() {
    const searchInput = document.getElementById('altsearchbar').value;
    window.location.href = `viewpersonresults.html?q=${encodeURIComponent(searchInput)}`;
    return false; // Prevent the form from submitting in the traditional way
}
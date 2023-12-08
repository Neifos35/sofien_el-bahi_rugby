async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

async function displayEvents() {
    try {
        const eventsData = await fetchData('http://127.0.0.1:8000/api/events/');
        const eventsContainer = document.querySelector('#events .card-container');

        eventsData.events.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.classList.add('card');

            const eventContent = document.createElement('p');
            eventContent.textContent = `Match ID: ${event.id}, Start: ${event.start}, Team Home ID: ${event.team_home_id}`;

            eventCard.appendChild(eventContent);
            eventsContainer.appendChild(eventCard);
        });
    } catch (error) {
        console.error('Error displaying events:', error);
    }
}

async function displayStadiums() {
    try {
        const stadiumsData = await fetchData('http://127.0.0.1:8000/api/stadiums/');
        const stadiumsContainer = document.querySelector('#stadiums .card-container');

        stadiumsData.stadiums.forEach(stadium => {
            const stadiumCard = document.createElement('div');
            stadiumCard.classList.add('card');

            const stadiumContent = document.createElement('p');
            stadiumContent.textContent = `Stadium Name: ${stadium.name}, Location: ${stadium.location}`;

            stadiumCard.appendChild(stadiumContent);
            stadiumsContainer.appendChild(stadiumCard);
        });
    } catch (error) {
        console.error('Error displaying stadiums:', error);
    }
}

async function displayTeams() {
    try {
        const teamsData = await fetchData('http://127.0.0.1:8000/api/teams/');
        const teamsContainer = document.querySelector('#teams .card-container');

        teamsData.teams.forEach(team => {
            const teamCard = document.createElement('div');
            teamCard.classList.add('card');

            const teamContent = document.createElement('p');
            teamContent.textContent = `Team ID: ${team.id}, Country: ${team.country}, Nickname: ${team.nickname}`;

            teamCard.appendChild(teamContent);
            teamsContainer.appendChild(teamCard);
        });
    } catch (error) {
        console.error('Error displaying teams:', error);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    displayEvents();
    displayStadiums();
    displayTeams();
});

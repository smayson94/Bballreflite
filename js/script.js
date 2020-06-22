
// let playerImageUrls = [];

const getPlayer = () => {
	searchInput = document.getElementsByClassName('search-input')[0].value;
	fetch(`https://www.balldontlie.io/api/v1/players?search=${searchInput}`) // Call the fetch function passing the url of the API as a parameter
	.then((resp) => resp.json())
	.then(function(data) {
		data.data.forEach(function(element){
			firstName = element.first_name;
			lastName = element.last_name;
			teamName = element.team.full_name;
			playerId = element.id;
			// playerImageUrls.push(getPlayerImage(firstName, lastName));
			createPlayerBlock(firstName, lastName, teamName,playerId);
		})
	})
	.catch(function() {
	    // This is where you run code if the server returns any errors
	console.log('failed');
	});
}

const createPlayerBlock = (firstName, lastName, teamName, playerId) => {

	console.log(firstName);

	playerSection = document.getElementById('players');

	let playerContainer = document.createElement("div");
	playerContainer.className = 'player-container w3-quarter';

	let playerName = document.createElement('h3');
	playerName.className = 'player-name';
	playerName.innerText = firstName + ' ' + lastName

	let team = document.createElement('p');
	team.innerText = teamName;


	let getStats = document.createElement('a');
	getStats.innerText = 'View Stats';
	getStats.id = playerId;
	getStats.href ='#';
	getStats.onclick = function() {
		getPlayerStats(this.id);
	}

	playerContainer.appendChild(playerName);
	playerSection.appendChild(playerContainer);
	playerContainer.appendChild(team);
	playerContainer.appendChild(getStats);

}

// Correct image does not always come up from query
// let getPlayerImage = function(firstName, lastName) {
// 	fetch(`https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?autoCorrect=false&pageNumber=1&pageSize=2&q=nba%20${firstName}%20${lastName}&safeSearch=true`, {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
// 		"x-rapidapi-key": "09c7f2e90emsh2fc32a6e5814c84p1297c4jsn5b276872d112"
// 	}
// 	})
// 	.then((resp) => resp.json())
// 	.then(function(data) {
// 		data.value.forEach(function(element){
// 			console.log(element.url);
// 		})
// 	})
// 	.catch(err => {
// 		console.log(err);
// 	});
// }

const getPlayerStats = (playerStatId) => {
		// search_input = document.getElementsByClassName('search-input')[0].value;
	fetch(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerStatId}`) // Call the fetch function passing the url of the API as a parameter
	.then((resp) => resp.json())
	.then(function(data) {
		console.log(data);
		ppg = data.data[0].pts;
		rebounds = data.data[0].reb;
		assists = data.data[0].ast;

		locationNode = document.getElementById(`${playerStatId}`);
		insertLocation = locationNode.parentElement;

		pointsLabel = document.createElement('h4');
		pointsLabel.className = 'points';
		pointsLabel.innerText = 'PTS: ' + ppg;

		reboundsLabel = document.createElement('h4');
		reboundsLabel.innerText = 'REB: ' + rebounds;

		assistsLabel = document.createElement('h4');
		assistsLabel.innerText = 'AST: ' + assists;

		insertLocation.append(pointsLabel);
		insertLocation.append(reboundsLabel);
		insertLocation.append(assistsLabel);

		})
	.catch(function() {
	    // This is where you run code if the server returns any errors
	console.log('failed');
	});
};

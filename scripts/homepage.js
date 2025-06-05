// run everything after page loads
window.addEventListener("DOMContentLoaded", init);

// Starts program, all functions calls originate here
function init() {
	//insert functions/eventListeners to functions
	const leaderboardBtn = document.getElementById("leaderboard-btn");
	const matchingBtn = document.getElementById("matching-button");
	const matchingRecBtn = document.getElementById("matching-record");
	const sequenceBtn = document.getElementsByClassName("sec-btn")[2];
	const sequenceRecBtn = document.getElementsByClassName("sec-btn ghost")[1];
	const letsFindOutBtn = document.getElementsByClassName("primary-btn")[0];
	const darkmodeToggle = document.getElementById("theme-toggle");


	matchingBtn.addEventListener("click", matching_page);
	sequenceBtn.addEventListener("click", sequence_page);
	matchingRecBtn.addEventListener("click", leaderboard_page);
	sequenceRecBtn.addEventListener("click", leaderboard_page);
	leaderboardBtn.addEventListener("click", leaderboard_page);
	letsFindOutBtn.addEventListener("click", random_game_page);

	if(localStorage.getItem('darkMode') === "enabled") {
		document.body.classList.add('dark');
	}

	darkmodeToggle.addEventListener("click", () => {
		document.body.classList.toggle("dark");
	
		if(document.body.classList.contains("dark")) {
			localStorage.setItem("darkMode", "enabled");
		}
		else {
			localStorage.setItem("darkMode", "disabled");
		}
	});
}



function random_game_page() {
	const games = ["matching.html", "sequence.html"];
	const randomIndex = Math.floor(Math.random() * games.length);
	window.location.href = games[randomIndex];
}

function leaderboard_page(){
	window.location.href = "records.html";
}

function matching_page(){
	window.location.href = "matching.html";
}

function sequence_page(){
	window.location.href = "sequence.html";
}

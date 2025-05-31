// run everything after page loads
window.addEventListener("DOMContentLoaded", init);


// Starts program, all functions calls originate here
function init() {
	//insert functions/eventListeners to functions
	const leaderboardBtn = document.getElementById("leaderboard-btn");
	const matchingBtn = document.getElementById("matching-button");
	const matchingRecBtn = document.getElementById("matching-record");
	const sequenceBtn = document.getElementById("sequence-button");
	const sequenceRecBtn = document.getElementById("sequence-record");
	const letsFindOutBtn = document.getElementById("lets-find-out-btn");
	const toggle = document.getElementById('theme-toggle');

	matchingBtn.addEventListener("click", matching_page);
	sequenceBtn.addEventListener("click", sequence_page);
	matchingRecBtn.addEventListener("click", leaderboard_page);
	sequenceRecBtn.addEventListener("click", leaderboard_page);
	leaderboardBtn.addEventListener("click", leaderboard_page);
	letsFindOutBtn.addEventListener("click", random_game_page);

	let theme = "light";
	const savedTheme = localStorage.getItem("theme");
	if (savedTheme === "dark") {
		document.body.classList.add("dark");
		theme = "dark";
	}

	toggle.addEventListener("click", function () {
		document.body.classList.toggle("dark");

		if (document.body.classList.contains("dark")) {
			theme = "dark";
		} else {
			theme = "light";
		}

		localStorage.setItem("theme", theme);
	});
}


function random_game_page() {
	const games = ["matching.html", "sequence.html"];
	const randomIndex = Math.floor(Math.random() * games.length);
	window.location.href = games[randomIndex];
}

function leaderboard_page(){
	window.location.href = "leaderboard.html";
}

function matching_page(){
	window.location.href = "matching.html";
}

function sequence_page(){
	window.location.href = "sequence.html";
}

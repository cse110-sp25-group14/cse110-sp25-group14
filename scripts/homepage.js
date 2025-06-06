// run everything after page loads
window.addEventListener("DOMContentLoaded", init);

let sunIcon;
let moonIcon;

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

	sunIcon = document.querySelector(".theme-icon.sun");
	moonIcon = document.querySelector(".theme-icon.moon");


	matchingBtn.addEventListener("click", matching_page);
	sequenceBtn.addEventListener("click", sequence_page);
	matchingRecBtn.addEventListener("click", leaderboard_page);
	sequenceRecBtn.addEventListener("click", leaderboard_page);
	leaderboardBtn.addEventListener("click", leaderboard_page);
	letsFindOutBtn.addEventListener("click", random_game_page);
	darkmodeToggle.addEventListener("click", dark_mode);


	if(localStorage.getItem("darkMode") === "enabled") {
		document.body.classList.add("dark");

		if(sunIcon && moonIcon){
			sunIcon.style.opacity = "0";
			moonIcon.style.opacity = "1";
		}
	}
}

function dark_mode(){
	document.body.classList.toggle("dark");

	const isDarkmode = document.body.classList.contains("dark");

	if(sunIcon && moonIcon){
		if(isDarkmode){
			sunIcon.style.opacity = "0";
			moonIcon.style.opacity = "1";
		}
		else{
			sunIcon.style.opacity = "1";
			moonIcon.style.opacity = "0";
		}
	}

	localStorage.setItem("darkMode", isDarkmode? "enabled" : "disabled");
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

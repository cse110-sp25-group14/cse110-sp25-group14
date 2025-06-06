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

	const sunIcon = document.querySelector(".theme-icon.sun");
	const moonIcon = document.querySelector(".theme-icon.moon");

	if(darkmodeToggle && sunIcon && moonIcon){
		darkmodeToggle.sunIcon = sunIcon;
		darkmodeToggle.moonIcon = moonIcon;
	}


	matchingBtn.addEventListener("click", matching_page);
	sequenceBtn.addEventListener("click", sequence_page);
	matchingRecBtn.addEventListener("click", records_page);
	sequenceRecBtn.addEventListener("click", records_page);
	leaderboardBtn.addEventListener("click", records_page);
	letsFindOutBtn.addEventListener("click", random_game_page);


	if (darkmodeToggle) {
		darkmodeToggle.addEventListener("click", function() {
			document.body.classList.toggle("dark");
			
			const isDarkmode = document.body.classList.contains("dark");
			
			if (this.sunIcon && this.moonIcon) {
				if (isDarkmode) {
					this.sunIcon.style.opacity = "0";
					this.moonIcon.style.opacity = "1";
				} else {
					this.sunIcon.style.opacity = "1";
					this.moonIcon.style.opacity = "0";
				}
			}
			
			localStorage.setItem("darkMode", isDarkmode ? "enabled" : "disabled");
		});
	}

	if (localStorage.getItem("darkMode") === "enabled") {
		document.body.classList.add("dark");
		
		if (sunIcon && moonIcon) {
			sunIcon.style.opacity = "0";
			moonIcon.style.opacity = "1";
		}
	}
}

function random_game_page() {
	const games = ["matching.html", "sequence.html"];
	const randomIndex = Math.floor(Math.random() * games.length);
	window.location.href = games[randomIndex];
}


function records_page(){
	window.location.href = "records.html";
}

function matching_page(){
	window.location.href = "matching.html";
}

function sequence_page(){
	window.location.href = "sequence.html";
}

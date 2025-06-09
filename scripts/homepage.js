/**
 * Homepage Java Script for our game
 * navigation between pages and switching functionality
 * @file homepage.js
 * @author Kilhoon Kim
 */
window.addEventListener("DOMContentLoaded", init);

/**
 * Initializes button event listeners for page navigation.
 *
 * @func init
 * @description
 * Sets up the main interface by linking DOM buttons to their
 * respective navigation functions.
 * Sets up localstorage for dark mode.
 * @see random_game_page
 * @see records_page
 * @see sequence_page
 * @see matching_page
 * 
 */
function init() {
	const leaderboardBtn = document.getElementById("leaderboard-btn");
	const matchingBtn = document.getElementById("matching-button");
	const matchingRecBtn = document.getElementById("matching-record");
	const sequenceBtn = document.getElementsByClassName("sec-btn")[2];
	const sequenceRecBtn = document.getElementsByClassName("sec-btn ghost")[1];
	const letsFindOutBtn = document.getElementsByClassName("primary-btn")[0];
	const darkmodeToggle = document.getElementById("theme-toggle");

	const sunIcon = document.querySelector(".theme-icon.sun");
	const moonIcon = document.querySelector(".theme-icon.moon");
	const root = document.documentElement;


	/**
	 * @func updateTooltip
	 * @description
	 * Update the tooltip string based on currnetmode.
	 */
	function updateTooltip() {
		const isDark = document.body.classList.contains("dark");
		root.style.setProperty("--tooltip-text", isDark ? "\"Light Mode\"" : "\"Dark Mode\"");
	}

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

	if (localStorage.getItem("darkMode") === "enabled") {
		document.body.classList.add("dark");
		if (sunIcon && moonIcon) {
			sunIcon.style.opacity = "0";
			moonIcon.style.opacity = "1";
		}
	}

	updateTooltip();

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

			updateTooltip();
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


/**
 * @func random_game_page
 * @description
 * Navigate to a random game page.
 */
function random_game_page() {
	const games = ["matching.html", "sequence.html"];
	const randomIndex = Math.floor(Math.random() * games.length);
	window.location.href = games[randomIndex];
}

/**
 * @func records_page
 * @description
 * Navigate to a records page.
 */
function records_page(){
	window.location.href = "records.html";
}

/**
 * @func matching_page
 * @description
 * Navigate to a matching game page.
 */
function matching_page(){
	window.location.href = "matching.html";
}

/**
 * @func sequence_page
 * @description
 * Navigate to a sequence game page.
 */
function sequence_page(){
	window.location.href = "sequence.html";
}

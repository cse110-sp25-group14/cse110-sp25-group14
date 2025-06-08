window.addEventListener("DOMContentLoaded", init);

let root;
let themeToggle;
let sunIcon;
let moonIcon;
let backButton;
let playAgainButton;
let recordsButton;

/**
 * @function init
 * @description Top-level entry point. Caches DOM nodes, wires up navigation, and theme toggle.
 * @returns {void}
 * @example
 * // Called automatically on DOMContentLoaded
 * init();
 */
function init() {
	fetchDom();
	initThemeState();
	attachNavHandlers();
	loadRecords();
	configureThemeToggle();
}

/**
 * @function fetchDom
 * @description Queries the document once and stores references to all DOM elements this module needs.
 * @returns {void}
 * @example
 * fetchDom();
 */
function fetchDom() {
	root            = document.documentElement;
	themeToggle     = document.getElementById("theme-toggle");
	sunIcon         = document.querySelector(".theme-icon.sun");
	moonIcon        = document.querySelector(".theme-icon.moon");
	backButton      = document.querySelector("#page-info img");
	playAgainButton = document.querySelector(".play-again");
	recordsButton   = document.querySelector(".footer-icon");
}

/**
 * @function initThemeState
 * @description Applies the saved dark-mode preference on first load and refreshes the tooltip text.
 * @returns {void}
 * @example
 * initThemeState();
 */
function initThemeState() {
	if (localStorage.getItem("darkMode") === "enabled") {
		document.body.classList.add("dark");
	}
	updateTooltip();
}

/**
 * @function attachNavHandlers
 * @description Wires up click handlers for the back arrow, “Play Again”, and leaderboard buttons.
 * @returns {void}
 * @example
 * attachNavHandlers();
 */
function attachNavHandlers() {
	backButton.addEventListener("click", () => {
		window.location.href = "../source/homepage.html";
	});
	playAgainButton.addEventListener("click", () => {
		window.location.href = "../source/matching.html";
	});
	recordsButton.addEventListener("click", () => {
		window.location.href = "../source/records.html";
	});
}

/**
 * @function loadRecords
 * @description Reads matching-game results from localStorage, finds the most-recent play and the best records, and updates the results card.
 * @returns {void}
 * @example
 * loadRecords();
 */
function loadRecords() {
	const matchingRecords = JSON.parse(localStorage.getItem("matching")) || [];
	if (matchingRecords.length === 0) return;

	const parseTime = (t) => {
		const [m, s] = t.split(":").map(Number);
		return m * 60 + s;
	};

	const moveRecords = matchingRecords.slice().sort((a, b) => a.moves - b.moves);
	const timeRecords = matchingRecords.slice().sort((a, b) => parseTime(a.time) - parseTime(b.time));

	const latest = matchingRecords[matchingRecords.length - 1];

	document.querySelector(".current-time").textContent  = "Current: " + latest.time;
	document.querySelector(".current-moves").textContent = "Current: " + latest.moves;

	document.querySelector(".record-time").textContent   = "Record: " + timeRecords[0].time;
	document.querySelector(".current-record").textContent = "Record: " + moveRecords[0].moves;
}

/**
 * @function configureThemeToggle
 * @description Initializes dark-mode based on localStorage and sets up the toggle to swap themes and icons.
 * @returns {void}
 * @example
 * configureThemeToggle();
 */
function configureThemeToggle() {
	if (!themeToggle) return;

	themeToggle.sunIcon = sunIcon;
	themeToggle.moonIcon = moonIcon;

	themeToggle.addEventListener("click", () => {
		document.body.classList.toggle("dark");
		if (sunIcon && moonIcon) {
			sunIcon.style.opacity  = document.body.classList.contains("dark") ? "0" : "1";
			moonIcon.style.opacity = document.body.classList.contains("dark") ? "1" : "0";
		}
		localStorage.setItem("darkMode", document.body.classList.contains("dark") ? "enabled" : "disabled");
		updateTooltip();
	});

	if (localStorage.getItem("darkMode") === "enabled") {
		document.body.classList.add("dark");
		if (sunIcon && moonIcon) {
			sunIcon.style.opacity = "0";
			moonIcon.style.opacity = "1";
		}
	}
	updateTooltip();
}

/**
 * @function updateTooltip
 * @description Updates the CSS property so the toggle tooltip reads “Dark Mode” or “Light Mode”.
 * @returns {void}
 * @example
 * updateTooltip();
 */
function updateTooltip() {
	const isDark = document.body.classList.contains("dark");
	root.style.setProperty("--tooltip-text", isDark ? "\"Light Mode\"" : "\"Dark Mode\"");
}
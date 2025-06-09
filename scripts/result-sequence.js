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
 * @description Caches all DOM elements.
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
	playAgainButton = document.getElementById("play-again-btn");
	recordsButton   = document.querySelector(".footer-icon");
}

/**
 * @function initThemeState
 * @description Applies the dark-mode preference on first load and refreshes the toggle tooltip.
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
 * @description Attaches click handlers for the back arrow, “Play Again”, and footer records buttons.
 * @returns {void}
 * @example
 * attachNavHandlers();
 */
function attachNavHandlers() {
	backButton.addEventListener("click", () => {
		window.location.href = "../source/homepage.html";
	});
	playAgainButton.addEventListener("click", () => {
		window.location.href = "../source/sequence.html";
	});
	recordsButton.addEventListener("click", () => {
		window.location.href = "../source/records.html";
	});
}

/**
 * @function loadRecords
 * @description Loads the most-recent Sequence result and the best level for the current difficulty from localStorage, then updates the results card.
 * @returns {void}
 * @example
 * loadRecords();
 */
function loadRecords() {
	const recent = JSON.parse(localStorage.getItem("sequence-recent"));
	if (!recent) return;

	document.querySelector(".current").textContent = `Current: ${recent.level}`;

	const sequenceRecords = JSON.parse(localStorage.getItem("sequence")) || [];
	const bestLevel = sequenceRecords
		.filter((r) => r.difficulty === recent.difficulty)
		.map((r) => r.level)
		.sort((a, b) => b - a)[0] ?? 0;

	document.querySelector(".record").textContent = `Record: ${bestLevel}`;
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
window.addEventListener("DOMContentLoaded", init);

let recordDropdown;
let matchingContainer;
let sequenceContainer;
let sortByDropdown;
let difficultyDropdown;
let dropdownHeader;
let backButton;
let themeToggle;
let sunIcon;
let moonIcon;
let root;


/**
 * @function init
 * @description Top-level entry point. Caches DOM nodes, hides sections, wires up navigation, dropdowns, and theme toggle.
 * @returns {void}
 * @example
 * init();
 */
function init() {

	fetchDOM();

	hideInitialSections();

	pageNav();
	attachDropdownHandlers();
	configureThemeToggle();
}

/**
 * @function fetchDOM
 * @description Queries the document for the necessary variables.
 * @returns {void}
 * @example
 * fetchDOM();
 */
function fetchDOM(){
	root = document.documentElement;
	recordDropdown = document.getElementById("record-dropdown");
	matchingContainer = document.getElementById("matching-records");
	sequenceContainer = document.getElementById("sequence-records");
	sortByDropdown = document.getElementById("sort-dropdown");
	difficultyDropdown = document.getElementById("difficulty-dropdown");
	dropdownHeader = document.getElementById("best-title");
	backButton = document.getElementById("page-info");
	themeToggle = document.getElementById("theme-toggle");
	sunIcon = document.querySelector(".theme-icon.sun");
	moonIcon = document.querySelector(".theme-icon.moon");
}

/**
 * @function hideInitialSections
 * @description Collapses both results tables and their associated dropdowns so the page is blank until the user picks a game. Also hides it if the user deselects a game.
 * @returns {void}
 * @example
 * hideInitialSections();
 */
function hideInitialSections() {
	matchingContainer.style.display = "none";
	sequenceContainer.style.display = "none";
	sortByDropdown.style.display = "none";
	difficultyDropdown.style.display = "none";
	dropdownHeader.style.display = "none";
}

/**
 * @function pageNav
 * @description Attaches handlers for the back-arrow (to homepage) and the footer leaderboard button (to records.html).
 * @returns {void}
 * @example
 * pageNav();
 */
function pageNav(){
	backButton.querySelector("img").addEventListener("click", ()=>{
		window.location.href = "homepage.html";
	});
}

/**
 * @function attachDropdownHandlers
 * @description Listens for changes on the main game selector and the two sub-dropdowns, calls other functions for each dropdown.
 * @returns {void}
 * @example
 * attachDropdownHandlers();
 */
function attachDropdownHandlers() {
	recordDropdown.addEventListener("change", handleRecordDropdownChange);
	difficultyDropdown.addEventListener("change", loadSequenceRecords);
	sortByDropdown.addEventListener("change", loadMatchingRecords);
}

/**
 * @function handleRecordDropdownChange
 * @description Shows the correct table when the user picks “Matching”, “Sequence”, or resets to default.
 * @param {Event} e - The change event fired by the record-dropdown <select>.
 * @returns {void}
 * @example
 * recordDropdown.addEventListener("change", handleRecordDropdownChange);
 */
function handleRecordDropdownChange(e) {
	const value = e.target.value;

	if (value === "matching") {
		showMatchingUI();
		loadMatchingRecords();
	} else if (value === "sequence") {
		showSequenceUI();
		loadSequenceRecords();
	} else {
		hideInitialSections();
	}
}

/**
 * @function showMatchingUI
 * @description Reveals the matching-records table and sort dropdown; hides the sequence table.
 * @returns {void}
 * @example
 * showMatchingUI();
 */
function showMatchingUI() {
	matchingContainer.style.display  = "grid";
	sequenceContainer.style.display  = "none";
	sortByDropdown.style.display     = "block";
	difficultyDropdown.style.display = "none";
	dropdownHeader.style.display     = "";
	dropdownHeader.textContent       = "Best Matches";
}

/**
 * @function showSequenceUI
 * @description Reveals the sequence-records table and difficulty dropdown; hides matching table.
 * @returns {void}
 * @example
 * showSequenceUI();
 */
function showSequenceUI() {
	matchingContainer.style.display  = "none";
	sequenceContainer.style.display  = "grid";
	sortByDropdown.style.display     = "none";
	difficultyDropdown.style.display = "block";
	dropdownHeader.style.display     = "";
	dropdownHeader.textContent       = "Difficulty";
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



const numRanks = 3;

/**
 * @function loadMatchingRecords
 * @description Reads the “matching” array from localStorage, sorts it by moves or time, and fills the top 3 rows.
 * @returns {void}
 * @example
 * loadMatchingRecords();
 */
function loadMatchingRecords() {
	const matchingRecords = JSON.parse(localStorage.getItem("matching")) || [];

	const selectedSort = document.getElementById("sort-dropdown").value;
	let sortedRecords = [];
	if (selectedSort == "moves") {
		sortedRecords = matchingRecords.sort((a, b) => {
			if (a.moves < b.moves) {
				return -1;
			} else if (a.moves > b.moves) {
				return 1;
			} else {
				if (parseTime(a.time) < parseTime(b.time)) {
					return -1;
				} else {
					return 1;
				}
			}
		});
	} else {
		sortedRecords = matchingRecords.sort((a, b) => {
			if (parseTime(a.time) < parseTime(b.time)) {
				return -1;
			} else if (parseTime(a.time) > parseTime(b.time)) {
				return 1;
			} else {
				if (a.moves < b.moves) {
					return -1;
				} else {
					return 1;
				}
			}
		});
	}
	const sortedTimes = sortedRecords.map((record) => record.time);
	const sortedMoves = sortedRecords.map((record) => record.moves);
	
	for (let i = 0; i < numRanks; i++) {
		const time = document.querySelector(`p.time[data-rank="${i+1}"`);
		const moves = document.querySelector(`p.moves[data-rank="${i+1}"`);
		time.textContent = `${sortedTimes[i] ?? ""}`;
		moves.textContent = `${sortedMoves[i] ?? ""}`;
	}
}

/**
 * @function parseTime
 * @description Converts a "mm:ss" string into total seconds for numeric comparison.
 * @param {string} timeString - Time in the format "mm:ss".
 * @returns {number} Total seconds represented by the string.
 * @example
 * parseTime("01:15");
 */
function parseTime(timeString) {
	const parts   = timeString.split(":");
	const minutes = parseInt(parts[0], 10);
	const seconds = parseInt(parts[1], 10);
	return minutes * 60 + seconds;
}

/**
 * @function loadSequenceRecords
 * @description Filters sequence records by difficulty, sorts by level, and fills the top 3 ranking rows.
 * @returns {void}
 * @example
 * loadSequenceRecords();
 */
function loadSequenceRecords() {
	const sequenceRecords = JSON.parse(localStorage.getItem("sequence")) || [];

	const selectedDifficulty = document.getElementById("difficulty-dropdown").value;
	const sortedLevels = sequenceRecords
		.filter((record) => record.difficulty === selectedDifficulty)
		.map((record) => record.level)
		.sort((a, b) => b - a);

	for (let i = 0; i < numRanks; i++) {
		const level = document.querySelector(`p.level[data-rank="${i+1}"`);
		level.textContent = `${sortedLevels[i] ?? ""}`;
	}
}
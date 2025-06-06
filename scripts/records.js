window.addEventListener("DOMContentLoaded", init);

function init() {

	const recordDropdown = document.getElementById("record-dropdown");
	const matchingContainer = document.getElementById("matching-records");
	const sequenceContainer = document.getElementById("sequence-records");
	const sortByDropdown = document.getElementById("sort-dropdown");
	const difficultyDropdown = document.getElementById("difficulty-dropdown");
	const dropdownHeader = document.getElementById("best-title");
	const backButton = document.getElementById("page-info");

	matchingContainer.style.display = "none";
	sequenceContainer.style.display = "none";
	sortByDropdown.style.display = "none";
	difficultyDropdown.style.display = "none";
	dropdownHeader.style.display = "none";

	backButton.querySelector("img").addEventListener("click", ()=>{
		window.location.href = "homepage.html";
	});

	recordDropdown.addEventListener("change", (e) => {
		const value = e.target.value;

		if (value === "matching") {
			matchingContainer.style.display = "grid";
			sequenceContainer.style.display = "none";

			sortByDropdown.style.display = "block";
			difficultyDropdown.style.display = "none";

			dropdownHeader.style.display = "";
			dropdownHeader.textContent = "Best Matches";
			loadMatchingRecords();

		} else if (value === "sequence") {
			matchingContainer.style.display = "none";
			sequenceContainer.style.display = "grid";

			sortByDropdown.style.display = "none";
			difficultyDropdown.style.display = "block";
			
			dropdownHeader.style.display = "";
			dropdownHeader.textContent = "Difficulty";
			loadSequenceRecords();

		} else {
			matchingContainer.style.display = "none";
			sequenceContainer.style.display = "none";

			sortByDropdown.style.display = "none";
			difficultyDropdown.style.display = "none";

			dropdownHeader.style.display = "none";
		}
	});

	difficultyDropdown.addEventListener("change", () => {
		loadSequenceRecords();
	});

	sortByDropdown.addEventListener("change", () => {
		loadMatchingRecords();
	});

	if (localStorage.getItem("darkMode") === "enabled") {
		document.body.classList.add("dark");
		
		const sunIcon = document.querySelector(".theme-icon.sun");
		const moonIcon = document.querySelector(".theme-icon.moon");
		
		if (sunIcon && moonIcon) {
			sunIcon.style.opacity = "0";
			moonIcon.style.opacity = "1";
		}
	}
	
	const darkmodeToggle = document.getElementById("theme-toggle");
	if (darkmodeToggle) {
		darkmodeToggle.addEventListener("click", darkMode);
	}
}

const numRanks = 3;

function loadMatchingRecords() {
	const matchingRecords = JSON.parse(localStorage.getItem("matching")) ?? [];

	const selectedSort = document.getElementById("sort-dropdown").value;
	let sortedRecords = [];
	if (selectedSort == "moves") {
		sortedRecords = matchingRecords.sort((a, b) => a.moves - b.moves);
	} else {
		sortedRecords = matchingRecords.sort((a, b) => a.time - b.time);
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

function loadSequenceRecords() {
	const sequenceRecords = JSON.parse(localStorage.getItem("sequence")) ?? [];

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

function darkMode() {
	document.body.classList.toggle("dark");
		
	const isDarkmode = document.body.classList.contains("dark");
	localStorage.setItem("darkMode", isDarkmode ? "enabled" : "disabled");
	
	const sunIcon = document.querySelector(".theme-icon.sun");
	const moonIcon = document.querySelector(".theme-icon.moon");
	
	if(sunIcon && moonIcon) {
		if(isDarkmode) {
			sunIcon.style.opacity = "0";
			moonIcon.style.opacity = "1";
		} else {
			sunIcon.style.opacity = "1";
			moonIcon.style.opacity = "0";
		}
	}
}
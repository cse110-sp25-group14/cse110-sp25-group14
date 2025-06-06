window.addEventListener("DOMContentLoaded", init);
function init() {

	const backButton = document.getElementById("page-info");
	backButton.querySelector("img").addEventListener("click", ()=>{
		window.location.href = "homepage.html";
	});

	const recordDropdown = document.getElementById("record-dropdown");

	const matchingContainer = document.getElementById("matching-records");
	const sequenceContainer = document.getElementById("sequence-records");

	const sortByDropdown = document.getElementById("sort-dropdown");
	const difficultyDropdown = document.getElementById("difficulty-dropdown");

	matchingContainer.style.display = "none";
	sequenceContainer.style.display = "none";

	sortByDropdown.style.display = "none";
	difficultyDropdown.style.display = "none";

	const dropdownHeader = document.getElementById("best-title");
	dropdownHeader.style.display = "none";

	recordDropdown.addEventListener("change", (e) => {
		const value = e.target.value;

		if (value === "matching") {
			matchingContainer.style.display = "grid";
			sequenceContainer.style.display = "none";

			sortByDropdown.style.display = "block";
			difficultyDropdown.style.display = "none";
			dropdownHeader.style.display = "";
			dropdownHeader.textContent = "Best Matches";

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
}

function loadSequenceRecords() {
	const sequenceRecords = JSON.parse(localStorage.getItem("sequence")) ?? [];
	const sortedRecords = sequenceRecords.sort((a, b) => b.level - a.level);
	const sortedLevels = sortedRecords.map((record) => record.level);

	const numRanks = 3;
	for (let i = 0; i < numRanks; i++) {
		const level = document.querySelector(`p.level[data-rank="${i+1}"`);
		level.textContent = `${sortedLevels[i] ?? ""}`;
	}
}
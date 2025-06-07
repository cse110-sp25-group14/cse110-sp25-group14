window.addEventListener("DOMContentLoaded", function () {

	if (localStorage.getItem("darkMode") === "enabled") {
		document.body.classList.add("dark");
	}


	const backButton = document.querySelector("#page-info img");
	backButton.addEventListener("click", function () {
		window.location.href = "../source/homepage.html";
	});

	const playAgainButton = document.querySelector(".play-again");
	playAgainButton.addEventListener("click", function () {
		window.location.href = "../source/matching.html";
	});

	const recordsButton = document.getElementById("footer-icon");
	recordsButton.addEventListener("click", function () {
		window.location.href = "../source/records.html";
	});

	const matchingRecords = JSON.parse(localStorage.getItem("matching")) || [];

	function parseTime(timeString) {
		const parts   = timeString.split(":");
		const minutes = parseInt(parts[0], 10);
		const seconds = parseInt(parts[1], 10);
		return minutes * 60 + seconds;
	}


	//sorts in place unlike in records
	const moveRecords = matchingRecords.slice().sort(function (a, b) {
		return a.moves - b.moves;
	});

	const timeRecords = matchingRecords.slice().sort(function (a, b) {
		return parseTime(a.time) - parseTime(b.time);
	});

	if (matchingRecords.length > 0) {
		const latest = matchingRecords[matchingRecords.length - 1];

		const recentTimeEl  = document.querySelector(".current-time");
		const recentMovesEl = document.querySelector(".current-moves");

		recentTimeEl.textContent  = "Current: " + latest.time;
		recentMovesEl.textContent = "Current: " + latest.moves;

		const bestTimeRecord  = timeRecords[0];
		const bestMovesRecord = moveRecords[0];

		const recordTimeEl  = document.querySelector(".record-time");
		const recordMovesEl = document.querySelector(".current-record");

		recordTimeEl.textContent  = "Record: " + bestTimeRecord.time;
		recordMovesEl.textContent = "Record: " + bestMovesRecord.moves;
	}
	
	const darkmodeToggle = document.getElementById("theme-toggle");
	darkmodeToggle.addEventListener("click", function () {
		document.body.classList.toggle("dark");
		const isDark = document.body.classList.contains("dark");
		if (isDark) {
			localStorage.setItem("darkMode", "enabled");
		} else {
			localStorage.setItem("darkMode", "disabled");
		}
	});
});

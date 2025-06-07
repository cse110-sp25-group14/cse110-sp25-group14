window.addEventListener("DOMContentLoaded", () => {
	const themeToggle = document.getElementById("theme-toggle");
	const sunIcon = document.querySelector(".theme-icon.sun");
	const moonIcon = document.querySelector(".theme-icon.moon");
	const root = document.documentElement;

	function updateTooltip() {
		const isDark = document.body.classList.contains("dark");
		root.style.setProperty("--tooltip-text", isDark ? "\"Light Mode\"" : "\"Dark Mode\"");
	}

	if (themeToggle) {
		themeToggle.sunIcon = sunIcon;
		themeToggle.moonIcon = moonIcon;

		themeToggle.addEventListener("click", function () {
			document.body.classList.toggle("dark");
			const isDark = document.body.classList.contains("dark");

			if (this.sunIcon && this.moonIcon) {
				this.sunIcon.style.opacity = isDark ? "0" : "1";
				this.moonIcon.style.opacity = isDark ? "1" : "0";
			}

			localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
			updateTooltip();
		});

		const isDark = localStorage.getItem("darkMode") === "enabled";
		if (isDark) {
			document.body.classList.add("dark");
			if (sunIcon && moonIcon) {
				sunIcon.style.opacity = "0";
				moonIcon.style.opacity = "1";
			}
		}
		updateTooltip();
	}

	const recordButton = document.getElementById("leaderboard-btn");
	if (recordButton) {
		recordButton.addEventListener("click", () => {
			window.location.href = "records.html";
		});
	}

	const backButton = document.querySelector("#page-info img");
	backButton.addEventListener("click", () => {
		window.location.href = "../source/homepage.html";
	});

	const playAgainButton = document.getElementById("play-again-btn");
	playAgainButton.addEventListener("click", () => {
		window.location.href = "../source/sequence.html";
	});

	const recordsButton = document.getElementById("footer-icon");
	recordsButton.addEventListener("click", function () {
		window.location.href = "../source/records.html";
	});

	const recent = JSON.parse(localStorage.getItem("sequence-recent"));

	if (recent) {
		document.querySelector(".current").textContent = `Current: ${recent.level}`;

		const sequenceRecords = JSON.parse(localStorage.getItem("sequence")) || [];
		const difficultyRecords = sequenceRecords
			.filter((record) => record.difficulty === recent.difficulty)
			.map((record) => record.level)
			.sort((a, b) => b - a);

		const best = difficultyRecords[0] ?? 0;
		document.querySelector(".record").textContent = `Record: ${best}`;
	}
});
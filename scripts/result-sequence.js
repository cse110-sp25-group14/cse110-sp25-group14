window.addEventListener("DOMContentLoaded", () => {
	if(localStorage.getItem("darkMode") === "enabled") {
		document.body.classList.add("dark");
	}

	const backButton = document.querySelector("#page-info img");
	backButton.addEventListener("click", () => {
		window.location.href = "/source/homepage.html";
	});

	const playAgainButton = document.getElementById("play-again-btn");
	playAgainButton.addEventListener("click", () => {
		window.location.href = "/source/sequence.html";
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
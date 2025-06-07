window.addEventListener("DOMContentLoaded", init);

function init(){
	const backButton = document.getElementById("back-arrow");

	backButton.addEventListener("click", () => {
		window.location.href = "homepage.html";
	});

	const themeToggle = document.getElementById("theme-toggle");
	const sunIcon = document.querySelector(".theme-icon.sun");
	const moonIcon = document.querySelector(".theme-icon.moon");
	const root = document.documentElement;

	function updateTooltip() {
		const isDark = document.body.classList.contains("dark");
		root.style.setProperty("--tooltip-text", isDark ? '"Light Mode"' : '"Dark Mode"');
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
}
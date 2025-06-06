window.addEventListener("load", init);

function init() {
	const backButton = document.getElementById("back-arrow");

	backButton.addEventListener("click", () => {
		window.location.href = "homepage.html";
	});

	if(localStorage.getItem("darkMode") === "enabled") {
		document.body.classList.add("dark");
		
		const sunIcon = document.querySelector(".theme-icon.sun");
		const moonIcon = document.querySelector(".theme-icon.moon");
		
		if(sunIcon && moonIcon) {
			sunIcon.style.opacity = "0";
			moonIcon.style.opacity = "1";
		}
	}
	
	const darkmodeToggle = document.getElementById("theme-toggle");
	if (darkmodeToggle) {
		darkmodeToggle.addEventListener("click", dark_mode);
	}
}

function dark_mode() {
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
window.addEventListener("DOMContentLoaded", init);
function init() {
	const homeBtn = document.getElementById("homepage-btn");
	homeBtn.addEventListener("click", ()=>{
		window.location.href = "homepage.html";
	});

	if(localStorage.getItem("darkMode") === "enabled") {
		document.body.classList.add("dark");
	}
}

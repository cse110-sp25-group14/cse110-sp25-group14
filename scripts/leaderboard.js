window.addEventListener('DOMContentLoaded', init);

async function init() {
    const homepageBtn = document.getElementById("homepage-btn");
	homepageBtn.addEventListener("click", changeHome);
}

function changeHome(){
	window.location.href = "homepage.html";
}
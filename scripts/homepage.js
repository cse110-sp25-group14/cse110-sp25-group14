
// run everything after page loads
window.addEventListener('DOMContentLoaded', init);

// Starts program, all functions calls originate here
async function init() {
	//insert functions/eventListeners to functions
	const leaderboardBtn = document.getElementById("leaderboard-btn");
	leaderboardBtn.addEventListener("click", pageChange);
}

function pageChange(){
	window.location.href = "leaderboard.html";
}

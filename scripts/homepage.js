
// run everything after page loads
window.addEventListener('DOMContentLoaded', init);

// Starts program, all functions calls originate here
function init() {
	//insert functions/eventListeners to functions
<<<<<<< HEAD:scripts/main.js
	const button = document.getElementById('leaderboard-btn');
	button.addEventListener('click', function() {
		window.location.href = "leaderboard.html"
	});
=======
	const leaderboardBtn = document.getElementById("leaderboard-btn");
	leaderboardBtn.addEventListener("click", pageChange);
}

function pageChange(){
	window.location.href = "leaderboard.html";
>>>>>>> c37869c9f979bb8b92edb53246948df9b5ad7081:scripts/homepage.js
}

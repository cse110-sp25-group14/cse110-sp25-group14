// run everything after page loads
window.addEventListener('DOMContentLoaded', init);

// Starts program, all functions calls originate here
function init() {
	//insert functions/eventListeners to functions
	const leaderboardBtn = document.getElementById("leaderboard-btn");
    const matchingBtn = document.getElementById("matching_button");
    const matchingRecBtn = document.getElementById("matching_record");
    const sequenceBtn = document.getElementById("sequence_button");
    const sequenceRecBtn = document.getElementById("sequence_record");

    matchingBtn.addEventListener("click", matching_page);
    sequenceBtn.addEventListener("click", sequence_page);
    matchingRecBtn.addEventListener("click", leaderboard_page);
    sequenceRecBtn.addEventListener("click", leaderboard_page);
    leaderboardBtn.addEventListener("click", leaderboard_page);
}

function leaderboard_page(){
	window.location.href = "leaderboard.html";
}

function matching_page(){
    window.location.href = "matching.html";
}

function sequence_page(){
    window.location.href = "sequence.html";
}

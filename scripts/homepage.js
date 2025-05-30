// run everything after page loads
window.addEventListener("DOMContentLoaded", init);

/**
 * Initializes button event listeners for page navigation.
 *
 * @function init
 * @description
 * Sets up the main interface by linking DOM buttons to their
 * respective navigation functions. Each button directs the user
 * to either a game page or the leaderboard.
 *
 * @see matching_page
 * @see sequence_page
 * @see leaderboard_page
 *
 *
 */
function init() {
	//insert functions/eventListeners to functions
	const leaderboardBtn = document.getElementById("leaderboard-btn");
	const matchingBtn = document.getElementById("matching-button");
	const matchingRecBtn = document.getElementById("matching-record");
	const sequenceBtn = document.getElementById("sequence-button");
	const sequenceRecBtn = document.getElementById("sequence-record");
	const letsFindOutBtn = document.getElementById("lets-find-out-btn");

	matchingBtn.addEventListener("click", matching_page);
	sequenceBtn.addEventListener("click", sequence_page);
	matchingRecBtn.addEventListener("click", leaderboard_page);
	sequenceRecBtn.addEventListener("click", leaderboard_page);
	leaderboardBtn.addEventListener("click", leaderboard_page);
	letsFindOutBtn.addEventListener("click", random_game_page);
}

/**
 * @function randomgame_page
 * @description
 * This function redirects the user to the leaderboard page.
 * This function is called when the user clicks on the leaderboard button
 */
function random_game_page() {
	const games = ["matching.html", "sequence.html"];
	const randomIndex = Math.floor(Math.random() * games.length);
	window.location.href = games[randomIndex];
}

/**
 * @function leaderboard_page
 * @description
 * This function redirects the user to the leaderboard page.
 * This function is called when the user clicks on the leaderboard button
 */
function leaderboard_page(){
	window.location.href = "leaderboard.html";
}
/**
 * @function matching_page
 * @description
 * Redirects the user to the matching game page.
 * This function is called when the user clicks on the matching button
 */
function matching_page(){
	window.location.href = "matching.html";
}
/**
 * @function sequence_page
 * @description
 * Redirects the user to the sequence game page.
 * This function is called when the user clicks on the sequence button 
 */
function sequence_page(){
	window.location.href = "sequence.html";
}

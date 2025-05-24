window.addEventListener('DOMContentLoaded', init);

//initialize board
function init() {
    const backButton = document.getElementById("page-info");
    backButton.addEventListener("click", ()=>{
        window.location.href = "homepage.html";
    });
};
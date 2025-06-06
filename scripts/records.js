window.addEventListener("DOMContentLoaded", init);
function init() {

	const backButton = document.getElementById("page-info");
	backButton.querySelector("img").addEventListener("click", ()=>{
		window.location.href = "homepage.html";
	});

    const recordDropdown = document.getElementById("record-dropdown");
    
    const matchingContainer = document.querySelectorAll("#record-flex-container")[0];
    const sequenceContainer = document.querySelectorAll("#record-flex-container")[1];

    matchingContainer.style.display = "none";
    sequenceContainer.style.display = "none";

    const sortByDropdown = document.querySelectorAll("#header-dropdown")[0];
    const difficultyDropdown = document.querySelectorAll("#header-dropdown")[1];

    sortByDropdown.style.display = "none";
    difficultyDropdown.style.display = "none";

    const dropdownHeader = document.getElementById("best-title");
    dropdownHeader.style.display = "none";

    recordDropdown.addEventListener("change", (e) => {
        const value = e.target.value;

        if (value === "matching") {
            matchingContainer.style.display = "grid";
            sequenceContainer.style.display = "none";

            sortByDropdown.style.display = "block";
            difficultyDropdown.style.display = "none";
            dropdownHeader.style.display = "";
            dropdownHeader.textContent = "Best Matches";
            
        } else if (value === "sequence") {
            matchingContainer.style.display = "none";
            sequenceContainer.style.display = "grid";

            sortByDropdown.style.display = "none";
            difficultyDropdown.style.display = "block";
            dropdownHeader.style.display = "";
            dropdownHeader.textContent = "Difficulty";

        } else {
            matchingContainer.style.display = "none";
            sequenceContainer.style.display = "none";

            sortByDropdown.style.display = "none";
            difficultyDropdown.style.display = "none";

            dropdownHeader.style.display = "none";
        }
    });
}
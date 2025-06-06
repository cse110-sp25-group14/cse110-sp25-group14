window.addEventListener("DOMContentLoaded", init);
function init() {

    const recordDropdown = document.getElementById("record-dropdown");
    const matchingContainer = document.getElementById("matching-records");
    const sequenceContainer = document.getElementById("sequence-records");
    const sortByDropdown = document.getElementById("sort-dropdown");
    const difficultyDropdown = document.getElementById("difficulty-dropdown");
    const dropdownHeader = document.getElementById("best-title");
    const backButton = document.getElementById("page-info");

    matchingContainer.style.display = "none";
    sequenceContainer.style.display = "none";
    sortByDropdown.style.display = "none";
    difficultyDropdown.style.display = "none";
    dropdownHeader.style.display = "none";

    backButton.querySelector("img").addEventListener("click", ()=>{
        window.location.href = "homepage.html";
    });

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
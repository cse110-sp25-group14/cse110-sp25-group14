window.addEventListener("load", init);

function init()
{
    const backButton = document.getElementById("back-arrow");

    backButton.addEventListener("click", () => {
        window.location.href = "homepage.html";
    });

    if(localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark");
 }
}
/*function menuToggle() {
    const nav = document.getElementById("nav")
    const toggle = document.getElementById("toggle")
    const isActive = nav.classList.contains("active")

    if (isActive) {
        nav.classList.remove("active");
        toggle.classList.remove("active");
    }
    else {
        nav.classList.add("active");
        toggle.classList.add("active");
    }

}
const buttonclick = document.getElementById("toggle");


buttonclick.addEventListener("click", menuToggle);

*/

// document.getElementById('toggle').addEventListener('click', () => {
//     console.log("J'AI CLIQUÉ")
//     document.querySelector(".fullPageMenu").classList.toggle("active")
// })

const toggleButton = document.getElementById("toggle");
const fullPageMenu = document.querySelector(".fullPageMenu");

let isOpen = false;

const handleToggle = () => {
    isOpen = !isOpen;

    if (isOpen) {
        fullPageMenu.classList.add("active");
    } else {
        fullPageMenu.classList.remove("active");
    }
};

toggleButton.addEventListener("click", handleToggle);

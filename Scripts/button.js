const blueBtn = document.getElementById("blueBtn");
const bluebgd = document.getElementById("bluebgd");
blueBtn.addEventListener("click", () => { 
   bluebgd.classList.toggle("visible"); 
});

const blackBtn = document.getElementById("blackBtn");
const blackbgd = document.getElementById("blackbgd");
blackBtn.addEventListener("click", () => { 
   blackbgd.classList.toggle("visible"); 
});

const pinkBtn = document.getElementById("pinkBtn");
const pinkbgd = document.getElementById("pinkbgd");
pinkBtn.addEventListener("click", () => { 
    pinkbgd.classList.toggle("visible"); 
});
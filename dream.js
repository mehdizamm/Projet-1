// Sélectionnez l'élément select et le canvas
var selectElement = document.getElementById('select1');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// Définissez un objet contenant les chemins vers les logos
var logos = {
  1: 'assets/images/logoRammstein.jpg',
  2: 'assets/images/logoBeyonce.jpg',
  3: 'assets/images/logoPatrickSebastien.jpg'
};

// Créez un tableau pour stocker les logos sélectionnés
var selectedLogos = [];

// Ajoutez un gestionnaire d'événement de changement à l'élément select
selectElement.addEventListener('change', function(event) {
  var selectedOptions = Array.from(selectElement.selectedOptions);

  // Réinitialisez le tableau des logos sélectionnés
  selectedLogos = [];

  // Chargez les logos sélectionnés
  selectedOptions.forEach(function(option) {
    var logoPath = logos[option.value];

    // Créez une nouvelle image pour le logo
    var logo = new Image();
    logo.src = logoPath;

    // Ajoutez le logo au tableau des logos sélectionnés
    selectedLogos.push(logo);
  });

  // Attendez que tous les logos soient chargés avant d'afficher les logos
  Promise.all(selectedLogos.map(loadImage))
    .then(function() {
      displayLogos();
    });
});

// Fonction pour charger une image
function loadImage(image) {
  return new Promise(function(resolve) {
    image.onload = function() {
      resolve();
    };
  });
}

// Fonction pour afficher les logos sélectionnés sur le canvas
function displayLogos() {
  clearCanvas();

  var xOffset = 0;
  var yOffset = 0;
  var logoWidth = 100;
  var logoHeight = 100;

  selectedLogos.forEach(function(logo) {
    ctx.drawImage(logo, xOffset, yOffset, logoWidth, logoHeight);
    xOffset += logoWidth + 10;
  });
}

// Fonction pour réinitialiser le canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
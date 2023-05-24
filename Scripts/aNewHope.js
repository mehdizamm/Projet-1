var bands = [
  { name: 'Rammstein', logo: '../assets/images/.png' },
  { name: 'Metalica', logo: '../assets/images/.png' },
  { name: 'Disturbed', logo: '../assets/images/.png' },
  { name: 'PNL', logo: '../assets/images/PNL.png' },
  { name: 'Jul', logo: '../assets/images/Jul.png' },
  { name: 'Scorpion', logo: '../assets/images/.png' },
  { name: 'Kekra', logo: '../assets/images/kekra.png' },
  { name: 'the Cure', logo: '../assets/images/.png' },
  { name: 'Indila', logo: '../assets/images/indila.png' },
  { name: 'Tiesto', logo: '../assets/images/Tiesto.png' }
  // Ajoutez d'autres groupes ici
];

var colors = [
  { name: 'Black', image: '../assets/images/blackbgd.jpeg' },
  { name: 'Yellow', image: 'path/to/yellow_image.png' },
  { name: 'Pink', image: '../assets/images/pinkbgd.jpeg' },
  { name: 'Blue', image: '../assets/images/bluebgd.jpeg' },
  { name: 'Red', image: 'path/to/red_image.png' },
];

var festivalNameFonts = [
  'Arial, sans-serif',
  'Helvetica, sans-serif',
  'Verdana, sans-serif',
  'Georgia, serif',
  'Times New Roman, serif',
];

var bandSelectionDiv = document.getElementById('bandSelection');
var colorSelectionDiv = document.getElementById('colorSelection');
var selectedColorButton = null;
var selectedColorImage = null;

// Créer les cases à cocher pour la sélection des groupes
bands.forEach(function(band) {
  var label = document.createElement('label');
  var checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.name = 'band';
  checkbox.value = band.name;

  label.appendChild(checkbox);
  label.appendChild(document.createTextNode(band.name));

  bandSelectionDiv.appendChild(label);
});

// Créer les boutons de sélection des couleurs
colors.forEach(function(color) {
  var button = document.createElement('div');
  button.className = 'colorButton';
  button.style.backgroundColor = color.name.toLowerCase();
  button.dataset.image = color.image;
  button.addEventListener('click', function() {
    selectColor(button);
  });

  colorSelectionDiv.appendChild(button);
});

function selectColor(button) {
  var buttons = document.getElementsByClassName('colorButton');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('selected');
  }

  if (selectedColorImage) {
    selectedColorImage.parentNode.removeChild(selectedColorImage);
    selectedColorImage = null;
  }

  button.classList.add('selected');
  selectedColorButton = button;

  var colorImage = new Image();
  colorImage.src = button.dataset.image;
  colorImage.onload = function() {
    selectedColorImage = document.createElement('img');
    selectedColorImage.src = button.dataset.image;
    selectedColorImage.style.display = 'none';
    document.body.appendChild(selectedColorImage);
  };
}

function clearColorImage() {
  if (selectedColorImage) {
    selectedColorImage.parentNode.removeChild(selectedColorImage);
    selectedColorImage = null;
  }
}

function drawPoster() {
  var bands = document.querySelectorAll('input[name="band"]:checked');
  var festivalName = document.querySelector('input[name="festivalName"]').value;
  var posterCanvas = document.getElementById('posterCanvas');
  var context = posterCanvas.getContext('2d');

  var backgroundImage = new Image();
  backgroundImage.src = selectedColorButton.dataset.image;

  backgroundImage.onload = function() {
    context.drawImage(backgroundImage, 0, 0, posterCanvas.width, posterCanvas.height);

    var logoSize = 100;
    var logoSpacing = 40;
    var availablePositions = generateAvailablePositions(posterCanvas.width, posterCanvas.height, logoSpacing, bands.length);
    var usedPositions = [];

    // Mélange aléatoire des groupes sélectionnés
    var selectedBands = Array.from(bands);
    selectedBands.sort(function() { return 0.5 - Math.random() });

    function checkLogoOverlap(position) {
      var festivalNameHeight = 100;
      var festivalNamePadding = 20;
      var maxLogoY = posterCanvas.height - festivalNameHeight - festivalNamePadding;
      var festivalNameBottom = festivalNamePosition.y - festivalNamePadding;

      if (position.y <= festivalNameBottom && position.y + logoSize >= festivalNameBottom) {
        position.y = festivalNameBottom + festivalNamePadding;
      }
    }

    function getRandomPosition(availablePositions, usedPositions) {
      var position = availablePositions[Math.floor(Math.random() * availablePositions.length)];
      var index = availablePositions.indexOf(position);
      availablePositions.splice(index, 1);
      usedPositions.push(position);
      return position;
    }

    function drawFestivalName() {
      var fontSize = 48;
      var festivalNamePosition = { x: posterCanvas.width / 2, y: 100 };
      var fontFamily = festivalNameFonts[Math.floor(Math.random() * festivalNameFonts.length)];
      context.fillStyle = '#ffffff';
      context.font = fontSize + 'px ' + fontFamily;
      context.textAlign = 'center';
      context.fillText(festivalName, festivalNamePosition.x, festivalNamePosition.y);
    }

    function generatePoster() {
      var link = document.createElement('a');
      link.href = posterCanvas.toDataURL('image/jpeg');
      link.download = 'festival_poster.jpg';
      link.click();
    }

    function drawLogo(index) {
      var band = selectedBands[index];
      var bandLogo = new Image();
      bandLogo.src = getLogoPath(band.value);
      bandLogo.onload = function() {
        var position = getRandomPosition(availablePositions, usedPositions);
        usedPositions.push(position);

        checkLogoOverlap(position);

        context.drawImage(bandLogo, position.x, position.y, logoSize, logoSize);

        if (index === selectedBands.length - 1) {
          drawFestivalName();
          generatePoster();
        } else {
          drawLogo(index + 1);
        }
      };
    }

    drawLogo(0);
  };
}

function generateAvailablePositions(canvasWidth, canvasHeight, logoSize, logoSpacing) {
  var availablePositions = [];
  var columns = Math.floor(canvasWidth / (logoSize + logoSpacing));
  var rows = Math.floor(canvasHeight / (logoSize + logoSpacing));

  for (var i = 0; i < columns; i++) {
    for (var j = 0; j < rows; j++) {
      var x = i * (logoSize + logoSpacing) + logoSpacing;
      var y = j * (logoSize + logoSpacing) + logoSpacing;
      availablePositions.push({ x: x, y: y });
    }
  }

  return availablePositions;
}

function getLogoPath(bandName) {
  var band = bands.find(function(band) {
    return band.name === bandName;
  });

  return band ? band.logo : '';
}

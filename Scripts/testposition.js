const bands = [
  { name: 'Rammstein', logo: '../assets/images/Rammstein.png' },
  { name: 'Metalica', logo: '../assets/images/Metalica.png' },
  { name: 'Disturbed', logo: '../assets/images/Disturbed.png' },
  { name: 'PNL', logo: '../assets/images/PNL.png' },
  { name: 'Jul', logo: '../assets/images/Jul.png' },
  { name: 'Scorpion', logo: '../assets/images/Scorpion.png' },
  { name: 'Kekra', logo: '../assets/images/Kekra.png' },
  { name: 'the Cure', logo: '../assets/images/TheCure.png' },
  { name: 'Indila', logo: '../assets/images/Indila.png' },
  { name: 'Tiesto', logo: '../assets/images/Tiesto.png' }
  // Add more bands here
];

const colors = [
  { name: 'Black', image: '../assets/images/blackbgd.jpeg' },
  { name: 'Yellow', image: 'path/to/yellow_image.png' },
  { name: 'Pink', image: '../assets/images/pinkbgd.jpeg' },
  { name: 'Blue', image: '../assets/images/bluebgd.jpeg' },
  { name: 'Red', image: 'path/to/red_image.png' },
];

const festivalNameFonts = [
  'Arial, sans-serif',
  'Helvetica, sans-serif',
  'Verdana, sans-serif',
  'Georgia, serif',
  'Times New Roman, serif',
];

const bandSelectionDiv = document.getElementById('bandSelection');
const colorSelectionDiv = document.getElementById('colorSelection');
let selectedColorButton = null;
const loadedLogos = {}; // Pour stocker les logos déjà chargés

// Create band selection checkboxes
bands.forEach(function(band) {
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.name = 'band';
  checkbox.value = band.name;

  label.appendChild(checkbox);
  label.appendChild(document.createTextNode(band.name));

  bandSelectionDiv.appendChild(label);
});

// Create color selection buttons
colors.forEach(function(color) {
  const button = document.createElement('div');
  button.className = 'colorButton';
  button.style.backgroundColor = color.name.toLowerCase();
  button.dataset.image = color.image;

  button.addEventListener('click', function() {
    selectColor(button);
  });

  colorSelectionDiv.appendChild(button);
});

function selectColor(colorButton) {
  const buttons = document.getElementsByClassName('colorButton');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('selected');
  }

  colorButton.classList.add('selected');
  selectedColorButton = colorButton;

  const canvas = document.getElementById('posterCanvas');
  const context = canvas.getContext('2d');

  context.clearRect(0, 0, canvas.width, canvas.height); // Effacer le canvas

  const image = new Image();
  image.src = colorButton.dataset.image;

  image.onload = function() {
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
  };
}

document.getElementById('posterForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const bands = document.querySelectorAll('input[name="band"]:checked');
  if (bands.length !== 5) {
    alert('Please select exactly 5 bands.');
    return;
  }

  const festivalName = document.querySelector('input[name="festivalName"]').value;
  if (festivalName.trim() === '') {
    alert('Please enter your festival name.');
    return;
  }

  if (!selectedColorButton) {
    alert('Please select a background color.');
    return;
  }

  const selectedBands = [];
  for (let i = 0; i < bands.length; i++) {
    selectedBands.push(bands[i].value);
  }

  const posterCanvas = document.getElementById('posterCanvas');
  const context = posterCanvas.getContext('2d');

  // Clear canvas
  context.clearRect(0, 0, posterCanvas.width, posterCanvas.height);

  // Draw background image
  const backgroundImage = new Image();
  backgroundImage.src = selectedColorButton.dataset.image;

  backgroundImage.onload = function() {
    context.drawImage(backgroundImage, 0, 0, posterCanvas.width, posterCanvas.height);

    let loadedCount = 0; // Compteur des logos chargés

    // Fonction de rappel pour charger les logos
    function loadLogo(bandName, index) {
      const logo = new Image();
      logo.src = getLogoPath(bandName);

      logo.onload = function() {
        loadedCount++;

        if (loadedCount === selectedBands.length) {
          // Tous les logos sont chargés
          drawPoster();
        }
      };

      loadedLogos[index] = logo; // Stocker le logo chargé
    }

    // Charger tous les logos des groupes sélectionnés
    selectedBands.forEach(function(bandName, index) {
      if (loadedLogos[index]) {
        // Utiliser le logo déjà chargé
        loadedCount++;

        if (loadedCount === selectedBands.length) {
          // Tous les logos sont chargés
          drawPoster();
        }
      } else {
        // Charger le logo
        loadLogo(bandName, index);
      }
    });
  };
});

function getLogoPath(bandName) {
  const selectedBand = bands.find(function(band) {
    return band.name === bandName;
  });

  return selectedBand ? selectedBand.logo : '';
}

function drawPoster() {
  const bands = document.querySelectorAll('input[name="band"]:checked');
  const festivalName = document.querySelector('input[name="festivalName"]').value;
  const posterCanvas = document.getElementById('posterCanvas');
  const context = posterCanvas.getContext('2d');

  // Draw background image
  const backgroundImage = new Image();
  backgroundImage.src = selectedColorButton.dataset.image;

  backgroundImage.onload = function() {
    context.drawImage(backgroundImage, 0, 0, posterCanvas.width, posterCanvas.height);

    // Shuffle the bands array randomly
    const shuffledBands = Array.from(bands).sort(function() {
      return 0.5 - Math.random();
    });

    // Draw festival name
    const fontSize = 48;
    const fontFamily = festivalNameFonts[Math.floor(Math.random() * festivalNameFonts.length)];
    context.fillStyle = '#ffffff';
    context.font = `${fontSize}px ${fontFamily}`;
    context.textAlign = 'center';
    context.fillText(festivalName, posterCanvas.width / 2, 100);

    // Draw band logos
    const logoSize = 100;
    const logoSpacing = 20;
    const startY = 200;
    const margin = 20; // Margin to keep logos away from the edges

    for (let j = 0; j < shuffledBands.length; j++) {
      const bandName = shuffledBands[j].value;
      const bandLogo = loadedLogos[j];

      const logoX = getRandomX(margin, posterCanvas.width - logoSize - margin);
      const logoY = getRandomY(startY, posterCanvas.height - logoSize - margin);

      context.drawImage(bandLogo, logoX, logoY, logoSize, logoSize);
    }

    // Export as JPEG
    const link = document.createElement('a');
    link.href = posterCanvas.toDataURL('image/jpeg');
    link.download = 'poster.jpg';
    link.click();
  };
}

function getRandomX(min, max) {
  min = min || 0;
  max = max || 0;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomY(min, max) {
  min = min || 0;
  max = max || 0;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

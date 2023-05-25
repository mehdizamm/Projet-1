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
const bands = [
  { name: 'Aerosmith', logo: '../assets/images/Aerosmith.png' },
  { name: 'Metallica', logo: '../assets/images/Metallica.png' },
  { name: 'Kiss', logo: '../assets/images/Kiss.png' },
  { name: 'PNL', logo: '../assets/images/PNL.png' },
  { name: 'Jul', logo: '../assets/images/Jul.png' },
  { name: 'Scorpions', logo: '../assets/images/Scorpions.png' },
  { name: 'Kekra', logo: '../assets/images/Kekra.png' },
  { name: 'PinkFloyd', logo: '../assets/images/PinkFloyd.png' },
  { name: 'Indila', logo: '../assets/images/Indila.png' },
  { name: 'Tiesto', logo: '../assets/images/Tiesto.png' },
  { name: 'AvengedSevenfold', logo: '../assets/images/AvengedSevenfold.png' },
  { name: 'Gojira', logo: '../assets/images/Gojira.png' },
  // Add more bands here
];

const colors = [
  { name: 'Black', image: '../assets/images/blackBtn.png' },
  { name: 'Yellow', image: '../assets/images/yellowBtn.png' },
  { name: 'Pink', image: '../assets/images/pinkBtn.png' },
  { name: 'Blue', image: '../assets/images/blueBtn.png' },
  { name: 'Red', image: '../assets/images/redBtn.png' },
];

const festivalNameFonts = [
  'Arial, sans-serif',
  'Helvetica, sans-serif',
  'Verdana, sans-serif',
  'Georgia, serif',
  'Times New Roman, serif',
];

const resetButton = document.getElementById('resetBtn');
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

          // Activer le bouton "share" une fois que le poster est généré
          document.getElementById('shareBtn').disabled = false;
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

          // Activer le bouton "share" une fois que le poster est généré
          document.getElementById('shareBtn').disabled = false;
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
    const fontSize = 60;
    const fontFamily = festivalNameFonts[Math.floor(Math.random() * festivalNameFonts.length)];
    context.font = `${fontSize}px ${fontFamily}`;
    context.textAlign = 'center';
    context.fillStyle = 'turquoise';
    context.fillText(festivalName, posterCanvas.width / 2, 200);

    // Draw band logos
    const logoSize = 150;
    const logoSpacing = 20;
    const startY = 200;
    const margin = 20; // Margin to keep logos away from the edges

    const logoPositions = []; // Array to store logo positions

    for (let j = 0; j < shuffledBands.length; j++) {
      const bandName = shuffledBands[j].value;
      const logo = loadedLogos[j];

      // Generate random x and y coordinates for the logo
      let x = Math.random() * (posterCanvas.width - 2 * margin - logoSize) + margin;
      let y = Math.random() * (posterCanvas.height - startY - margin - logoSize) + startY;

      // Check for collisions with other logos
      let collision = false;
      for (let k = 0; k < logoPositions.length; k++) {
        const pos = logoPositions[k];
        const dx = x - pos.x;
        const dy = y - pos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < logoSize) {
          collision = true;
          break;
        }
      }

      if (collision) {
        // If collision detected, generate new coordinates
        j--; // Retry with the same band
        continue;
      }

      // Draw the logo
      context.drawImage(logo, x, y, logoSize, logoSize);

      // Store the logo position
      logoPositions.push({ x, y });
    }
  };
  window.scrollTo(2720, 2720);
}

// Share button click event
document.getElementById('shareBtn').addEventListener('click', function() {
  const posterCanvas = document.getElementById('posterCanvas');
  const dataURL = posterCanvas.toDataURL(); // Convert canvas to data URL

  // Create a temporary link element
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'poster.png'; // Set the download attribute

  // Simulate a click on the link to trigger the download
  link.click();
});

// Reset button click event
resetButton.addEventListener('click', function() {
  const bands = document.querySelectorAll('input[name="band"]');
  const festivalNameInput = document.querySelector('input[name="festivalName"]');
  const colorButtons = document.getElementsByClassName('colorButton');

  // Uncheck all band checkboxes
  for (let i = 0; i < bands.length; i++) {
    bands[i].checked = false;
  }

  // Clear festival name input
  festivalNameInput.value = '';

  // Remove color selection
  for (let i = 0; i < colorButtons.length; i++) {
    colorButtons[i].classList.remove('selected');
  }

  selectedColorButton = null;

  // Clear canvas
  const posterCanvas = document.getElementById('posterCanvas');
  const context = posterCanvas.getContext('2d');
  context.clearRect(0, 0, posterCanvas.width, posterCanvas.height);

  // Disable the share button
  document.getElementById('shareBtn').disabled = true;

  // Scroll to top
  window.scrollTo(500, 500);
});

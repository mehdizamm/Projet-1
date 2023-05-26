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
  { name: 'Aerosmith', logo: '../assets/images/readaerosmith.png' },
  { name: 'Metallica', logo: '../assets/images/metallicapink.png' },
  { name: 'Kiss', logo: '../assets/images/Kiss.png' },
  { name: 'PNL', logo: '../assets/images/PNL.png' },
  { name: 'Jul', logo: '../assets/images/Jul.png' },
  { name: 'Scorpions', logo: '../assets/images/scorpionsorange.png' },
  { name: 'Kekra', logo: '../assets/images/Kekra.png' },
  { name: 'PinkFloyd', logo: '../assets/images/pinkfloyedred.png' },
  { name: 'ChelseaGrin', logo: '../assets/images/chelseapink.png' },
  { name: 'Tiesto', logo: '../assets/images/Tiesto.png' },
  { name: 'AvengedSevenfold', logo: '../assets/images/avengedturquoise.png' },
  { name: 'Gojira', logo: '../assets/images/gojiraorange.png' },
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
  'Courier New, monospace',
  'Impact, fantasy',
];

const resetButton = document.getElementById('resetBtn');
const bandSelectionDiv = document.getElementById('bandSelection');
const colorSelectionDiv = document.getElementById('colorSelection');
let selectedColorButton = null;
const loadedLogos = {}; // To store already loaded logos

// Create band selection checkboxes
bands.forEach(function (band) {
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
colors.forEach(function (color) {
  const button = document.createElement('div');
  button.className = 'colorButton';
  button.style.backgroundColor = color.name.toLowerCase();
  button.dataset.image = color.image;

  button.addEventListener('click', function () {
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

  context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  const image = new Image();
  image.src = colorButton.dataset.image;

  image.onload = function () {
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
  };
}

document.getElementById('posterForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const bands = document.querySelectorAll('input[name="band"]:checked');
  if (bands.length !== 7) {
    alert('Please select exactly 7 bands.');
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

  backgroundImage.onload = function () {
    context.drawImage(backgroundImage, 0, 0, posterCanvas.width, posterCanvas.height);

    let loadedCount = 0; // Counter for loaded logos

    // Callback function to load logos
    function loadLogo(bandName, index) {
      const logo = new Image();
      logo.src = getLogoPath(bandName);

      logo.onload = function () {
        loadedCount++;

        if (loadedCount === selectedBands.length) {
          // All logos are loaded
          drawPoster();
          document.getElementById('shareBtn').disabled = false; // Enable the "share" button once the poster is generated
        }
      };

      loadedLogos[index] = logo; // Store the loaded logo
    }

    // Load all logos of the selected bands
    selectedBands.forEach(function (bandName, index) {
      if (loadedLogos[index]) {
        // Use the already loaded logo
        loadedCount++;

        if (loadedCount === selectedBands.length) {
          // All logos are loaded
          drawPoster();
          document.getElementById('shareBtn').disabled = false; // Enable the "share" button once the poster is generated
        }
      } else {
        // Load the logo
        loadLogo(bandName, index);
      }
    });
  };
});

function getLogoPath(bandName) {
  const selectedBand = bands.find(function (band) {
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

  backgroundImage.onload = function () {
    context.drawImage(backgroundImage, 0, 0, posterCanvas.width, posterCanvas.height);

    // Shuffle the bands array randomly
    const shuffledBands = Array.from(bands).sort(function () {
      return 0.5 - Math.random();
    });

    // Draw festival name
    const fontSize = 60;
    const fontFamily =
      festivalNameFonts[Math.floor(Math.random() * festivalNameFonts.length)];
    context.font = `${fontSize}px ${fontFamily}`;
    context.textAlign = 'center';
    context.fillStyle = 'black';
    const textY = 300;
    const maxTextWidth = posterCanvas.width - 2 * 100; // Max width to keep text away from edges

    let adjustedFestivalName = festivalName;
    let textWidth = context.measureText(adjustedFestivalName).width;
    while (textWidth > maxTextWidth) {
      adjustedFestivalName = adjustedFestivalName.slice(0, -1); // Remove last character
      textWidth = context.measureText(adjustedFestivalName).width;
    }

    context.fillText(adjustedFestivalName, posterCanvas.width / 2, textY);

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

      // Check for collisions with other logos and text
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

      const textWidth = context.measureText(adjustedFestivalName).width;
      const textLeft = posterCanvas.width / 2 - textWidth / 2;
      const textRight = posterCanvas.width / 2 + textWidth / 2;
      const textTop = textY - fontSize / 2;
      const textBottom = textY + fontSize / 2;

      if (
        x + logoSize > textLeft &&
        x < textRight &&
        y + logoSize > textTop &&
        y < textBottom
      ) {
        collision = true;
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
document.getElementById('shareBtn').addEventListener('click', function () {
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
resetButton.addEventListener('click', function () {
  // Reset form
  document.getElementById('posterForm').reset();

  // Reset color selection
  const buttons = document.getElementsByClassName('colorButton');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('selected');
  }
  selectedColorButton = null;

  // Clear canvas
  const posterCanvas = document.getElementById('posterCanvas');
  const context = posterCanvas.getContext('2d');
  context.clearRect(0, 0, posterCanvas.width, posterCanvas.height);

  window.scrollTo(500, 500);
});

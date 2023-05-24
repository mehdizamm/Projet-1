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
    // Add more bands here
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
  var loadedLogos = {}; // Pour stocker les logos déjà chargés
  
  // Create band selection checkboxes
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
  
  // Create color selection buttons
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
  
  function selectColor(colorButton) {
    var buttons = document.getElementsByClassName('colorButton');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('selected');
    }
  
    colorButton.classList.add('selected');
    selectedColorButton = colorButton;
  
    var canvas = document.getElementById('posterCanvas');
    var context = canvas.getContext('2d');
  
    context.clearRect(0, 0, canvas.width, canvas.height); // Effacer le canvas
  
    var image = new Image();
    image.src = colorButton.dataset.image;
  
    image.onload = function() {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  }
  
  document.getElementById('posterForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    var bands = document.querySelectorAll('input[name="band"]:checked');
    if (bands.length !== 5) {
      alert('Please select exactly 5 bands.');
      return;
    }
  
    var festivalName = document.querySelector('input[name="festivalName"]').value;
    if (festivalName.trim() === '') {
      alert('Please enter your festival name.');
      return;
    }
  
    if (!selectedColorButton) {
      alert('Please select a background color.');
      return;
    }
  
    var selectedBands = [];
    for (var i = 0; i < bands.length; i++) {
      selectedBands.push(bands[i].value);
    }
  
    var posterCanvas = document.getElementById('posterCanvas');
    var context = posterCanvas.getContext('2d');
  
    // Clear canvas
    context.clearRect(0, 0, posterCanvas.width, posterCanvas.height);
  
    // Draw background image
    var backgroundImage = new Image();
    backgroundImage.src = selectedColorButton.dataset.image;
  
    backgroundImage.onload = function() {
      context.drawImage(backgroundImage, 0, 0, posterCanvas.width, posterCanvas.height);
  
      var loadedCount = 0; // Compteur des logos chargés
  
      // Fonction de rappel pour charger les logos
      function loadLogo(bandName, index) {
        var logo = new Image();
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
    var selectedBand = bands.find(function(band) {
      return band.name === bandName;
    });
  
    return selectedBand ? selectedBand.logo : '';
  }
  
  function drawPoster() {
    var bands = document.querySelectorAll('input[name="band"]:checked');
    var festivalName = document.querySelector('input[name="festivalName"]').value;
    var posterCanvas = document.getElementById('posterCanvas');
    var context = posterCanvas.getContext('2d');
  
    // Draw background image
    var backgroundImage = new Image();
    backgroundImage.src = selectedColorButton.dataset.image;
  
    backgroundImage.onload = function() {
      context.drawImage(backgroundImage, 0, 0, posterCanvas.width, posterCanvas.height);
  
      // Shuffle the bands array randomly
      var shuffledBands = Array.from(bands).sort(function() {
        return 0.5 - Math.random();
      });
  
      // Draw festival name
      var fontSize = 48;
      var fontFamily = festivalNameFonts[Math.floor(Math.random() * festivalNameFonts.length)];
      context.fillStyle = '#ffffff';
      context.font = fontSize + 'px ' + fontFamily;
      context.textAlign = 'center';
      context.fillText(festivalName, posterCanvas.width / 2, 100);
  
      // Draw band logos
      var logoSize = 100;
      var logoSpacing = 20;
      var totalHeight = (logoSize * shuffledBands.length) + (logoSpacing * (shuffledBands.length - 1));
      var startY = (posterCanvas.height - totalHeight) / 2;
      var margin = 20; // Margin to keep logos away from the edges
  
      for (var j = 0; j < shuffledBands.length; j++) {
        var bandName = shuffledBands[j].value;
        var bandLogo = loadedLogos[j];
  
        var logoX = getRandomX(margin, posterCanvas.width - logoSize - margin);
        var logoY = startY;
  
        context.drawImage(bandLogo, logoX, logoY, logoSize, logoSize);
  
        startY += logoSize + logoSpacing;
      }
  
      // Export as JPEG
      var link = document.createElement('a');
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
  
  
// // Array with available poster options
// var posterOptions = [
//     { value: "Option 1", text: "Option 1 description" },
//     { value: "Option 2", text: "Option 2 description" },
//     // Add more options with their descriptions
//   ];
  
//   // Listen for form submission
//   var form = document.getElementById("posterForm");
//   form.addEventListener("submit", function(event) {
//     event.preventDefault(); // Prevent form submission
  
//     var selectedOptions = Array.from(document.querySelectorAll("input[name='option']:checked"))
//       .map(function(checkbox) {
//         return checkbox.value;
//       });
  
//     generatePoster(selectedOptions);
//   });

//   function generatePoster(selectedOptions) {
//     var canvas = document.getElementById("posterCanvas");
//     var ctx = canvas.getContext("2d");
  
//     // Clear the canvas
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
  
//     // Set up the poster content
//     ctx.font = "20px Arial";
//     ctx.fillStyle = "black";
//     ctx.textAlign = "center";
  
//     var yPos = 50;
//     selectedOptions.forEach(function(option) {
//       var optionData = posterOptions.find(function(opt) {
//         return opt.value === option;
//       });
  
//       if (optionData) {
//         ctx.fillText(optionData.text, canvas.width / 2, yPos);
//         yPos += 30;
//       }
//     });
//   }

function canvasToImage() {
  var canvas = document.getElementById("shakira");
  if (canvas.getContext) { // Check if HTML5 Canvas is supported
  // Canvas to Image
  var canvasImageData = canvas.toDataURL(); // save canvas to image data in .png format
  var image = document.getElementById("html5Image"); // get image element in HTML page
  image.src = canvasImageData; // set image source to canvas image data
  }
  }

  const results = On selectionne 5 groupes parmis tout les choix de groupes on y ajoute 
un fond parmis ceux proposés et enfin on le lui ajoute un titre choisi par l'utilisateur
5 checkbox sélectionnées maximum, un choix couleur radio rattaché à une image source et un input text de titre"


"On veut déverser les choix de l'utilisateur dans un tableau, puis utiliser ce 
tableau pour implémenter les éléments du poster dans le canvas"

// import posterBackgrounds from './canvas.json' assert {type: 'json'};
// console.log(canvas.name);
let tableauJSON = [
  {
    "name": "Blue",
    "picture": "../assets/images/pinkbgd"
  },
  {
    "name": "Green",
    "picture": "https://placekitten.com/200/139"
  },
  ];
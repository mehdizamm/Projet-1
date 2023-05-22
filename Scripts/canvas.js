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

const inputWidth = document.getElementById("inputWidth");
const inputHeight = document.getElementById("inputHeight");
const inputDataUrl = document.getElementById("inputDataUrl");
const imagePreview = document.getElementById("imagePreview");
const inputText = document.getElementById("inputText");

document.getElementById("buttonGenerate").addEventListener("click", () => {
  const MIN_SIDE_LENGTH = 200;

  // Validation
  if (
    isNaN(inputWidth.value) ||
    isNaN(inputHeight.value) ||
    inputWidth.value < MIN_SIDE_LENGTH ||
    inputHeight.value < MIN_SIDE_LENGTH
  ) {
    alert(
      `Please enter a valid image size. The minimum length is ${MIN_SIDE_LENGTH}px`
    );
    return;
  }

  const canvasElement = createPlaceholderCanvas(
    inputWidth.value,
    inputHeight.value,
    inputText.value
  );
  const dataUrl = canvasElement.toDataURL();

  // inputDataUrl.value = dataUrl;
  imagePreview.src = dataUrl;
  imagePreview.style.display = "block";
  imagePreview.style.maxWidth = `${inputWidth.value}px`;
});

/**
 * Creates a HTML canvas element of the given size.
 *
 * @param {number} width
 * @param {number} height
 * @param {text} text
 * @returns {HTMLCanvasElement}
 */
function createPlaceholderCanvas(width, height, text) {
  const element = document.createElement("canvas");
  const context = element.getContext("2d");

  element.width = width;
  element.height = height;
  element.text = text;

  // Fill in the background
  context.fillStyle = "#aaaaaa";
  context.fillRect(0, 0, element.width, element.height);

  // Place the text
  context.font = "bold 90px sans-serif";
  context.fillStyle = "#333333";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(`${text}`, element.width / 2, element.height / 2);

  return element;
}

const results = On selectionne 5 groupes parmis tout les choix de groupes on y ajoute 
un fond parmis ceux proposés et enfin on le lui ajoute un titre choisi par l'utilisateur
5 checkbox sélectionnées maximum, un choix couleur radio rattaché à une image source et un input text de titre"

// Array with available poster options
var posterOptions = [
    { value: "Option 1", text: "Option 1 description" },
    { value: "Option 2", text: "Option 2 description" },
    // Add more options with their descriptions
  ];
  
  // Listen for form submission
  var form = document.getElementById("posterForm");
  form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
  
    var selectedOptions = Array.from(document.querySelectorAll("input[name='option']:checked"))
      .map(function(checkbox) {
        return checkbox.value;
      });
  
    generatePoster(selectedOptions);
  });

  function generatePoster(selectedOptions) {
    var canvas = document.getElementById("posterCanvas");
    var ctx = canvas.getContext("2d");
  
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Set up the poster content
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
  
    var yPos = 50;
    selectedOptions.forEach(function(option) {
      var optionData = posterOptions.find(function(opt) {
        return opt.value === option;
      });
  
      if (optionData) {
        ctx.fillText(optionData.text, canvas.width / 2, yPos);
        yPos += 30;
      }
    });
  }
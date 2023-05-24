function displayImage() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
  
    var image = new Image();
    image.src = "../assets/images/bluebgd.jpeg"; // Replace with the path to your image
  
    image.onload = function() {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  }
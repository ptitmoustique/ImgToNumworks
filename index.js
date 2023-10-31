// Obtenez la référence de l'image
const image = document.getElementById("myImage");
const pixelSizeInput = document.getElementById("pixelSizeInput");
const py = document.getElementById("py");


// Créez un élément canvas
const canvas = document.createElement("canvas");
canvas.width = image.width;
canvas.height = image.height;

const context = canvas.getContext("2d");

// Dessinez l'image sur le canvas
context.drawImage(image, 0, 0, image.width, image.height);

// Obtenez les données des pixels
const imageData = context.getImageData(0, 0, image.width, image.height);

const pixelData = imageData.data; // Tableau contenant les données de chaque pixel (R, G, B, A)

const pixelColors = [];

for (let i = 0; i < pixelData.length; i += 4) {
  const r = pixelData[i];
  const g = pixelData[i + 1];
  const b = pixelData[i + 2];
  const a = pixelData[i + 3];

  // Ajoutez la couleur RGB du pixel au tableau
  pixelColors.push({ r, g, b, a });
}

let pyCode = `from kandinsky import *;`


const outputCanvas = document.createElement("canvas");
outputCanvas.width = image.width;
outputCanvas.height = image.height;
document.body.appendChild(outputCanvas); // Ajoutez le canvas à votre page
const outputContext = outputCanvas.getContext("2d");

function draw() {
  let pyCode = `from kandinsky import *;`

  outputContext.clearRect(0, 0, outputCanvas.height, outputCanvas.width);

  let dataIndex = 0;
  let pixelSize = parseInt(pixelSizeInput.value);

  for (let y = 0; y < image.height/pixelSize; y++) {
    for (let x = 0; x < image.width/pixelSize; x++) {
      if (dataIndex < pixelColors.length) {
        const color = pixelColors[dataIndex];
        outputContext.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
        pyCode+= `set_pixel(${x},${y},[${color.r},${color.g},${color.b}]);`
        //outputContext.fillStyle = "rgb(255, 165, 0)";
        outputContext.fillRect(x, y, 1, 1);

        dataIndex+=pixelSize // Avance au prochain ensemble de données de pixel
      }
    }
    dataIndex+=(pixelSize*image.width)-image.width
  }

  py.textContent = pyCode
}

document.addEventListener("DOMContentLoaded", draw());

pixelSizeInput.addEventListener("change", () => {
  draw();
});
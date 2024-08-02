const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(image) {
  return fetch(image.url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load image's URL: ${image.url}`);
      }
      return response.blob();
    })
    .then(blob => {
      const imgURL = URL.createObjectURL(blob);
      return imgURL;
    })
    .catch(error => {
      console.error(error.message);
      return null; 
    });
}

function displayImages(imageUrls) {
  output.innerHTML = '';
  imageUrls.forEach(imgURL => {
    if (imgURL) {
      const img = document.createElement('img');
      img.src = imgURL;
      img.alt = 'Downloaded Image';
      img.style.margin = '10px';
      output.appendChild(img);
    } else {
      console.warn('An image failed to load and will not be displayed.');
    }
  });
}

btn.addEventListener("click", () => {
  const downloadPromises = images.map(image => downloadImage(image));

  Promise.all(downloadPromises).then(imageUrls => {
    displayImages(imageUrls);
  }).catch(error => {
    console.error('An error occurred:', error);
  });
});

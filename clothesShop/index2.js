const thumbnails = document.querySelectorAll(".thumbnail-images img");
const mainImage = document.querySelector(".main-image img");

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", () => {
    mainImage.src = thumbnail.src;
  });
});

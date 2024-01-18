async function compareImages() {
  //import ssim from "ssim.js";

  const ssim = require("ssim");

  const img1 = loadImage("./img1.jpg");
  const img2 = loadImage("./img2.jpg");

  const { mssim, performance } = ssim(img1, img2);

  console.log(`SSIM: ${mssim} (${performance}ms)`);
}

module.exports = {
  compareImages,
};

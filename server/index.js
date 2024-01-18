const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.listen(8080, () => {
  console.log("Server started.\n");
});

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.post("/mint", async (req, res) => {
  const token = require("./MintNFT");

  try {
    token.mintToken();
  } catch (error) {
    console.error(error);
  }

  res.send("Token minted!");
});

app.post("/compare", async (req, res) => {
  const compare = require("./CompareImages");

  try {
    compare.compareImages();
  } catch (error) {
    console.error(error);
  }

  res.send("Images compared!");
});

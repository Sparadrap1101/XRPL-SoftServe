const express = require("express");
const app = express();
const cors = require("cors");
const { spawn } = require("child_process");
const multer = require("multer");

let userImgName = "";

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "img/");
  },
  filename: function (req, file, cb) {
    userImgName = file.originalname;
    cb(null, `${userImgName}`);
  },
});

const imageUpload = multer({ storage: storage });

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

app.post("/compare", imageUpload.array("my-image-file"), async (req, res) => {
  try {
    const result = await executePython("./compare.py", [userImgName]);

    res.json({ result: result });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

const executePython = async (script, args) => {
  const arguments = args.map((arg) => arg.toString());

  const py = spawn("python3", [script, ...arguments]);

  const result = await new Promise((resolve, reject) => {
    let output;

    // Get output from python script
    py.stdout.on("data", (data) => {
      output = JSON.parse(data);
    });

    // Handle erros
    py.stderr.on("data", (data) => {
      console.error(`[python] Error occured: ${data}`);
      reject(`Error occured in ${script}`);
    });

    py.on("exit", (code) => {
      console.log(`Child process exited with code ${code}`);
      resolve(output);
    });
  });

  return result;
};

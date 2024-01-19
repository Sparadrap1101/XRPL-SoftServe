import React, { useState } from "react";
import axios from "axios";
import logo from "./logo.png";
import "./App.css";

function App() {
  const [file, setFile] = useState();
  const [uploadText, setUploadText] = useState("Upload your Artwork here:");
  const [image, setImage] = useState(null);
  const [mintResult, setMintResult] = useState("");

  const apiCallMint = () => {
    axios.post("http://localhost:8080/mint").then((data) => {
      console.log(data);
    });
  };

  const apiCallCompare = () => {
    axios.post("http://localhost:8080/compare", image).then((data) => {
      console.log(data.data.result);

      if (data.data.result == 0) {
        setMintResult("Your NFT artwork's IP as been successfully minted!");
        apiCallMint();
      } else {
        setMintResult("Unfortunately your artwork already have an IP owner.");
      }
    });
  };

  function handleChange(e) {
    const formData = new FormData();
    formData.append("my-image-file", e.target.files[0], e.target.files[0].name);

    setImage(formData);
    setUploadText("Here is your Artwork:");
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>SoftServe</h1>

        <button className="button-85" onClick={apiCallCompare}>
          <strong>Authenticate Your Artwork</strong>
        </button>
        <p>{mintResult}</p>

        <div className="Image">
          <h4>{uploadText}</h4>
          <input type="file" id="file" className="inputfile" onChange={handleChange} />
          <label for="file">
            <u>Choose a file</u>
          </label>
        </div>
        <div>
          <img src={file} style={{ maxWidth: "200px", maxHeight: "200px" }} />
        </div>
      </header>
    </div>
  );
}

export default App;

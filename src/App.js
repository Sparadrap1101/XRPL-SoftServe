import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

const apiCallMint = () => {
  axios.post("http://localhost:8080/mint").then((data) => {
    console.log(data);
  });
};

const apiCallCompare = () => {
  axios.post("http://localhost:8080/compare").then((data) => {
    console.log(data);
  });
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <button onClick={apiCallMint}>Mint</button>
        <button onClick={apiCallCompare}>Compare</button>
      </header>
    </div>
  );
}

export default App;

import React from "react";
import logo from "./logo.svg";
import "./App.css";

const App: React.FC = () => {
  React.useEffect(() => {
    const url = `http://en.wikipedia.org/w/api.php?action=parse&page=2019–20_Premier_League&prop=text&section=6&format=json&origin=*`;
    fetch(url, {
      mode: "cors" // no-cors, *cors, same-origin
    })
      .then(res => res.json())
      .then(res => console.log(res.parse.text));
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Suhhhhhhhh
        </a>
      </header>
    </div>
  );
};

export default App;

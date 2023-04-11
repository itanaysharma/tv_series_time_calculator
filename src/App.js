import "./App.css";
import React from "react";

function App() {
  const [timer, setTimer] = React.useState([0, 0, 0]);
  return (
    <div>
      <form className="mainform">
        <h1 className="timer">
          {timer[0].toString() +
            " : " +
            timer[1].toString() +
            " : " +
            timer[2].toString()}
        </h1>
        <input
          className="movie_text"
          type="text"
          placeholder="TV Series Name"
        ></input>
      </form>
    </div>
  );
}

export default App;

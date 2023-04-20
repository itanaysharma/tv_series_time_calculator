import "./App.css";
import React from "react";
const API_ENDPOINT = "https://api.tvmaze.com/singlesearch/shows?q=";
function App() {
  const [totalTime, setTotalTimer] = React.useState([0, 0, 0]);
  const [seriesName, setSeriesName] = React.useState("");
  const [apiCall, setApiCall] = React.useState("");

  const handleName = (event) => {
    // console.log(event.target.value);
    setSeriesName(event.target.value);
  };
  const handleSubmit = (event) => {
    const name = seriesName.replaceAll(" ", "+");
    setApiCall(name);
    console.log(apiCall);
    event.preventDefault();
  };

  return (
    <div className="mainform">
      <h1 className="timer">
        {totalTime[0].toString() +
          " : " +
          totalTime[1].toString() +
          " : " +
          totalTime[2].toString()}
      </h1>
      <div>
        <TvSeries saveName={handleName} final_submit={handleSubmit}></TvSeries>
        {apiCall.length !== 0 && <API series={apiCall}></API>}
      </div>
    </div>
  );
}

const TvSeries = ({ saveName, final_submit }) => (
  <form onSubmit={final_submit}>
    <input
      className="movie_text"
      type="text"
      placeholder="TV Series"
      onChange={saveName}
    ></input>
    <button type="submit" className="button">
      Cl
    </button>
  </form>
);

const API = (series) => {
  const runTime = 0;
  console.log("hello");
  fetch(`${API_ENDPOINT}${series}&embed=episodes`)
    .then((response) => response.json())
    .then((result) => console.log(result._embedded.episodes));
};
// const URL = ()=>(

// )

export default App;

//

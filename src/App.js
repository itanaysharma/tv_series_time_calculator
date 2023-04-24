import "./App.css";
import React from "react";
function convertMinutesToDHM(minutes) {
  const oneDayInMinutes = 1440;
  const oneHourInMinutes = 60;

  let days = Math.floor(minutes / oneDayInMinutes);
  let hours = Math.floor((minutes % oneDayInMinutes) / oneHourInMinutes);
  let remainingMinutes = minutes % oneHourInMinutes;
  days = days < 10 ? "0" + days : days;
  hours = hours < 10 ? "0" + hours : hours;
  remainingMinutes =
    remainingMinutes < 10 ? "0" + remainingMinutes : remainingMinutes;

  return days + " d : " + hours + " h : " + remainingMinutes + " m";
}

const API_ENDPOINT = "https://api.tvmaze.com/singlesearch/shows?q=";
function App() {
  const [isSubmit, setIsSubmit] = React.useState(false);

  const [totalTime, setTotalTimer] = React.useState("00:00");
  const [seriesName, setSeriesName] = React.useState("");
  const [apiCall, setApiCall] = React.useState("");
  const apiCallName = React.useRef("");

  const handleName = (event) => {
    setSeriesName(event.target.value);
  };

  const handleSubmit = (event) => {
    const name = seriesName.replaceAll(" ", "+");
    // setApiCall(name);
    apiCallName.current = name;
    setIsSubmit(true);
    console.log(apiCallName.current + "from");
    event.preventDefault();
  };

  function resetSubmit() {
    setIsSubmit(false);
  }

  return (
    <div className="mainform">
      <h1 className="timer">{totalTime}</h1>
      <div>
        <TvSeries saveName={handleName} final_submit={handleSubmit}></TvSeries>
        {isSubmit && (
          <API
            series={apiCallName.current}
            submit={resetSubmit}
            time={setTotalTimer}
          ></API>
        )}
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

const API = ({ series, submit, time }) => {
  let result_list;
  React.useEffect(() => {
    let isMounted = true; // Add this line

    const fetchData = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}${series}&embed=episodes`);
        const result = await response.json();

        if (isMounted) {
          // Add this line
          result_list = result._embedded.episodes;

          let total_time = 0;
          let series_dictionary = {};
          result_list.forEach((obj) => {
            total_time += obj.runtime;
            if (!(obj.season in series_dictionary)) {
              series_dictionary[obj.season] = obj.runtime;
            } else {
              series_dictionary[obj.season] += obj.runtime;
            }
          });
          // console.log(series_dictionary);
          // console.log(total_time);
          time(convertMinutesToDHM(total_time));
          submit();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Add this line
    };
  }, []); // Keep the empty dependency array

  return null;
};

// const URL = ()=>(

// )

export default App;

//

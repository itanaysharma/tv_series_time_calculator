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

  return (
    days + " Days : " + hours + " hours : " + remainingMinutes + " minutes"
  );
}

const API_ENDPOINT = "https://api.tvmaze.com/singlesearch/shows?q=";
function App() {
  const [isSubmit, setIsSubmit] = React.useState(false);

  const [totalTime, setTotalTimer] = React.useState("00:00");
  const [seriesName, setSeriesName] = React.useState("");
  const apiCallName = React.useRef("");
  const [showLine, setShowLine] = React.useState(false);
  const [globalDict, setGlobalDict] = React.useState({});
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
    setShowLine(true);
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
            sendhere={setGlobalDict}
          ></API>
        )}
        {console.log(Object.values(globalDict))}
        {console.log("global")}
        {showLine && <Line points={Object.values(globalDict)}></Line>}
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

const API = ({ series, submit, time, sendhere }) => {
  let result_list;
  let series_dictionary = {};
  React.useEffect(() => {
    let isMounted = true; // Add this line

    const fetchData = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}${series}&embed=episodes`);
        const result = await response.json();
        console.log(result);

        if (isMounted) {
          // Add this line
          result_list = result._embedded.episodes;
          const imageURL = result.image.original;
          document.body.style.background = `url(${imageURL}) no-repeat fixed center`;
          document.body.style.opacity = "1";
          let total_time = 0;

          result_list.forEach((obj) => {
            total_time += obj.runtime;
            if (!(obj.season in series_dictionary)) {
              series_dictionary[obj.season] = obj.runtime;
            } else {
              series_dictionary[obj.season] += obj.runtime;
            }
          });
          console.log(series_dictionary);
          sendhere(series_dictionary);
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

  // return <Line points={Object.values(series_dictionary)}></Line>;
  return null;
};

// const URL = ()=>(

// )
const Line = ({ points, image }) => {
  console.log(points);
  console.log("this");
  const prefixSum = [0, points[0]];

  for (let i = 2; i < points.length + 1; i++) {
    prefixSum[i] = prefixSum[i - 1] + points[i - 1];
  }
  console.log(prefixSum);
  return (
    <div className="">
      {/* <h3 className="line">Seasons</h3> */}
      <div
        className="line"
        style={{ height: 10 + prefixSum[prefixSum.length - 1] / 10 }}
      >
        {prefixSum.map((point, index) => (
          <div
            key={index}
            className="point"
            style={{ left: 0, top: `${point / 10}px` }}
          >
            {index}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

//

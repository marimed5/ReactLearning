import React, { useState, useEffect } from "react";

function Timer() {
  const [endDate, setEndDate] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const [countStart, setCountStart] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!countStart) return;
    const interval = setInterval(() => {
      let date = new Date();
      const lastDate = new Date(endDate);
      lastDate.setHours(0, 0, 0, 0); //Set the end date to midnight

      let timeDifference = lastDate - date;

      if (timeDifference < 0) {
        setError(true);
        clearInterval(interval);
      } else {
        let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        let hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setTimeLeft(`${days} : ${hours} : ${minutes} : ${seconds}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate, countStart]);

  return (
    <div>
      <form>
        <h1>Remaining time: </h1>
        <div>What's the end date? (MM/DD/YYYY)</div>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        ></input>
      </form>
      <button type="submit" onClick={() => setCountStart(true)}>
        GO
      </button>
      {error && <div>The date you entered has already passed.</div>}
      <h2>{timeLeft}</h2>
    </div>
  );
}

export default Timer;

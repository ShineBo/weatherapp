import React, { useState, useEffect } from "react"

const WeatherCard = ( {errorMsg, weatherData, toDateFunction}) => {

  const [formattedDate, setFormattedDate] = useState(null);

  useEffect(() => {
    if (weatherData && weatherData.timezone) {
      const timezoneOffsetInMinutes = weatherData.timezone / 60; // Convert seconds to minutes

      // Calculate the sign of the timezone offset
      const sign = timezoneOffsetInMinutes >= 0 ? "+" : "-";

      // Calculate hours and minutes parts of the timezone offset
      const hours = Math.floor(Math.abs(timezoneOffsetInMinutes) / 60);
      const minutes = Math.abs(timezoneOffsetInMinutes) % 60;

      // Construct the timezone string manually
      const timezoneString = `GMT${sign}${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

      console.log(timezoneString)
      setFormattedDate(timezoneString);
    }
  }, [weatherData]);

  return (
    <div className="mt-2 text-center text-slate-300 border rounded-lg px-8 py-8 
    shadow-sm shadow-slate-300 border-gray-500 relative bg-slate-500 bg-opacity-20">
      <h1>Weather Information will be displayed here</h1>
    {errorMsg ? (
      <div className="text-4xl">{errorMsg}</div>
    ) : (
      weatherData &&
        <div>
          <span className="text-2xl">{toDateFunction()} </span>
          <span className="text-2xl">{formattedDate}</span>
          <div className="flex justify-center items-center">
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="" className="" />
            <div className="text-4xl font-bold leading-normal ">{weatherData.name}</div>
          </div>
          <div className="text-xl font-semibold">{weatherData.weather[0].description.toUpperCase()}</div>
          <div>Temperature : {weatherData.main.temp} &#8451;</div>
          <div>Humindity : {weatherData.main.humidity}</div>
          <div>Wind Speed : {weatherData.wind.speed} mph</div>
          {/* <div>{weatherData.cod}</div> */}
        </div>
    )}
    </div>
  )
}

export default WeatherCard

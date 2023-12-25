import React from "react"

const WeatherCard = ( {errorMsg, weatherData}) => {
  return (
    <div className="mt-6 text-center text-slate-300 border rounded-lg px-20 py-20 shadow-sm shadow-slate-300 border-gray-500 relative bg-slate-500 bg-opacity-20">
    {errorMsg ? (
      <div className="text-4xl">{errorMsg}</div>
    ): (
      weatherData &&
        <>
        <div className="text-4xl font-bold leading-normal ">{weatherData.name}</div>
        <div>{weatherData.weather[0].description}</div>
        <div>Temperature : {weatherData.main.temp} &#8451;</div>
        <div>Humindity : {weatherData.main.humidity}</div>
        <div>Wind Speed : {weatherData.wind.speed} mph</div>
        {/* <div>{weatherData.cod}</div> */}
        </>
    )}
  </div>
  )
}

export default WeatherCard

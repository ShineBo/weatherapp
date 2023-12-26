import { useEffect, useState } from "react"

const ForecastCard = ( {cityName, weatherData, searchButtonClicked}) => {

 const [ forecastData, setForecastData ] = useState(null)
 const [ errorForecast, setErrorForecast ] = useState(null)

 useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=fc5489ee171a6143c326559c1a8bb174&units=metric`);
        const data = await response.json();
        
        if (response.ok) {
          console.log(data);
          setErrorForecast(null);
          setForecastData(data);
        } else {
          setForecastData(null);
          setErrorForecast("No Data Available");
        }
      } catch (error) {
        console.error("Error fetching forecast data:", error);
        setForecastData(null);
        setErrorForecast("Error fetching data");
      }
    };

    // Fetch data only when the search button is clicked
    if (searchButtonClicked) {
      fetchForecastData();
    }
  }, [cityName, searchButtonClicked]);

 return (
    <section className="mt-8 relative text-gray-300 ">
      <h3 className="text-center text-4xl leading-normal tracking-wide">Weather Forecast For The Next 5 Days</h3>
      {errorForecast ? (
        <div className="text-gray-300 text-center">{errorForecast}</div>
      ) : (
        forecastData && (
        <div className="flex flex-wrap w-full">
            {forecastData.list.filter((data, index) => index % 4 === 0).map((data, index) =>(
                <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2 text-center mb-6" >
                    <div className="mt-6 h-full px-4 py-4 border border-slate-700 bg-slate-500 bg-opacity-20 rounded-lg">
                        <div className="flex justify-center items-center">
                            <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" />
                            <h3 className="text-2xl">{forecastData.city.name}</h3>
                        </div>
                    <h3 className=" text-2xl font-bold">{data.weather[0].main}</h3>
                    <h3 className=" text-md">{data.dt_txt}</h3>
                    <span>Temp Min : {data.main.temp_min} &#8451;</span><br />
                    <span>Temp Max : {data.main.temp_max} &#8451;</span>
                    {/* Add more elements to display forecast data */}
                </div>
        </div>
            ))}
          </div>
        )
      )}
    </section>
  );
  
}

export default ForecastCard
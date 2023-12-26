import { useEffect, useState } from "react"
import bgimg from "./assets/bgimg.jpg"
import WeatherCard from "./components/WeatherCard"
import ForecastCard from "./components/ForecastCard"

const App = () => {

  const [results,setResults] = useState([])
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState("");
  const [errorMsg, setErrorMsg] = useState(null)
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);


  const toDateFunction = () => { 
    const months = [ 
        'January', 
        'February', 
        'March', 
        'April', 
        'May', 
        'June', 
        'July', 
        'August', 
        'September', 
        'October', 
        'November', 
        'December', 
    ]; 
    const WeekDays = [ 
        'Sunday', 
        'Monday', 
        'Tuesday', 
        'Wednesday', 
        'Thursday', 
        'Friday', 
        'Saturday', 
    ]; 
    const currentDate = new Date(); 
    const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()] 
        }`; 
    return date; 
}; 

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchButtonClicked(true);


    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=fc5489ee171a6143c326559c1a8bb174&units=metric`
      );
      const data = await response.json();
      if(response.ok) {
        console.log(data);
        setWeatherData(data);
        setErrorMsg(null)
        setResults([])
      } else {
        setWeatherData(null)
        setErrorMsg("The City Name is Incorrect")
        setResults([])
      }
    } catch (error) {
      setWeatherData(null)
      console.log(error);
    }
  };

  useEffect(() => {
    
          const filterResults = async () => {
            const response = await fetch("../public/city.list.json");
            const data = await response.json();

            const filteredCities = data
              .filter((obj) =>
                obj.name.toLowerCase().includes(cityName.toLowerCase())
              )
              .slice(0,5)
              .map((obj) => obj.name);
          
            setResults(filteredCities);
          };       
        if(cityName.length >= 3) {
          filterResults();
        } else {
          setResults([])
        }
  },[cityName])

  return (
  <>
    <section className="w-full h-screen flex flex-col items-center">
      <img className="w-full h-screen absolute " src={bgimg} alt="" />
      <div className="flex max-sm:flex-col mt-6 gap-20">
        <div className="flex flex-col text-center">
            <form action="" className="relative mt-3" onSubmit={handleSearch}>
            <h1 className="text-3xl mb-3 text-slate-200">Search by City Name</h1>
            <input type="text" className=" bg-slate-600 text-white rounded-md" value={cityName} onChange={(e) => setCityName(e.target.value)}/>  
            <button className="px-2 py-1 bg-slate-500 rounded-lg ml-4 hover:bg-slate-300 active:ring active:ring-slate-200" type="submit">Search</button>
          </form>
          <div className="relative">
          {results.length > 0 && (
            <>
            <h3 className="text-slate-400 text-4xl">Suggestions</h3>
            <ul className=" text-slate-500">
              {results.map((result, index) => (
                <a key={index} className=" cursor-pointer" onClick={handleSearch}>
                  <li>{result}</li>
                </a>
              ))}
            </ul></>
          )}
          </div>
        </div>
        <WeatherCard errorMsg={errorMsg} weatherData={weatherData} toDateFunction={toDateFunction}/>
      </div>
      <ForecastCard cityName={cityName} weatherData={weatherData} searchButtonClicked={searchButtonClicked} />

    </section>
  </>
  )
}

export default App

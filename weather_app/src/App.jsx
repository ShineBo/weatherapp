import { useEffect, useState } from "react"
import bgimg from "./assets/bgimg.jpg"
import WeatherCard from "./components/WeatherCard"

const App = () => {

  const [results,setResults] = useState([])
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState("");
  const [errorMsg, setErrorMsg] = useState(null)

  const handleSearch = async (e) => {
    e.preventDefault();

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
    
    // fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=fc5489ee171a6143c326559c1a8bb174&units=metric`)
    //   .then(res => res.json())
    //   .then((data) => {
    //     console.log(data)
    //     setWeatherData(data)
    //   })
    //   .catch(error => console.log(error))

      // fetch("../public/city.list.json")
      //   .then(res => res.json())
      //   .then((data) => {
      //     console.log(data)
      //     data.map((obj,i) => {
      //       setCity(obj.name)
      //     })
      //   })

          const filterResults = async () => {
            const response = await fetch("../public/city.list.json");
            const data = await response.json();
          
            // Filter data based on cityName
            const filteredCities = data
              .filter((obj) =>
                obj.name.toLowerCase().includes(cityName.toLowerCase())
              )
              .map((obj) => obj.name);
          
            setResults(filteredCities);
          };       
        if(cityName.length >= 5) {
          filterResults();
        } else {
          setResults([])
        }
  },[cityName])

  return (
    <section className="w-full h-screen flex flex-col items-center justify-center ">
      <img className="w-full h-screen absolute " src={bgimg} alt="" />

      <form action="" className="relative" onSubmit={handleSearch}>
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
      <WeatherCard errorMsg={errorMsg} weatherData={weatherData}/>
    </section>
  )
}

export default App

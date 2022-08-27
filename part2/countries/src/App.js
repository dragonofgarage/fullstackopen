import {useState, useEffect} from 'react'
import axios from 'axios'

const GetWeather = ({lat, lon, capital}) => {
  const [temperature, setTemperature] = useState('')
  const [iconId, setIconId] = useState('')
  const [windSpeed, setWindSpeed] = useState('')

  const apiKey = process.env.REACT_APP_API_KEY
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
      .then(response => {
        {/*This time 2022.8.25, if I don't set a single state 
        for the temprature,the app will raise a error. 
        I didn't figure out why it happened yet.*/}
        {/*Now, I may be know why it happened. Because the weatherData
          don't get any value when the react render the page first time for per country info.
          Or Maybe the original state I set no value and lead to this situation.
          Or because the state which set to be "weatherData" is a object. the app loaded this data first time
          when there is no any data,  leading to React had to render a empty object. And this is forbidden by
          react or Javascript.
        */}
        setTemperature(response.data.main.temp)
        setIconId(response.data.weather[0].icon)
        setWindSpeed(response.data.wind.speed)
      })
  }, [])

  const imgSrc = `http://openweathermap.org/img/wn/${iconId}@2x.png`

  return(
    <div>
      <h2>Weather in {capital}</h2>
      <p>Temperature: {(temperature - 273.15).toFixed(2)} Celcius</p>
      <img src = {imgSrc} alt = "Weather icon"/>
      <p>Wind: {windSpeed} m/s</p>
    </div>
  )
}

const DisplayDetail = ({data})=> {
  const temp = data
  const languages = Object.values(temp.languages)
  const img = temp.flags.svg

  //Save lat and lon of captial of the country
  const lat = temp.capitalInfo.latlng[0]
  const lon = temp.capitalInfo.latlng[1]

  return(
    <div>
      <h1>{temp.name.common}</h1>
      <p>Capital: {temp.capital[0]}</p>
      <p>Area: {temp.area}</p>
      <p><strong>Languages:</strong></p>
      <ul>
        {languages.map(language => 
          <li key = {language} >{language}</li>
        )}
      </ul>
      <img
        src = {img}
        alt = "flags"
        width = "30%"
        height = "30%"
      />
      <GetWeather lat = {lat} lon = {lon} capital = {temp.capital[0]} />
    </div>
  )
}

const ShowDetail = ({data}) => {
  const [showDetail, setShowDetail] = useState(false)
  const forChange = () =>{
    setShowDetail(true)
  }
  if(!showDetail)
  return(
      <button onClick={forChange} >show</button>
  )
  else
  return(
    <DisplayDetail data = {data} />
  )
}

//Whether data is showed or not depending on 
//that the value of conutryName whether is null.
const DisplayData = ({countryData, countryName}) => {

  const filterData = countryData.filter(country => {
    const regex = new RegExp(`${countryName}`, 'i')
    return(country.name.common.search(regex) >= 0 ? 1 : 0)
  })

  if(countryName !== ''){
    if(filterData.length <= 10 && filterData.length > 1)
    return(
      <div>
        {filterData.map((country) => {
          return(
            <div key = {country.name.official}>
              {country.name.common}
              <ShowDetail data = {country}/>
            </div>
          )
        }
          
        )}
        </div>
    )
    
    else if(filterData.length === 1){
      return(<DisplayDetail data = {filterData[0]} />)
    }
    else
      return(
        <div>
          <p>Too many matches, specify another filter.</p>
        </div>
      )
  }
    
}

const App =() => {

  const [countryName, setCountryName] = useState('')
  const [countryData, setCountryData] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountryData(response.data)
      })
  }, [])

  const handleInputChange = (event) => {
    setCountryName(event.target.value)
  }


  return(
    <div>
      <p>
        find countries
        <input
          value = {countryName}
          onChange = {handleInputChange}
        />
      </p>
      <DisplayData 
        countryData = {countryData}
        countryName = {countryName}
      />
    </div>
  )
}

export default App;

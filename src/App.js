import React,{useState, useEffect} from 'react';
import SideMenuSection from './partials/sideMenu' 
import CurrentConditionSection from './partials/currentCondition'
import CurrentDetailsSection from './partials/currentDetails'
import HourlyForecastSection from './partials/hourlyForecast'
import DailyForecastSection from './partials/dailyForecast'
import NavBarSection from './partials/navBar';

import axios from "axios";
import apiURLs from './api-url-links';
import cities from './city-list'

import './Styles/main.css'
import currentCondition from './partials/currentCondition';


function App() {
  function openSideMenu(){
    const btnSideBarMenu = document.getElementsByClassName('btnSideBar')[0];
    btnSideBarMenu.classList.toggle('btnSideBarExit')
  }
  
  function toggleMetric(){
    setIsMetric(!isMetric)
  }

  function aboutSectionAlert() {
    alert('Copyright Arshia Naseri')
  }

  function cityClick(e){
    setCity(e.target.textContent)
  }

  const [weather, setWeather] = useState()
  const [hourlyForcast, setHourlyForcast] = useState()
  const [dailyForcast, setDailyForcast] = useState()
  const [city, setCity] = useState('Toronto')

  const [isMetric, setIsMetric] = useState(true)
  const [isDayTime, setIsDayTime] = useState(true)

  const [loadCurrentCondition,setLoadCurrentCondition] = useState(false)
  const [loadHourlyForcast,setLoadHourlyForcast] = useState(false)
  const [loadDailyForcast,setLoadDailyForcast] = useState(false)

  let mdfHoulryForecast,mdfDailyForecast, mdfCurrentDetails, mdfCurrentCondtion

  apiURLs.initURL(city)

  useEffect(()=>{
    getCurrentCondition()
    getHourlyForcast()
    getDailyForcast()

    setIsDayTime(weather.IsDayTime)
  },[])
  
  useEffect(()=>{
    setLoadCurrentCondition(false)
    setLoadHourlyForcast(false)
    setLoadDailyForcast(false)

    getCurrentCondition()
    getHourlyForcast()
    getDailyForcast()
    setIsDayTime(weather.IsDayTime)
  },[city])

  function getDailyForcast(){
    let cancel
    axios.get(apiURLs.getDailyForcastURL(),{
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setDailyForcast(res.data.DailyForecasts)
      setLoadDailyForcast(true)
    })


    return () => cancel()
  }

  function getCurrentCondition(){
    let cancel
    axios.get(apiURLs.getCurrentConditionsURL(),{
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setWeather(res.data[0])
      setLoadCurrentCondition(true)
    })


    return () => cancel()
  }

  function getHourlyForcast(){
    let cancel
    axios.get(apiURLs.getHourlyForcastURL(),{
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setHourlyForcast(res.data)
      setLoadHourlyForcast(true)
    })


    return () => cancel()
  }

  function modifiedHoulryForecat() {
    mdfHoulryForecast = []
    let keyCount = 1

    mdfHoulryForecast[0] = {
      key: keyCount,
      time: 'Now',
      tempC: Math.round(weather.Temperature.Metric.Value) ,
      tempF: Math.round(weather.Temperature.Imperial.Value) ,
      icon: weather.WeatherIcon
    }

    hourlyForcast.forEach(elm => {
      keyCount += 1;
      let time = parseInt(elm.DateTime.split('T')[1].split(':')[0])
      let temp = {
        key: keyCount,
        time: (time === 0) ? '12 AM' :(time <= 12) ? time + ' AM': time - 12 + ' PM',
        tempC: Math.round(elm.Temperature.Value),
        tempF: Math.round((elm.Temperature.Value * 9/5) + 32),
        icon: elm.WeatherIcon
      }

      mdfHoulryForecast.push(temp)
    })

  }

  function getDay(date) {
    let dayName
      switch (new Date(date).getDay()) {
        case 0:
          dayName = "Sunday";
          break;
        case 1:
          dayName = "Monday";
          break;
        case 2:
          dayName = "Tuesday";
          break;
        case 3:
          dayName = "Wednesday";
          break;
        case 4:
          dayName = "Thursday";
          break;
        case 5:
          dayName = "Friday";
          break;
        case 6:
          dayName = "Saturday";
      }

    return dayName
  }

  function modifiedDailyForecast() {
    let keyCount = 1
    mdfDailyForecast = []
    dailyForcast.forEach(elm => {
      let temp = {
        key: keyCount,
        day: getDay(elm.Date),
        dayIcon: elm.Day.Icon,
        nightIcon: elm.Night.Icon,
        lowC: Math.round(elm.Temperature.Minimum.Value),
        highC: Math.round(elm.Temperature.Maximum.Value),
        lowF: Math.round((elm.Temperature.Minimum.Value * 9/5) + 32),
        highF: Math.round((elm.Temperature.Maximum.Value * 9/5) + 32),
      }
      keyCount += 1

      mdfDailyForecast.push(temp)
    })
  }

  function modifiedCurrentDetails() {
    let hourRise = ((dailyForcast[0].Sun.Rise.split('T')[1]).split('-')[0]).split(':')
    let rise = parseInt(hourRise[0]) + ":" + hourRise[1]+ "am"
    let hourSet = ((dailyForcast[0].Sun.Set.split('T')[1]).split('-')[0]).split(':')
    let set = hourSet[0] - 12 + ":" + hourSet[1] + "pm"
    
    mdfCurrentDetails = {
      dayPrecipitation: dailyForcast[0].Day.PrecipitationProbability + '%',
      nightPrecipitation: dailyForcast[0].Night.PrecipitationProbability + '%',
      windMetric: Math.round(weather.Wind.Speed.Metric.Value)+'km/h',
      windImperial: Math.round(weather.Wind.Speed.Imperial.Value)+'mi/h',
      humid: weather.RelativeHumidity+'%',
      rise:rise,
      set:set
    }
  }

  function modifiedCurrentCondition() {
    let dt = weather.LocalObservationDateTime.split('T')[0]
    dt = new Date(dt).toLocaleDateString('en-us',{timeZone:'UTC',weekday:'long', month:'short', day:'numeric'}) 
    mdfCurrentCondtion = {
      tempC: Math.round(weather.Temperature.Metric.Value)+ '° C',
      tempF: Math.round(weather.Temperature.Imperial.Value)+ '° F',
      feelsC: Math.round(weather.RealFeelTemperature.Metric.Value) + '° C',
      feelsF: Math.round(weather.RealFeelTemperature.Imperial.Value) + '° F',
      city: city,
      icon: weather.WeatherIcon,
      date: dt
    }
  }

  if (!loadCurrentCondition || !loadHourlyForcast || !loadDailyForcast) {return 'Loading ....'}

  modifiedHoulryForecat()
  modifiedDailyForecast()
  modifiedCurrentDetails()
  modifiedCurrentCondition()

  const cityNames = cities.cityList.map(function(elm) {return elm.cityName})
  
  return (
    <>

    <NavBarSection navBarCityClick={cityClick} cityName={city} cities={cityNames} isDayTime={isDayTime} isMetric={isMetric} 
      toggleMetric={toggleMetric} aboutSectionAlert={aboutSectionAlert}/>
    <SideMenuSection sideMenuCityClick={cityClick} cityName={city} cities={cityNames} isDayTime={isDayTime} isMetric={isMetric} 
      openSideMenu={openSideMenu} toggleMetric={toggleMetric}/>

    <section className={`groupContainer ${isDayTime ? '':'nightMode'}`}>
      <CurrentConditionSection currentCondition={mdfCurrentCondtion} isMetric={isMetric}/>

      <CurrentDetailsSection currentDetails={mdfCurrentDetails} isDayTime={isDayTime} isMetric={isMetric}/>

      <HourlyForecastSection hourlyForecast={mdfHoulryForecast} isMetric={isMetric}/>

      <DailyForecastSection dailyForecast={mdfDailyForecast} isDayTime={isDayTime} isMetric={isMetric}/>

    </section>
    </>
  );
}

export default App;

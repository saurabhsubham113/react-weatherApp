import React, { useState } from 'react'
import "./main.css"
import { getForecast, getLatLong } from '../../api/apicalls';
import Card from '../cards/Card'
import Charts from '../charts/Charts';

const Main = () => {
    const [location, setLocation] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const [info, setInfo] = useState({
        dayTime: "",
        temperature: "",
        description: "",
        humidity: "",
        sunrise: "",
        sunset: "",
        windSpeed: "",
        imgCode: "",
        dailyWeathers: [],
        forecastData: []
    })

    const getCoordinates = () => {
        getLatLong(location)
            .then(res => {
                console.log(res)
                setIsError(false)
                loadForecast(res.coord)
            })
            .catch(err => {
                setIsError(true)
                setInfo({})
            })

    }

    const loadForecast = ({ lat, lon }) => {
        getForecast(lat, lon)
            .then(res => {
                setIsError(false)
                setInfo({
                    ...info,
                    dayTime: res.current.dt,
                    temperature: res.current.temp,
                    description: res.current.weather[0].description,
                    windSpeed: (res.current.wind_speed * 1.609).toFixed(1),
                    humidity: res.current.humidity,
                    imgCode: res.current.weather[0].icon,
                    dailyWeathers: res.daily.slice(1, 6),
                    sunrise: convertUnixDate(res.current.sunrise, false, true),
                    sunset: convertUnixDate(res.current.sunset, false, true),
                    forecastData: res.daily.map(d => {
                        return d.temp.day
                    }),
                    labels: res.daily.map(d => (
                        convertUnixDate(d.dt, true)
                    ))
                })
            })
            .catch(err => {
                setIsError(true)
                setInfo({})
            })

    }
    //it is to change the unix date
    const convertUnixDate = (date, dayname = false, time = false) => {
        const day = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
        const month = ["Jan", "Feb", "Mar", "April", "May", "June",
            "July", "Aug", "Sept", "Oct", "Nov", "Dec"
        ];

        const d = new Date(date * 1000)
        const isAMorPM = d.getHours() >= 12 ? "pm" : "am"
        const weatherDateTime = `${d.getHours() > 12 ? d.getHours() - 12 : d.getHours()}:${d.getMinutes()} ${isAMorPM}, ${day[d.getDay()]}, ${month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
        const dayName = `${month[d.getMonth()]} ${d.getDate()}`
        const getTime = `${d.getHours() > 12 ? d.getHours() - 12 : d.getHours()}:${d.getMinutes() > 9 ? d.getMinutes() : "0" + d.getMinutes()} ${isAMorPM}`
        if (dayname)
            return dayName

        if (time)
            return getTime

        return weatherDateTime

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        getCoordinates()
    }



    return (
        <main>

            <div className="page-left">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="location" className="input-label">Your City </label>
                        <input type="text" placeholder="City name" name="location" value={location} onChange={e => setLocation(e.target.value)} />
                        <button type="submit">search</button>
                    </div >
                </form >
                <div className="date-time">
                    {info.dayTime ? convertUnixDate(info.dayTime) : "00:00 AM"}
                </div>

                <div className="temperature">
                    <div className="temp-container">
                        <img
                            src={info.imgCode ?
                                `http://openweathermap.org/img/wn/${info.imgCode}@2x.png` :
                                "http://openweathermap.org/img/wn/03d@2x.png"} alt="" className="cloud" />
                        <h1 className="temp-value">{info.temperature ? info.temperature.toFixed(0) : "--"}&#176;C</h1>
                    </div>
                    <h2 className="weather">{info.description ? info.description : "-------"}</h2>
                    <div className="temp-desc">
                        <div className="humidity">
                            <p>Humidity</p>
                            <p className="value">{info.humidity ? info.humidity : "--"}%</p>
                        </div>
                        <div className="wind">
                            <p>Wind speed</p>
                            <p className="value">{info.windSpeed ? info.windSpeed : "--"}km/hr</p>
                        </div>
                    </div>
                    <div className="temp-desc">
                        <div className="sunrise">
                            <p>Sunrise</p>
                            <p className="value">{info.sunrise ? info.sunrise : "--"}</p>
                        </div>
                        <div className="sunset">
                            <p>Sunset</p>
                            <p className="value">{info.sunset ? info.sunset : "--"}</p>
                        </div>
                    </div>
                </div>
            </div >
            <div className="page-right" style={isLoading ? { opacity: 1 } : { opacity: 0 }} >
                {isError ? (<h1 style={{ color: "#e04141", textAlign: "center" }}>Enter a valid location</h1>) :
                    <>
                        <Charts temp={info.forecastData} labels={info.labels} />
                        <div className="card-container">
                            {info.dailyWeathers?.length > 0 ? (
                                info.dailyWeathers?.map((d, index) => (

                                    <Card key={index} day={convertUnixDate(d.dt, true)} img={d.weather[0].icon} humidity={d.humidity} />

                                ))
                            ) : ""}
                        </div>
                    </>
                }
            </div>

        </main >
    )
}

export default Main

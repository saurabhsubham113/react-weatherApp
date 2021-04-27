import axios from "axios"

const baseUrl = "https://api.openweathermap.org/data/2.5"
const apiKey = process.env.REACT_APP_WEATHER_API_KEY

export const getLatLong = (location) => {
    return axios.get(`${baseUrl}/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(res => res.data)
        .catch(err => err.message)
}

export const getForecast = (lat, long) => {
    return axios.get(`${baseUrl}/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`)
        .then(res => res.data)
        .catch(err => err.message)
}

export const getIcon = (imgCode = "03d", imgSize = 2) => {
    return axios.get(`http://openweathermap.org/img/wn/${imgCode}@${imgSize}x.png`)
        .then(res => res.data)
        .catch(err => err.message)
}
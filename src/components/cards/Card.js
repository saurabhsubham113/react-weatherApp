import React from 'react'
import "./card.css"

const Card = ({ active = true, day = "Today", img = "03d", humidity = 65 }) => {


    return (
        <div className={active ? "card active" : "card"}>
            <div className="card-head">
                <h2 className="card-heading">{day}</h2>
            </div>
            <div className="card-body">
                <div className="card-image">
                    <img src={`http://openweathermap.org/img/wn/${img}@2x.png`} alt="weather Icon" />
                </div>
                <p className="card-body-text">Humidity</p>
                <h4>{humidity}%</h4>
            </div>
        </div>
    )
}

export default Card

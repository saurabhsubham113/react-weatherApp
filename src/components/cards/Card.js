import React from 'react'
import "./card.css"

const Card = ({ active, day = "Today", img = "http://openweathermap.org/img/wn/03d@2x.png", humidity = 65 }) => {


    return (
        <div className={active ? "card active" : "card"}>
            <div className="card-head">
                <h2 className="card-heading">{day}</h2>
            </div>
            <div className="card-body">
                <div className="card-image">
                    <img src={img} alt="weather Icon" />
                </div>
                <p className="card-body-text">Humidity</p>
                <h4>{humidity}%</h4>
            </div>
        </div>
    )
}

export default Card

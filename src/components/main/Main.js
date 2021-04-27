import React, { useEffect, useState } from 'react'
import { getForecast, getLatLong } from '../../api/apicalls';
import Card from '../cards/Card'

const Main = () => {
    const [location, setLocation] = useState("");

    const [info, setInfo] = useState({})
    // const [coordinate, setCoordinate] = useState({
    //     lat: "",
    //     long: ""
    // });

    const getCoordinates = () => {
        getLatLong(location)
            .then(res => {
                loadForecast(res.coord)
            })
            .catch(err => console.log("err", err))


    }

    const loadForecast = ({ lat, lon }) => {
        getForecast(lat, lon)
            .then(res => console.log("success", res))
            .catch(err => console.log(err))

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        getCoordinates()
    }

    useEffect(() => {

    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="location" className="input-label">Your City : </label>
                    <input type="text" name="location" value={location} onChange={e => setLocation(e.target.value)} />
                    <button type="submit">search</button>
                </div>
            </form>
            <Card />
        </div>
    )
}

export default Main

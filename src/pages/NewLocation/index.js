import React, {useState, useEffect} from 'react';
import {Link , useHistory} from 'react-router-dom';
import { FiArrowLeft, FiCrosshair } from 'react-icons/fi';

import api from '../../Services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function NewLocation(){
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    //const [ lonlat, setLonlat] = useState('');
    let lonlat = '';

    const id = localStorage.getItem('survId');

    const history = useHistory();

    function handleCurrentLocation(){
        navigator.geolocation.getCurrentPosition(
        (position)=>{
            const {latitude, longitude } = position.coords;

            setLatitude(latitude);
            setLongitude(longitude);
            lonlat = ("point("+latitude+" "+longitude+")");
        },
        (err) => {
            console.log(err);
        },
        {
            timeout:30000,
        }
        );
    };


    async function handleNewLocation(e){
        e.preventDefault();

        lonlat = `point(${latitude} ${longitude})`;

        console.log(longitude);
        console.log(latitude);
        
        console.log(lonlat);


        try{
            await api.patch(`/api/people/${id}`, {lonlat});

            history.push('/profile');
        }catch(err){
            alert("Error, are you really there?");
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    
                    <h1>Set your new Location</h1>
                    <p>It's important for the group to know where you are righ now.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
                        Back to Survivals
                    </Link>
                </section>
                <form onSubmit={handleNewLocation}>
                <div className="input-group">    
                    <div className="input-block">
                        <label htmlFor="latitude">Latitude</label>          
                        <input 
                            type="number" 
                            placeholder="latitude"
                            name="latitude" 
                            id="latitude" 
                            required value={latitude}
                            onChange={e => setLatitude(e.target.value)}
                        />
                    </div>  
                    <div className="input-block">
                        <label htmlFor="longitude">Longitude</label>       
                        <input 
                            type="number" 
                            placeholder="longitude"
                            name="longitude" 
                            id="longitude" 
                            required value={longitude}
                            onChange={e => setLongitude(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <button className=" button " onClick={handleCurrentLocation}   type="button" >
                        <FiCrosshair size={18} color="#FFF" /> Get it from network
                    </button>
                    <button onClick={handleNewLocation} className="button btn-group" type="submit">Update</button>
                
                  
                  
                </div>
                </form>
            </div>
        </div>
    );
}
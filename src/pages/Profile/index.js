import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiShuffle, FiAlertTriangle} from 'react-icons/fi';

import axios from 'axios';
import api from '../../Services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile(){

    const [survivors, setSurvivors] = useState([]);
    let otherSurv = '';

    const history = useHistory();

    const survName = localStorage.getItem('survName');
    const id = localStorage.getItem('survId');



    useEffect(()=>{
        api.get('api/people.json')
           .then(response => {
           setSurvivors(response.data);
        })
    }, []);

    if(!id){
        history.push('/');
    }

    async function getId(survivor){

        const location = survivor.location;

        const response = await axios({
            method: 'get',
            url: location
        })

        otherSurv = response.data;

    }

    async function handleTrade(survivor){
        await getId(survivor);

        if(otherSurv.infected){
            alert('You can\'t trade with infected people!');
        }else{
            try{                

                localStorage.setItem('tradeName', survivor.name);
                localStorage.setItem('tradeId', otherSurv.id);
                
                history.push('/trade');
            }catch(err){
                alert('Something is wrong, do any of you have items?');
            }
        }
    }

    async function handleReport(survivor){

        try{
            await getId(survivor);

            const data = new FormData();

            data.append('infected', otherSurv.id);
            console.log(otherSurv.id);
            const response = await api.post(`/api/people/${id}/report_infection.json`, data);
         
            console.log(response);
        }catch(err){
            console.log(err);
        }
    }

    function handleLogout(){
        
        localStorage.clear();

        history.push('/');
    }

    return(

        <div className="profile-container">
            <header>
                <img src={logoImg} alt="ZSSN"/>
                <span>Welcome {survName}</span>
                
                <Link className="button" to="/newlocation">Update position</Link>
                <Link className="button" to="/reports">Reports</Link>
                
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1> Survivors List</h1>
                <div className="legend">
                    <h2>Symbol Legend</h2>
                    <FiShuffle size={20} color="#a8a8b3"/> Trade
                    <FiAlertTriangle size={20} color="#a8a8b3"/> Report Infected
                </div>
            <ul>
                {survivors.map(survivor => (
                    <li key={survivor.name}>
                        <strong>Name:</strong>
                        <p>{survivor.name}</p>
                
                        <strong>Age</strong>
                        <p>{survivor.age}</p>
                
                        <strong>Gender:</strong>
                        <p>{survivor.gender}</p>
                
                        <strong>Location:</strong>
                        <p>{survivor.lonlat}</p>

                        <button onClick={() => handleTrade(survivor)} type="button" > {/** TROCA */}
                            <FiShuffle size={20} color="#a8a8b3"/>
                        </button>
                        <button onClick={() => handleReport(survivor)} type="button" > {/** ALERTA INFECTADO */}
                            <FiAlertTriangle size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
        
    );
}
import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiFlag, FiShuffle, FiAlertTriangle} from 'react-icons/fi';

import Trade from '../Trade';

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

    async function getId(survivor){

        const location = survivor.location;

        const response = await axios({
            method: 'get',
            url: location
        })

        console.log(response.data.id);
        otherSurv = response.data.id;

    }

    function handleTrade(survivor){
        try{
            getId(survivor);
            localStorage.setItem('tradeName', survivor.name);
            
            history.push('/trade');
        }catch(err){
            alert('Poor survivor, no items found...')
        }
    }

    async function handleReport(survivor){

        try{
            await getId(survivor);

            const response = await axios({
                method: 'POST',
                url: `http://zssn-backend-example.herokuapp.com/api/people/${id}/report_infection.json`,
                params: {
                        'infected': otherSurv
                    }              
                
            });
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
                
                <Link className="button" to="/newlocation">Update position</Link>{/** ATUALIZAR LUGAR */}
                
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1> Casos cadastrados</h1>
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

                        <button onClick={() => handleTrade(survivor)} type="button"> {/** TROCA */}
                            <FiShuffle size={20} color="#a8a8b3"/>
                        </button>
                        <button onClick={() => handleReport(survivor)} type="button"> {/** ALERTA INFECTADO */}
                            <FiAlertTriangle size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
        
    );
}
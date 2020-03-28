import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiFlag, FiShuffle, FiAlertTriangle} from 'react-icons/fi';

import api from '../../Services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile(){
    const [survivors, setSurvivors] = useState([]);
    const [infected, setInfected] = useState('1;')

    const history = useHistory();

    const survName = localStorage.getItem('survName');
    const id = localStorage.getItem('survId');


    useEffect(()=>{
        api.get('api/people.json')
           .then(response => {
           setSurvivors(response.data);
        })
    }, []);

    async function handleUpdatePosition(id){
        try{
            setSurvivors(survivors.filter(survivor => survivor.id !== id))/**CHEGAGEM SE O ID DE QM ATT É QM ESTÁ LOGADO */
        }catch(err){
            alert('Geez, you\'re stucked.');
        }
    }

    function handleTrade(){
        try{

        }catch(err){
            alert('Poor survivor, no items found...')
        }
    }

    function handleReport(infectedId){
        
        const data = {
            infected,
            id
        }

        try{
            api.post(`/api/people/${id}/report_infection`, data);
        }catch(err){

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
                {/** 
                 * 
                 * MUDAR O ENDEREÇO DO LINK 
                 * 
                 * */}
                <Link className="button" to="/survivors/new/">Update position</Link>{/** ATUALIZAR LUGAR */}
                
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1> Casos cadastrados</h1>
            <ul>
                {survivors.map(survivor => (
                    <li key={survivor.id}>
                        <strong>Name:</strong>
                        <p>{survivor.name}</p>
                
                        <strong>Age</strong>
                        <p>{survivor.age}</p>
                
                        <strong>Gender:</strong>
                        <p>{survivor.gender}</p>
                
                        <button onClick={() => handleUpdatePosition(survivor.id)} type="button"> {/** ATUALIZAR LUGAR */}
                            <FiFlag size={20} color="#a8a8b3"/>
                        </button>
                        <button onClick={() => handleTrade(survivor.id)} type="button"> {/** TROCA */}
                            <FiShuffle size={20} color="#a8a8b3"/>
                        </button>
                        <button onClick={() => handleReport(setInfected(survivor.id))} type="button"> {/** ALERTA INFECTADO */}
                            <FiAlertTriangle size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
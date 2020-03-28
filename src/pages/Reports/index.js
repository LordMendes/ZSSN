import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiArrowLeft} from 'react-icons/fi';

import api from '../../Services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Reports(){
    const [survivors, setSurvivors] = useState([]);
    let otherSurv = '';

    const history = useHistory();

    const survName = localStorage.getItem('survName');
    const id = localStorage.getItem('survId');

    let waterAvg = 0;
    let foodAvg = 0;
    let medicationAvg = 0;
    let ammoAvg = 0;

    let infectedPercentage;
    let nonInfectedPercentage;
    let pointLost;

    async function handleItemReport(){
    
        const response = await api.get('api/report/people_inventory.json');
        
        if(response.data.report.average_items_quantity_per_person == 0){
            waterAvg = 0;
            foodAvg = 0;
            medicationAvg = 0;
            ammoAvg = 0;
        }else{
            waterAvg = response.data.report.average_quantity_of_each_item_per_person.water;
            foodAvg = response.data.report.average_quantity_of_each_item_per_person.food;
            medicationAvg = response.data.report.average_quantity_of_each_item_per_person.medication;
            ammoAvg = response.data.report.average_quantity_of_each_item_per_person.ammo;
        }
    
    }

    async function handleInfectedPercentage(){
        const response = await api.get('/api/report/infected.json1;')
        
        infectedPercentage = response.data.report.average_infected;
        infectedPercentage *= 100;
    }

    async function handleNonInfectedPercentage(){
        const response = await api.get('/api/report/non_infected.json');
        console.log(response.data.report.average_healthy);
        nonInfectedPercentage = response.data.report.average_healthy;
        nonInfectedPercentage *= 100;
    }

    async function handlePointlost(){
        const response = await api.get('/api/report/infected_points.json');
        
        pointLost = response.data.report.total_points_lost;
        
    }

    useEffect(()=>{
        handleInfectedPercentage();
        handleItemReport();
        handleNonInfectedPercentage();
        handlePointlost();
    }, []);

    function handleLogout(){
        
        localStorage.clear();

        history.push('/');
    }

    return(

        <div className="profile-container">
            <header>
                <img src={logoImg} alt="ZSSN"/>
                <span>Welcome {survName}</span>
                <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041" />
                        Back to Profiles   
                    </Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1> Casos cadastrados</h1>
            <ul>
                
                    <li>
                        <strong>Percentage of infected survivors:</strong>
                        <p>{infectedPercentage}</p>
                
                        <strong>Percentage of non-infected survivors:</strong>
                        <p>{nonInfectedPercentage}</p>
                
                        <strong>Average amount of each kind of resource by survivor:</strong>
                        <p>water: {waterAvg}</p>
                        <p>food: {foodAvg}</p>
                        <p>medication: {medicationAvg}</p>
                        <p>ammunition: {ammoAvg}</p>
                
                        <strong>Points lost because of infected survivor</strong>
                        <p>{pointLost}</p>


                    </li>
                
            </ul>
        </div>
        
    );
}
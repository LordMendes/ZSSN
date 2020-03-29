import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiArrowLeft} from 'react-icons/fi';

import api from '../../Services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Reports(){

    const history = useHistory();

    const survName = localStorage.getItem('survName');

    const [waterAvg , setWaterAvg] = useState(0);
    const [foodAvg , setFoodAvg]= useState(0);
    const [medicationAvg , setMedicationAvg] = useState(0);
    const [ammoAvg, setAmmoAvg] = useState(0);

    const [infectedPercentage , setInfectedPercentage] = useState(0);
    const [nonInfectedPercentage, setNonInfectedPercentage] = useState(0);
    const [pointLost , setPointLost] = useState(0);

    async function handleItemReport(){
    
        const response = await api.get('api/report/people_inventory.json');
        
        if(response.data.report.average_items_quantity_per_person === 0){
            return;
        }else{
            setWaterAvg(response.data.report.average_quantity_of_each_item_per_person.water);
            setFoodAvg(response.data.report.average_quantity_of_each_item_per_person.food);
            setMedicationAvg(response.data.report.average_quantity_of_each_item_per_person.medication);
            setAmmoAvg(response.data.report.average_quantity_of_each_item_per_person.ammo);
        }
    
    }

    async function handleInfectedPercentage(){
        const response = await api.get('/api/report/infected.json1;')
        
        setInfectedPercentage(response.data.report.average_infected * 100);
    }

    async function handleNonInfectedPercentage(){
        const response = await api.get('/api/report/non_infected.json');
        console.log(response.data.report.average_healthy);
        setNonInfectedPercentage(response.data.report.average_healthy * 100);
    }

    async function handlePointlost(){
        const response = await api.get('/api/report/infected_points.json');
        
        setPointLost(response.data.report.total_points_lost);
        
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
                <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
                        Back to Profile   
                    </Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1> Casos cadastrados</h1>
            <ul>
                
                    <li>
                        <strong>Percentage of infected survivors:</strong>
                        <p>{infectedPercentage} %</p>
                
                        <strong>Percentage of non-infected survivors:</strong>
                        <p>{nonInfectedPercentage} %</p>
                
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
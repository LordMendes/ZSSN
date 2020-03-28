import React, {useState, useEffect} from 'react';
import { Link , useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import axios from 'axios';

import api from '../../Services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';


export default function Trade(){

    const tradeName = localStorage.getItem('tradeName');
    const survId = localStorage.getItem('survId');

    let items = "";

    const [water, setWater]= useState(0);
    const [food, setFood]= useState(0);
    const [medication, setMedication]= useState(0);
    const [ammunition, setAmmunition]= useState(0);

    let itemsPick = "";

    const [waterPick, setWaterPick]= useState(0);
    const [foodPick, setFoodPick]= useState(0);
    const [medicationPick, setMedicationPick]= useState(0);
    const [ammunitionPick, setAmmunitionPick]= useState(0);



    const history = useHistory();

    function createItemFormat(agua, comida, remedio, municao){
        let str = "'";

        if(agua!== 0 || comida !== 0 || remedio !== 0 || municao !== 0){
            if(agua !== 0) {
                str = (str + ("water:"+agua));
                if(comida !== 0 || remedio !== 0 || municao !== 0){
                    str = (str + ";");
                }
            }        
            if(comida !== 0) {
                str = (str + ("food:"+comida));
                if(remedio !== 0 || municao !== 0){
                    str = (str + ";");
                }
            }        
            if(remedio !== 0) {
                str = (str + ("medication:"+remedio));
                if(municao !== 0){
                    str = (str + ";");
                }
            }        
            if(municao !== 0) {
                str = (str + ("ammunition:"+municao));
            }    
        }  
        str = str + "'";
        
        return str;
    }

    async function testInfection(survivorId){       
        
        const survivor = await api.get(`/api/people/${survivorId}`);

        const location = survivor.data.location;

        const response = await axios({
            method: 'get',
            url: location
        })

        return response.data.infected;

    
    }

    async function handleTrade(e){
        if(testInfection(survId)){
            alert("You're infected, no one wants to trade with you! =/");
            return;
        }

        e.preventDefault();
        
        items = createItemFormat(water,food,medication,ammunition);
        itemsPick = createItemFormat(waterPick,foodPick,medicationPick,ammunitionPick);
        
        const data = new FormData();

            data.append('consumer[name]', tradeName);
            data.append('consumer[pick]', itemsPick);
            data.append('consumer[payment]', items);
        
        try {

            const response = await api.post(`/api/people/${survId}/properties/trade_item`, data);

            alert(`Sucesseful Trade!`);
            
            history.push('/profile');
            console.log(response);
        } catch (err) {
            console.log(err);
            alert('Oh no, something is wrong...');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    
                    <h1>Trade</h1>
                    <p> If you're not infected you can trade with the group!</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
                        Back   
                    </Link>
                </section>
                <form onSubmit={handleTrade}>
                
                    <label >Your Items</label>
             
                    <div className="input-group">
                        <div className="input-block">
                            <label htmlFor="water">Water</label>
                            <input 
                                type="number"
                                name="water" 
                                id="water" 
                                required
                                value={water}
                                onChange={e=>setWater(e.target.value)}
                            />
                        </div>
                    
                        <div className="input-block">
                            <label htmlFor="food">Food</label>
                            <input  
                                type="number"
                                name="food" 
                                id="food" 
                                required
                                value={food}
                                onChange={e=>setFood(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="input-block">
                            <label htmlFor="medication">Medication</label>
                            <input  
                                type="number"
                                name="medication" 
                                id="medication" 
                                required
                                value={medication}
                                onChange={e=>setMedication(e.target.value)}
                            />
                        </div>
                        <div className="input-block">
                            <label htmlFor="ammunition">Ammunition</label>
                            <input  
                                type="number"
                                name="ammunition" 
                                id="ammunition" 
                                required
                                value={ammunition}
                                onChange={e=>setAmmunition(e.target.value)}
                            />
                        </div>     
                    </div>   
               {/**
                * 
                * COSTUMER ITEMS
                * 
                */}
                    <label >Items of {tradeName}</label>
             
                    <div className="input-group">
                        <div className="input-block">
                            <label htmlFor="waterPick">Water</label>
                            <input 
                                type="number"
                                name="waterPick" 
                                id="waterPick" 
                                required
                                value={waterPick}
                                onChange={e=>setWaterPick(e.target.value)}
                            />
                        </div>
                    
                        <div className="input-block">
                            <label htmlFor="foodPick">Food</label>
                            <input  
                                type="number"
                                name="foodPick" 
                                id="foodPick" 
                                required
                                value={foodPick}
                                onChange={e=>setFoodPick(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="input-block">
                            <label htmlFor="medicationPick">Medication</label>
                            <input  
                                type="number"
                                name="medicationPick" 
                                id="medicationPick" 
                                required
                                value={medicationPick}
                                onChange={e=>setMedicationPick(e.target.value)}
                            />
                        </div>
                        <div className="input-block">
                            <label htmlFor="ammunitionPick">Ammunition</label>
                            <input  
                                type="number"
                                name="ammunitionPick" 
                                id="ammunitionPick" 
                                required
                                value={ammunitionPick}
                                onChange={e=>setAmmunitionPick(e.target.value)}
                            />
                        </div>     
                    </div>   
               
                  <button className="button" type="submit">Trade</button>
                </form>
            </div>
        </div>
    );
}
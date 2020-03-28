import React, {useState, useEffect} from 'react';
import { Link , useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import axios from 'axios';

import api from '../../Services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';


export default function Register(){

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [lonlat, setLonlat] = useState('');
    let items = "";

    const [water, setWater]= useState(0);
    const [food, setFood]= useState(0);
    const [medication, setMedication]= useState(0);
    const [ammunition, setAmmunition]= useState(0);

    const [latitude, setLatitute] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(
        (position)=>{
            const {latitude, longitude } = position.coords;

            setLatitute(latitude);
            setLongitude(longitude);
            setLonlat("point("+latitude+" "+longitude+")");
        },
        (err) => {
            console.log(err);
        },
        {
            timeout:30000,
        }
        );
    }, []);

    const history = useHistory();
    async function handleRegister(e){
        e.preventDefault();
        if(water!== 0 && food !== 0 && medication !== 0 && ammunition !== 0){
            if(water !== 0) {
                items = (items + ("water:"+water));
                if(food !== 0 && medication !== 0 && ammunition !== 0){
                    items = (items + ";");
                }
            }        
            if(food !== 0) {
                items = (items + ("food:"+food));
                if(medication !== 0 && ammunition !== 0){
                    items = (items + ";");
                }
            }        
            if(medication !== 0) {
                items = (items + ("medication:"+medication));
                if(ammunition !== 0){
                    items = (items + ";");
                }
            }        
            if(ammunition !== 0) {
                items = (items + ("ammunition:"+ammunition));
            }    
        }    

        
        const data = new FormData();

        data.append('person[name]', name);
        data.append('person[age]', age);
        data.append('person[gender]', gender.toLocaleUpperCase());
        data.append('person[lonlat]', lonlat);
        data.append('items', items);

        
        try {

            const response = await api.post('/api/people', data);

            alert(`Seu ID de acesso: ${response.data.id}`);
            
            history.push('/');
            console.log(response);
        } catch (err) {
            console.log(err);
            alert('Erro no cadastro, tente novamente.');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    
                    <h1>Register</h1>
                    <p>Register yourself as survivor !</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041" />
                        Back to Login   
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                  <input 
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                  <input  
                    placeholder="Age"
                    value={age}
                    onChange={e => setAge(e.target.value)}    
                />
                  <input 
                    placeholder="Gender"
                    value={gender}
                    onChange={e => setGender(e.target.value)}  
                />

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
                <div className="input-group">    
                    <div className="input-block">
                        <label htmlFor="latitude">Latitude</label>          
                        <input 
                            type="number" 
                            placeholder="latitude"
                            name="latitude" 
                            id="latitude" 
                            required value={latitude}
                            onChange={e => setLatitute(e.target.value)}
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
                  <button className="button" type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}
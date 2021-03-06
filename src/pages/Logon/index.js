import React, {useState} from 'react';
import {Link , useHistory} from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';

import api from '../../Services/api';

import './styles.css';

import heroesImg from '../../assets/heroes.png';

export default function Logon(){

    const[id, setId] = useState('');
    
    const history = useHistory();
    
    async function handleLogin(e){
        e.preventDefault();

        try{

           const response = await api.get(`/api/people/${id}`);
           localStorage.setItem('survName', response.data.name);
           localStorage.setItem('survId', id);

           console.log(response);
            history.push('/profile');
        }catch (err){
            alert('Falha no Login, tente novamente.');
        }

    }

    return (
        
        <div className="logon-container">        
            <section className="form">
            

                <form onSubmit={handleLogin}>
                    <h1>ZSSN login</h1>
                    <input 
                        placeholder="Your Id"
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Login</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn  size={16} color="#e02041"/>
                        Sign in
                    </Link>
                </form>

            </section>

            <img src={heroesImg} alt="Survivors"/>
        </div>
        
    )
}
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api-service';


const SecretPage = (props: SecretProps) => {
    let navigate = useNavigate();

    const [pizzaTime, setPizzaTime] = useState<{ message: string }>(null);

    useEffect(() => {

        apiService('/api/pizza') 
        .then(data => setPizzaTime(data))
        .catch(()=> navigate(`/login`) )

        // fetch('/api/blogs', {
        //     method: 'GET',
        //     headers: {
        //         Authorization: `Bearer ${token}`
        //     }
        // })
        //     .then(res => res.json())
        //     .then(data => setPizzaTime(data));

    }, []);

    return (
        <div>
            <h1 className="text-center display-1">{pizzaTime?.message}</h1>


        </div>
    )
}

interface SecretProps { }

export default SecretPage

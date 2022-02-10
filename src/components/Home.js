import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, NavLink, useNavigate } from 'react-router-dom'
function Home() {


    const [providers, setProviders] = useState(null);
    const navigate = useNavigate()




    useEffect(() => {
        fetch('http://localhost:3000/service_providers', {
            method: "Get"
        }).then((response) =>
            response.json().then((result) =>
            {
                if (result.length > 0) {
                    setProviders(result)
                }else{
                    setProviders(null)
                }
            }
                
            ))
    }, [])

    return (
        <div>
            {
                providers ? <div class="flex-container">
                    {
                        providers.map((item, i) =>
                            <div class="card" onClick={
                                () => {
                                    navigate("/services/" + item.service_provider_id)
                                }
                            }>
                                <div >
                                    <div  >
                                        <img  src={item.image} alt="service provider" width="250" height="200" />
                                    </div>
                                    <h4>{item.service_provider_name}</h4>
                                </div>
                                <div class="rating">
                                    <span style={{ fontSize: 10 }}>Rating:</span> <span>{item.rating}</span>
                                </div>
                            </div>
                        )
                    }
                </div> : <h2>No Data Found.</h2>
            }
        </div>
    );
}

export default Home;
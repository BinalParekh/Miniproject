import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProviderImageComponent from './ProviderImageComponent';
import TicketBookDetails from './TicketBookDetails';

function ServicesListComponent(props) {

    const { serviceid } = useParams();

    const [services, setServices] = useState(null)
    const [image, setImage] = useState(null)
    const [providername, setProviderName] = useState(null)
    const [providerid, setProviderId] = useState(null)
    const [btnclick, setButtonClick] = useState(false)

    const [clickitemdetails, setClickItemDetails] = useState(null)
    






    useEffect(() => {
        fetch('http://localhost:3000/service_providers?service_provider_id=' + serviceid, {
            method: "Get"
        }).then((response) => {
            response.json().then((result) => {
                console.log(result)
                setServices(result[0].services)
                setProviderName(result[0].service_provider_name)
                setImage(result[0].image)
                setProviderId(result[0].service_provider_id)
            }
            )
        }
        )
    }, [])

    function handleclick(item){
        console.warn(item)
     setButtonClick(true);
     setClickItemDetails(item);
    }

    return (
        <div>
            {
                console.log(providerid),
                providerid ? <div class="flex-container">

                    <div class="services-card">
                        {
                            services ? <div>
                                {
                                    services.map((item, i) => 
                                        <div class="row">
                                        <div class="colomn1">
                                            <img src={item.image} alt="service provider" width="200" height="125" />
                                        </div>
                                        <div class="colomn2">
                                            <div class="content">
                                            <div class="details">
                                            <div style={{color:'black',fontWeight:'bold'}}><span>{item.from}</span><span>-</span><span>{item.to}</span></div>
                                              <div class="subtitle"><span>Type:</span><span>{item.type}</span></div>
                                              <div class="subtitle"><span>Fare:</span><span>{item.Fare}</span></div>
                                              <div class="subtitle"><span>Seats Available:</span><span>{item.available_seats}</span></div>
                                              <span style={{display:'flex',justifyContent:'flex-end'}}><button class="button" onClick={()=>handleclick(item)}>Book</button></span>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    )
                                }

                            </div> : null
                        }
                    </div>
                    <div class="services-card">
                      {
                          btnclick==true?<TicketBookDetails data={clickitemdetails}/>:
                          <ProviderImageComponent image={image} providername={providername} />
                      }
                        
                    </div>

                </div> : null
            }


        </div>
    );
}

export default ServicesListComponent;
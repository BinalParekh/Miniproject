import React from 'react';

function ProviderImageComponent({ image, providername }) {
    return (
        <div class="image">
            <div style={{paddingTop:65}}>
                <img src={image} alt="service provider" width="300" height="250" />
                <h4>{providername}</h4>
            </div>
        </div>
    );
}

export default ProviderImageComponent;
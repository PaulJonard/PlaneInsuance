import React from 'react'
import './FlightsList.css'

function FlightsList({component}){
    //Composant list, qui permets d'afficher une liste de composant passé en paramètre 
    return (
        <div className="list-item">{component}</div>
    )    
}    

export default FlightsList
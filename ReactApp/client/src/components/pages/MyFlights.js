import React from "react";
import FlightsList from './../FlightsDisplaying/FlightsList.js'
import Flight2 from './../FlightsDisplaying/Flight2.js'

export const MyFlights = () => {
  
  const datas = [{id:1, name:"michel",age:3},
  {id:2, name:"laurent",age:4}]

  const compo = datas.map(flight => <Flight2 data={flight}/>)

  return (
    <div>
        <FlightsList component={compo}/>
    </div>
  );
  
};
import React from "react";
import FlightsList from './../FlightsDisplaying/FlightsList.js'
import Flight2 from './../FlightsDisplaying/Flight2.js'

export const MyFlights = () => {
  
  const datas = [{"id":1,"num":"AX6015","departure":"Paris","destination":"Madrid","boardingDate":"19/11/2021","boardingTime":"10:15","canceled":0,"price":75,"ethPrice":0.021}]

  return (
    <div className="bg-af">{(datas[0]) ? <FlightsList component={datas.map(_flight => <Flight2 flightData={_flight}/>)}/>  : <h1>Chargement...</h1>}</div>
  );
  
};
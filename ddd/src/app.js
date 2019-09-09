import React, { useEffect, useState } from "react";
import List from "./list";
import CartEvent from './cart-event';
import './app.css';

const App = () => {
  const BASE_URL = "https://kudago.com/public-api/v1.4/";

  useEffect(() => {
    getEvents();
  }, []);

  const  [ events, setEvents] = useState([]);
  const getEvents = () => {
    fetch(
      `${BASE_URL}/events?fields=dates,images,description,id,title,place&lang=ru&location=nsk`
    ).then(async response => {
      if (response.status !== 200) {
        return;
      }
      const data = await response.json();

      setEvents(data.results);
      console.log(data.results)
    });



  };



  return (
        <div  className='app'>
       <div>
        {events.map(event =>(
               <List name ={event.title} key={event.id} description = {event.description} image={event.images[0].image} placeId={event.place.id} id={event.id} />

        ))}
        </div>
            <CartEvent />
         
    </div>
  );
};

export default App;

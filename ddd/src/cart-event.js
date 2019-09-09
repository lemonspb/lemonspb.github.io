import React, {useEffect, useState} from 'react';


const CartEvent = ({idGet})=>{
    const BASE_URL = "https://kudago.com/public-api/v1.4/";

const  id = 123445

    useEffect(() => {
      getEventsId(id);
    },);
  
    const  [ idEvents, setIdEvents] = useState('');
    const getEventsId = (id) => {
      fetch(
        `${BASE_URL}/events/${id}/`
      ).then(async response => {
        if (response.status !== 200) {
          return;
        }
        const data = await response.json();
  
        setIdEvents(data);
        console.log(data)
      });
    };
    
return (
<div className='list-item'>
    <div className = 'cart-item__title'>{idEvents.title}</div>
    <div className = 'cart-item__discription'>описание</div>

    <div className='cart-item__img'><img src = '' alt=''/></div>
    <div className='cart-item__place'>место</div>
    
    </div>

    )






}


export default CartEvent
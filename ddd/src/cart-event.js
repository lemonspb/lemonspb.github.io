import React, {useEffect, useState} from 'react';


const CartEvent = ({selectId})=>{
    const BASE_URL = "https://kudago.com/public-api/v1.4/";


    useEffect(() => {
      getEventsId();
    },);
  
    const  [ idEvents, setIdEvents] = useState([]);
    const getEventsId = () => {
      fetch(
        `${BASE_URL}/events/${selectId}/`
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
    <div className = 'cart-item__title'></div>
    <div className = 'cart-item__discription'>описание: {idEvents.title}</div>

    <div className='cart-item__img'><img src = '' alt=''/></div>
    <div className='cart-item__text' dangerouslySetInnerHTML={{__html:idEvents.body_text}}></div>
    
    </div>

    )


}


export default CartEvent
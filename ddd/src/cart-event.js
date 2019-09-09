import React, {useEffect, useState} from 'react';


const CartEvent = ({idGet})=>{
    const BASE_URL = "https://kudago.com/public-api/v1.4/";

    // useEffect(() => {
    //   getEventsId();
    // },);
  
    // const  [ events, setEvents] = useState([]);
    // const getEventsId = () => {
    //   fetch(
    //     `${BASE_URL}/events?fields=dates,images,description,id,title,place&lang=ru&location=nsk`
    //   ).then(async response => {
    //     if (response.status !== 200) {
    //       return;
    //     }
    //     const data = await response.json();
  
    //     setEvents(data.results);
    //     console.log(data.results)
    //   });
    // };
    
return (
<div className='list-item'>
    <div className = 'cart-item__title'>имя {idGet}</div>
    <div className = 'cart-item__discription'>описание</div>

    <div className='cart-item__img'><img src = '' alt=''/></div>
    <div className='cart-item__place'>место</div>
    
    </div>

    )






}


export default CartEvent
import React,{ useEffect, useState } from 'react';
import './list.css'


const List = ({name,description,image, placeId,onShowMore, id})=>{

    const BASE_URL = "https://kudago.com/public-api/v1.4/";

    useEffect(() => {
      getPlace(placeId);
    },  );
  
    const  [ place, setPlace] = useState('');
    const getPlace = (idPlace) => {
      fetch(
        `${BASE_URL}/places/${idPlace}/?fields=title`
      ).then(async response => {
        if (response.status !== 200) {
          return;
        }
        const data = await response.json();
         console.log(data.title)
        setPlace(data.title);
      });
    };
    
return (
<div className='list-item'>
    <div className = 'list-item__title'>{name}</div>
    <div className = 'list-item__discription'>
    <div className='discription__title'> Описание </div>
    <div  className='discription__text' dangerouslySetInnerHTML={{__html:description}}></div>
    </div>
    <div className='list-item__place'><span>Место:</span>{place}</div>

    <div className='list-item__img'><img src = {image} alt=''/></div>
    
    <button className='list-item__more'>подробнее</button>
    </div>
)






}


export default List
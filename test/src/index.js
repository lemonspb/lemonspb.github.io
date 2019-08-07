import React from 'react';
import ReactDom from  'react-dom';

fetch(`http://demo.sibers.com/users`).then(async response => {
  if (response.status !== 200) {
    return;
  }
  const data = await response.json();

  data.forEach(({ id,name, avatar, phone, address, website, email }) => {

    console.log(name)

  });
});

// ReactDom.render(el, document.getElementById('root'))

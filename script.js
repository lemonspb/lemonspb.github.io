

const getImages = () => {
    document.querySelectorAll('img').forEach((el)=>{
        const link = document.createElement("a");
       let imageUrl =  el.getAttribute('src')
       link.setAttribute("href",`${imageUrl}`);
       link.setAttribute("download", `${imageUrl}`);
       link.click()
    })
}
getImages()


const getUrlPhoto = () =>{
document.querySelectorAll('.photos_row ').forEach((el)=>{
        let  url = el.style.backgroundImage
        let link = document.createElement("a");

        link.setAttribute("href",`${url.slice(5,-2)}`);
        link.setAttribute("download", `${url.slice(5,-2)}`);
        link.click()
      })
  }


getUrlPhoto()


const abc = 'url("https://sun9-46.userapi.com/c10526/u81019872/127728995/x_3426158e.jpg")'

console.log(abc.slice(5,-2))
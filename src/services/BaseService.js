import React, {useState} from 'react';



const BaseService = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    fetch("https://api.example.com/items")
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoaded(true)
        setItems(result.items)
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        setIsLoaded(true)
        console.log(error)
      }
    )

    return (
       <>
       <div>hello</div>
       </>

    )

}

export default BaseService
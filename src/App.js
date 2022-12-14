import React from "react";
import './App.css';
import Form from"./Form" ;
import { useState } from "react";
 import {Route, Link,Switch} from 'react-router-dom';



const App = () => {

  const [formData, setFormdata] = useState({
    isim: "",
    boyut: "",
    malzeme1: false,
    malzeme2: false,
    malzeme3: false,
    malzeme4: false,
    özel: "",
  });
  const[checkButton,setcheckButton]= useState(false);

// console.log(checkButton)
// const handleClick = (e) => {
  
//   history.push();
// };

  return (
    <div>
      <div class="ana-hat">
        <h1>Pizza Dükkanı</h1>
        <nav>

          <a href="Home">Home</a>

          <a href="Help">  Help</a>

        </nav>
      </div>
      
  
   <Switch>
    <Route path="/" exact>
      <div>
    <h4>Favori Pizzanı Seç</h4>
    <div className="container-image">
   {/* <button >Pizzanı Yap</button>  */}
   
   
   <Link className="buttonumsu" to="/pizza" id="order-pizza">Pizzanı Yap</Link>
      </div></div></Route>
   <Route path="/pizza"><div><Form/></div></Route>

   </Switch>
 
 {/* <button onClick={()=>{setcheckButton(!checkButton)}}>
 {  (checkButton===true) ? "Pizza Yap Kapat" : "Pizza Yap"}
  </button>   */}
  
 
    
   
       {/* {
      checkButton && 
      (
        <Form formuGoster ={setFormdata} />
      )
    } */}
   
    </div>
   
  )
};


export default App;

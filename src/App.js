import React from "react";
import './App.css';
import Form from "./Form";
import { Route, Link, Switch } from 'react-router-dom';



const App = () => {



  return (
    <div>
      <div class="ana-hat">
        <h1>Batıkent Pizzacısı 🍕 </h1>
        <nav>

          <a href="Giriş Yap">Giriş Yap</a>

          <a href="Sepetim">Sepetim</a>

        </nav>
      </div>


      <Switch>
        <Route path="/" exact>
          <div>
            <h4>Favori Pizzanı Seç ⭐ </h4>
            <Link className="buttonumsu" to="/pizza" id="order-pizza">Pizzanı Yap</Link>
          </div>
          <section>
            <div>

              <h3>Karışık Pizza</h3>
              <img src="https://w7.pngwing.com/pngs/202/751/png-transparent-pizza-garlic-bread-food-clock-ingredient-pizza.png" />
            </div>

            <div>
              <h3>Karnaval Pizza</h3>
              <img src="https://e7.pngegg.com/pngimages/442/206/png-clipart-seafood-pizza-vegetarian-cuisine-italian-cuisine-restaurant-pizza-food-cheese.png" />
            </div>
            <div>
              <h3>İtalyan Pizza</h3>
              <img src="https://img2.freepng.es/20180511/gvq/kisspng-pizza-margherita-margarita-sushi-italian-cuisine-5af5346f049fd9.139613271526019183019.jpg" />
            </div>

            <div>
              <h3>Fransız Pizza</h3>
              <img src="https://w7.pngwing.com/pngs/8/492/png-transparent-pizza-take-out-restaurant-normandin-pizza.png" />
            </div>

          </section>

        </Route>
        <Route path="/pizza"><div><Form /></div></Route>

      </Switch>


    </div>

  )
};


export default App;

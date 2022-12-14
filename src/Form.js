import React from "react";
import './App.css';
import { useState,useEffect} from "react";
//import axios from "axios";
import * as yup from "yup";
import axios from "axios";
import "./App.js";
 import { Link} from 'react-router-dom';


const schema = yup.object().shape({
  isim: yup
    .string()
    .required("isim gerekli")
    .min(2, "İsim en az 2 karakter olmalıdır"),
boyut: yup
    .mixed()
    .oneOf(["Küçük","Orta","Büyük"],"Lütfen Boyut Şecin"),
malzeme1: yup 
  .boolean()
  .oneOf([true,false],""),
//   malzeme1: yup 
//   .mixed()
//   .oneOf([""],"en az 2 malzeme seçiniz"),
malzeme2: yup
.boolean()
.oneOf([true,false],""),
malzeme3: yup
.boolean()
.oneOf([true,false],""),
malzeme4: yup
.boolean()
.oneOf([true,false],""),
özel: yup
.string()
.required("Not girmek zorunludur")
.min(2, "2 karakterden az girilemez"),

});

{/* <Link to="/pizza" >{App.js} </Link> */}
const Form = (prop) => {

 const{formuGoster}= prop    

  const [formData, setFormdata] = useState({
    isim: "",
    boyut: "",
    malzeme1: false,
    malzeme2: false,
    malzeme3: false,
    malzeme4: false,
    özel: "",
  });

  const [errors, setErrors] = useState({
    isim: "",
    boyut: "",
    malzeme1: "",
    malzeme2: "",
    malzeme3: "",
    malzeme4: "",
    özel: "",
  });

  const handleChange = (e) => {
    const { checked, name, value, type } = e.target;
    const valueToUse = type === "checkbox" ? checked : value;

  checkFormErrors(name,valueToUse);

    setFormdata({
      ...formData,
      [name]:valueToUse
    })
  }
  


  const[isim,setİsim]= useState("");
  const[boyut,setBoyut]= useState("");
  const[özel,setÖzel]= useState("");

  const[cikarilacakMalzeme,setcikarilacakMalzeme]= useState([]);
  console.log(cikarilacakMalzeme)

  const handleCikarilacaklar = event => {
    const { name, checked } = event.target;
    if (checked) {
      setcikarilacakMalzeme([...cikarilacakMalzeme, name]);
    } 
    else {
      const cikarilacakCopy = [...cikarilacakMalzeme];
      cikarilacakCopy.splice(cikarilacakCopy.indexOf(name), 1);
      setcikarilacakMalzeme(cikarilacakCopy);
    }
  };
  
  const handleSubmit = (event) => {
    // Formun gonderilmesini engelleyeceğim
    event.preventDefault();
    // setPizzaCheck(true)
    // console.log(formData);
    const newUser = {
        isim: formData.isim,
        boyut: formData.boyut,
        malzeme1: formData.malzeme1, 
        malzeme2: formData.malzeme2, 
        malzeme3: formData.malzeme3, 
        malzeme4: formData.malzeme4, 
        özel: formData.özel
      };
      console.log(newUser);

      axios
      .post("https://reqres.in/api/orders", newUser)
      .then((res)=>{
        console.log(res.data)
        setİsim(res.data.isim);
        setBoyut(res.data.boyut);
        setÖzel(res.data.özel);
        // setcikarilacakMalzeme(res.data.cikarilacakMalzeme)

        setFormdata({
            isim: "",
            boyut: "",
            malzeme1: false,
            malzeme2: false,
            malzeme3: false,
            malzeme4: false,
            özel: "",
          });
        })
        .catch((err) => {
          //debugger;
        });
};
  const [disable, setDisable] = useState(true)

  useEffect(() => {
    schema.isValid(formData).then((valid) => setDisable(!valid));
  }, [formData]);

  const checkFormErrors = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        // Hata yoksa buraya geliyordu
        setErrors({
          ...errors,
          [name]: ""
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [name]: err.errors[0]
        });
      });
  }
//   const [pizzaCheck, setPizzaCheck] = useState(false);
   //let = ["sucuk","sosis","zeytin","mısır"]

  return (
    <div>
        <Link  to="/" >Anasayfaya dön</Link>
 
      {/* <div className ="ana-hat">
        <h1>Pizza Dükkanı</h1>
        <nav>
          <a href="Home">Home</a>
          <a href="Help">  Help</a>
        </nav>
      </div> */}
      <h4>Kendi Pizzanı Yap</h4>
      <div className="container-image">
      </div>
      <div className="App">
      <div style={{ color: "red" }}>
        <div>{errors.isim}</div>
        <div>{errors.boyut}</div>
        <div>{errors.malzeme1}</div>
        <div>{errors.malzeme2}</div>
        <div>{errors.malzeme3}</div>
        <div>{errors.malzeme4}</div>
        <div>{errors.özel}</div>
      </div>
      </div>
      <form onSubmit={handleSubmit} id="pizza-form">
        
        <p>
          <label htmlFor="name-input">Pizza İsmi : </label>
          <input
            type="text"
            id="name-input"
            name="isim"
             placeholder="Karışık,Karnaval,İtalyan"
            value={formData.isim}
           onChange={handleChange}
          />
        </p>
        <p>
          <label htmlFor="size-dropdown">Pizza Boyutunu Seçiniz : </label>
          <select
            type="text"
            name="boyut"
            id="size-dropdown"
           value={formData.boyut}
           onChange={handleChange}
          >
            <option value="">Seçiniz</option>
            <option value="Küçük">Küçük </option>
            <option value="Orta">Orta </option>
            <option value="Büyük">Büyük </option>
          </select>
        </p>

        <div className="checkbox">
          <label>Çıkarmak İstediğiniz Malzemeyi Seçiniz : </label>
          <div>
            <input
              type="checkbox"
              name="sucuk"
              
             checked={cikarilacakMalzeme.includes("sucuk")}
           onChange={handleCikarilacaklar}
            />
            <label>Sucuk </label>
          </div>
          <div>
            <input
              type="checkbox"
              name="sosis"
              
              checked={cikarilacakMalzeme.includes("sosis")}
              onChange={handleCikarilacaklar}
            />
            <label>Sosis </label>
          </div>
          <div>
            <input
              type="checkbox"
              name="zeytin"
              checked={cikarilacakMalzeme.includes("zeytin")}
             
              onChange={handleCikarilacaklar}
            />
            <label>Zeytin </label>
          </div>
          <div>
            <input
              type="checkbox"
              name="mısır"
              checked={cikarilacakMalzeme.includes("mısır")}
              
              onChange={handleCikarilacaklar}
            />
            <label>Mısır </label>
          </div>
        </div>
        <p>
          <label htmlFor="special-text">Sipariş Notunu Giriniz : </label>
          <input
            type="text"
            id="special-text"
            name="özel"
             value={formData.özel}
           onChange={handleChange}
          />
        </p>
        <p>
          <input id="order-button" type="submit" value="Siparişlere Ekle" disabled={disable}  />
        </p>
  
      </form>
      {/* {
                pizzaCheck && 
                (
                <>
                <h3>Siparis Alındı</h3>
                <div>
                    <p>İsim: {formData.isim}</p>
                    <p>Pizza Boy: {formData.boyut}</p>
                    <p>Seçilen 1. Malzeme: {formData.malzeme1}</p>
                    <p>Seçilen 2. Malzeme: {formData.malzeme2}</p>
          
                </div>
                </>
                )
            } */}
<div>
            <p>{isim !== "" ? <h3>{isim} Pizza,</h3>: null}</p>
            <p>{boyut !== "" ? <h3>{boyut} boy ,</h3>: null}</p>
             {/* <p>{cikarilacakMalzeme !== "" ? <h3>{setcikarilacakMalzeme(!cikarilacakMalzeme)} olmayacak ,</h3>: null}</p>    */}
              <p>{özel !== "" ? <h3>{özel} sipariş notu ile sipariş verildi. </h3>: null}</p> 
            </div>
    </div>

  )

}
export default Form;











import React from "react";
import './App.css';
import { useState, useEffect } from "react";
//import axios from "axios";
import * as yup from "yup";
import axios from "axios";
import "./App.js";
import { Link } from 'react-router-dom';


const schema = yup.object().shape({
    isim: yup
        .string()
        .required("İsim germek zorunludur.")
        .min(2, "İsim en az 2 karakter olmalıdır"),
    boyut: yup
        .mixed()
        .oneOf(["Küçük", "Orta", "Büyük"], "Lütfen Boyut Şecin"),
    malzeme1: yup
        .boolean()
        .oneOf([true, false], ""),
    malzeme2: yup
        .boolean()
        .oneOf([true, false], ""),
    malzeme3: yup
        .boolean()
        .oneOf([true, false], ""),
    malzeme4: yup
        .boolean()
        .oneOf([true, false], ""),
    özel: yup
        .string()
        .required("Not girmek zorunludur")
        .min(2, "2 karakterden az girilemez"),

});


const Form = (prop) => {



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

        checkFormErrors(name, valueToUse);

        setFormdata({
            ...formData,
            [name]: valueToUse
        })
    }

    const [isim, setİsim] = useState("");
    const [boyut, setBoyut] = useState("");
    const [özel, setÖzel] = useState("");


    const handleSubmit = (event) => {

        event.preventDefault();

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
        //   console.log(newUser);

        axios
            .post("https://reqres.in/api/orders", newUser)
            .then((res) => {
                console.log(res.data)
                
                setİsim(res.data.isim);
                setBoyut(res.data.boyut);
                setÖzel(res.data.özel);

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


    return (
        <div>

            <div className="container-image">
            <Link className="butonumsu2" to="/" >Anasayfaya dön</Link>
            </div>
            <h4>Kendi Pizzanı Yap</h4>
            <div className="App">
                <div style={{ color: "red", fontWeight: "bold" }}>
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
                    <input style={{backgroundColor:"bisque"}}
                        type="text"
                        id="name-input"
                        name="isim"
                        placeholder="Karışık,Karnaval,İtalyan,Fransız"
                        value={formData.isim}
                        onChange={handleChange}
                    />
                </p>
                <p>
                    <label htmlFor="size-dropdown">Pizza Boyutunu Seçiniz : </label>
                    <select style={{backgroundColor:"bisque"}} 
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
                    <label >Çıkarmak İstediğiniz Malzemeyi Seçiniz : </label>
                    <div>
                        <input   
                            type="checkbox"
                            name="malzeme1"
                            checked={formData.malzeme1}
                            onChange={handleChange}
                        />
                        <label>Sucuk </label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="malzeme2"
                            checked={formData.malzeme2}
                            onChange={handleChange}
                        />
                        <label>Sosis </label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="malzeme3"
                            checked={formData.malzeme3}
                            onChange={handleChange}
                        />
                        <label>Zeytin </label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="malzeme4"
                            checked={formData.malzeme4}
                            onChange={handleChange}
                        />
                        <label>Mısır </label>
                    </div>
                </div>
                <p>
                    <label htmlFor="special-text">Sipariş Notunu Giriniz : </label>
                    <input style={{backgroundColor:"bisque"}} 
                        type="text"
                        id="special-text"
                        name="özel"
                        value={formData.özel}
                        onChange={handleChange}
                    />
                </p>
                <p>
                    <input id="order-button" type="submit" value="Siparişlere Ekle" disabled={disable} />
                </p>

            </form>

            <div style={{ color: "red", fontStyle: "italic" }}>
                <p>{isim !== "" ? <h3>{isim} Pizza,</h3> : null}</p>
                <p>{boyut !== "" ? <h3>{boyut} boy ,</h3> : null}</p>
                <p>{özel !== "" ? <h3>"{özel}" sipariş notu ile sipariş verildi. </h3> : null}</p>
            </div>
        </div>
    )

}
export default Form;











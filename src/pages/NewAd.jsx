import React from "react";

import { BsArrow90DegLeft } from "react-icons/bs";
import { auth, db } from "../firebase-conf";

import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import AdType from "../utils/AdType";

const NewAd = () => {
  const [gradovi, setGradovi] = useState([]);
  const [userData, setUserData] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  auth.onAuthStateChanged((e) => setLoggedIn(e != null));

  const navigate = useNavigate();

  const postAd = async () => {
    try {
      await addDoc(collection(db, "ads"), adData);
      navigate("/ads");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getCities = async () => {
      await axios
        .post(`https://countriesnow.space/api/v0.1/countries/cities`, {
          country: "serbia",
        })
        .then((e) => setGradovi(e.data.data));
    };

    const getUserData = async () => {
      try {
        const userData = (
          await getDoc(doc(db, "users", auth.currentUser.uid))
        ).data();

        setUserData(userData);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
    getCities();
  }, []);

  let adData = {
    type: AdType.Person,
    title: "",
    about: "",
    price: 0,
    city: "",
    creatorName: loggedIn ? userData.name : "",
    creatorPhoneNumber: loggedIn ? userData.phoneNumber : "",
  };

  return (
    <div className="rounded bg-white p-4 w-50 mx-auto mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h4 class="m-0">New Ad</h4>
        <Link className="btn btn-danger" to={"/ads"}>
          <BsArrow90DegLeft className="mb-1 me-1" /> Back
        </Link>
      </div>
      <hr class="mb-4" />
      <div class="mb-3 row">
        <div className="col">
          <input
            type="text"
            class="form-control"
            id="titleInput"
            placeholder="Title"
            onChange={(e) => (adData.title = e.target.value)}
            required
          />
        </div>

        <div className="col">
          <div className="col">
            <select
              id="typeInput"
              class={"form-select"}
              onChange={(e) => (adData.type = e.target.value)}
              defaultValue={AdType.Person}
            >
              <option value={AdType.Person}>Diet plan</option>
              <option value={AdType.Dog}>Nutrition plan for pregnancy</option>
              <option value={AdType.Cat}>Nutrition plan for athlets</option>
              <option value={AdType.Parrot}>Consultations</option>
            </select>
          </div>
        </div>
      </div>
      <div class="form-floating">
        <textarea
          class="form-control mb-3"
          id="floatingTextarea2"
          maxLength={200}
          style={{ height: "100px" }}
          onChange={(e) => (adData.about = e.target.value)}
          required
        ></textarea>
        <label htmlFor="floatingTextarea2">
          Opis oglasa (max. 200 karaktera)
        </label>
      </div>
      <div class=" row">
        <div className="col-6">
          <select
            id="inputState"
            class="form-select"
            onChange={(e) => (adData.city = e.target.value)}
            defaultValue={"grad"}
          >
            <option value={"grad"} disabled>
              Country
            </option>
            {gradovi.map((grad) => (
              <option value={grad} key={grad}>
                {grad}
              </option>
            ))}
          </select>
        </div>
        <div className="col-3">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="Price"
              aria-describedby="basic-addon2"
              onChange={(e) => (adData.price = e.target.value)}
            />
            <span class="input-group-text" id="basic-addon2">
              eur
            </span>
          </div>
        </div>
        <div className="col-3">
          <button className="btn btn-success col-12" onClick={() => postAd()}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewAd;

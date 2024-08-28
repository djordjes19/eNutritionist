import React from "react";

import { useState, useEffect } from "react";
import axios from "axios";
import { createUserWithEmailAndPassword } from "@firebase/auth";

import { auth, db } from "../../firebase-conf";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

let userData = {
  ime: "",
  prezime: "",
  email: "",
  brtel: "",
  grad: "",
  datumrodjenja: "",
};

const Register = () => {
  const [gradovi, setGradovi] = useState([]);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const createUser = async () => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        password
      );

      await setDoc(doc(db, "users", response.user.uid), {
        name: userData.ime + " " + userData.prezime,
        phoneNumber: userData.brtel,
        city: userData.grad,
        dateOfBirth: userData.datumrodjenja,
      });
      navigate("/ads");
    } catch (err) {
      console.error(err);
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

    getCities();
  }, []);

  return (
    <div className="d-flex flex-column">
      <div class="mb-3">
        <input
          type="email"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="Email adress"
          onChange={(e) => (userData.email = e.target.value)}
        />
      </div>
      <div class="mb-3">
        <input
          type="password"
          class="form-control"
          id="exampleFormControlInput2"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div class="mb-3 row">
        <div className="col">
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput3"
            placeholder="First name"
            onChange={(e) => (userData.ime = e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput4"
            placeholder="Last name"
            onChange={(e) => (userData.prezime = e.target.value)}
          />
        </div>
      </div>
      <div class="mb-3">
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput5"
          placeholder="Phone number"
          onChange={(e) => (userData.brtel = e.target.value)}
        />
      </div>
      <div class="mb-3 row">
        <div className="col">
          <input
            type="date"
            class="form-control"
            id="exampleFormControlInput6"
            placeholder="Birth date "
            onChange={(e) => (userData.datumrodjenja = e.target.value)}
          />
        </div>
        <div className="col">
          <select
            id="inputState"
            class="form-select"
            onChange={(e) => (userData.grad = e.target.value)}
          >
            <option selected disabled>
              Country
            </option>
            {gradovi.map((grad) => (
              <option value={grad}>{grad}</option>
            ))}
          </select>
        </div>
      </div>
      <button
        className="btn btn-success"
        id="signInButton"
        onClick={createUser}
      >
        Save
      </button>
    </div>
  );
};

export default Register;

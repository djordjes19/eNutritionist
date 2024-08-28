import { doc, getDoc, updateDoc } from "firebase/firestore";
import { signInWithEmailAndPassword, updateEmail } from "firebase/auth";
import React from "react";
import { useState, useEffect } from "react";
import { auth, db } from "../firebase-conf";
import axios from "axios";

let userData = {
  ime: "",
  prezime: "",
  email: "",
  brtel: "",
  grad: "",
  datumrodjenja: "",
};

const ProfileSettings = () => {
  const [gradovi, setGradovi] = useState([]);
  const [reloadData, reload] = useState(false);

  const updateUserEmail = async () => {
    let pass = prompt("Unesite vašu lozinku");
    await signInWithEmailAndPassword(userData.email, pass).then(
      updateEmail(auth.currentUser, userData.email)
    );
    reload(!reloadData);
  };

  const updateProfile = async () => {
    const ref = doc(db, "users", auth.currentUser.uid);
    await updateDoc(ref, {
      city: userData.grad,
      dateOfBirth: userData.datumrodjenja,
      name: userData.ime + " " + userData.prezime,
      phoneNumber: userData.brtel,
    });
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
        const fetchedUserData = (
          await getDoc(doc(db, "users", auth.currentUser.uid))
        ).data();

        userData.ime = fetchedUserData.name.split(" ")[0];
        userData.prezime = fetchedUserData.name.split(" ")[1];
        userData.email = auth.currentUser.email;
        userData.brtel = fetchedUserData.phoneNumber;
        userData.grad = fetchedUserData.city;
        userData.datumrodjenja = fetchedUserData.dateOfBirth;
        reload(!reloadData);
      } catch (err) {
        console.error(err);
      }
    };

    getCities();
    getUserData();
  }, [reloadData]);

  return (
    <div className="d-flex flex-column col-5 mx-auto mt-5">
      <h4>Profile settings</h4>
      <hr className="mb-4" />
      <div class=" row">
        <div className="col-8">
          <input
            type="email"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="Email adress"
            defaultValue={userData.email}
            onChange={(e) => (userData.email = e.target.value)}
          />
        </div>
        <div className="col-4">
          <button
            className="btn btn-success col-12"
            id="signInButton"
            onClick={updateUserEmail}
          >
            Change email
          </button>
        </div>
      </div>
      <hr className="mb-3" />
      <div class="mb-3 row">
        <div className="col">
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput3"
            placeholder="First name"
            defaultValue={userData.ime}
            onChange={(e) => (userData.ime = e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput4"
            defaultValue={userData.prezime}
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
          defaultValue={userData.brtel}
          onChange={(e) => (userData.brtel = e.target.value)}
        />
      </div>
      <div class="mb-3 row">
        <div className="col">
          <input
            type="date"
            class="form-control"
            id="exampleFormControlInput6"
            placeholder="Birth date"
            defaultValue={userData.datumrodjenja}
            onChange={(e) => (userData.datumrodjenja = e.target.value)}
          />
        </div>
        <div className="col">
          <select
            id="inputState"
            class="form-select"
            defaultValue={userData.grad}
            onChange={(e) => (userData.grad = e.target.value)}
          >
            {gradovi.map((grad) => (
              <option value={grad}>{grad}</option>
            ))}
          </select>
        </div>
      </div>
      <button
        className="btn btn-success"
        id="signInButton"
        onClick={updateProfile}
      >
        Save changes
      </button>
    </div>
  );
};

export default ProfileSettings;

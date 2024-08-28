import React from "react";
import { auth, db } from "../../firebase-conf";
import "./Ads.css";
import { useState, useEffect } from "react";

import Ad from "../../components/Ads/Ad";
import { BsSearch } from "react-icons/bs";
// import AdType from "../../utils/AdType";
import { Link } from "react-router-dom";

import axios from "axios";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

const Oglasi = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [gradovi, setGradovi] = useState([]);
  const [userData, setUserData] = useState({});
  const [oglasi, setOglasi] = useState([]);
  const [reloadState, reload] = useState("");

  auth.onAuthStateChanged((e) => setLoggedIn(e != null));

  const adCollectionRef = collection(db, "ads");

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

    const getAds = async () => {
      try {
        const data = await getDocs(adCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setOglasi(filteredData);
      } catch (err) {
        console.log(err);
      }
    };

    getUserData();
    getCities();
    getAds();
  }, [reloadState]);

  return (
    <>
      <div className="container d-flex justify-content-center my-5" id="ads">
        <div className="row col-9">
          <div className="col-3">
            {loggedIn ? (
              <Link className="btn btn-success mb-3 col-12" to={"/newad"}>
                Create ad
              </Link>
            ) : (
              <button className="btn btn-success mb-3 col-12 disabled">
                Create ad
              </button>
            )}
            <div class="input-group mb-3">
              <span class="input-group-text">
                <BsSearch />
              </span>
              <input
                type="text"
                class="form-control shadow-none"
                placeholder="Search"
              />
            </div>
            <div className="input-group mb-3">
              <select id="inputState" class="form-select" onChange={(e) => {}}>
                <option selected>Country</option>
                {gradovi.map((grad) => (
                  <option value={grad}>{grad}</option>
                ))}
              </select>
            </div>
            <div className="input-group mb-3">
              <select id="inputState" class="form-select" onChange={(e) => {}}>
                <option value={""} selected>
                  Looking for nutritionist
                </option>
                <option>Offer a dite plan </option>
              </select>
            </div>
            <div className="input-group">
              <select id="inputState" class="form-select" onChange={(e) => {}}>
                <option selected>Sort</option>
                <option>Price: High-Low</option>
                <option>Price: Low-High</option>
                <option>Newest</option>
              </select>
            </div>
          </div>
          <div className="col-1 d-flex justify-content-center">
            <div className="vr"></div>
          </div>
          <div className="col-8">
            {oglasi.map((e) => (
              <Ad
                adData={e}
                isMyAd={e.creatorName === userData.name}
                reload={reload}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Oglasi;

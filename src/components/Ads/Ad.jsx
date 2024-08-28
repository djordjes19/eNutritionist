import React from "react";

import { FaCat, FaDog, FaDove } from "react-icons/fa";
import { BiMap } from "react-icons/bi";
import { BsPerson, BsCurrencyDollar, BsTelephone } from "react-icons/bs";

import AdType from "../../utils/AdType";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-conf";

const Oglas = ({ adData, isMyAd, reload }) => {
  let adImage = {
    icon: null,
    color: "",
  };

  const deleteAd = async () => {
    const ref = doc(db, "ads", adData.id);
    await deleteDoc(ref);
    reload(adData.id);
  };

  switch (adData.type) {
    case AdType.Dog:
      adImage.icon = <FaDog style={{ fontSize: 60 }} />;
      adImage.color = "#7dfc77";
      break;
    case AdType.Cat:
      adImage.icon = <FaCat style={{ fontSize: 60 }} />;
      adImage.color = "#77bafc";
      break;
    case AdType.Parrot:
      adImage.icon = <FaDove style={{ fontSize: 60 }} />;
      adImage.color = "#fcb177";
      break;
    default:
      adImage.icon = <BsPerson style={{ fontSize: 60 }} />;
      adImage.color = "#f58cbe";
      break;
  }

  return (
    <>
      <div class="card mb-3">
        <div class="row g-0">
          <div
            class="col-md-3 d-flex justify-content-center align-items-center"
            style={{ backgroundColor: adImage.color }}
          >
            {adImage.icon}
          </div>
          <div class="col-md-9">
            <div class="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h5 class="card-title">{adData.title}</h5>
                <div className="d-flex gap-3">
                  <small class="text-muted">
                    <BsCurrencyDollar className="mb-1" /> {adData.price} eur
                  </small>
                  <small class="text-muted">
                    <BiMap className="mb-1" /> {adData.city}
                  </small>
                </div>
              </div>

              <p class="card-text">{adData.about}</p>
              <hr />
              <p class="card-text">
                <div className="d-flex justify-content-between align-items-center">
                  <p class="text-muted text-decoration-none m-0">
                    <BsPerson className="mb-1 me-1" />
                    {adData.creatorName}
                  </p>
                  {!isMyAd ? (
                    <a
                      class="text-muted text-decoration-none m-0"
                      href={"tel:" + adData.creatorPhoneNumber}
                    >
                      <BsTelephone className="mb-1 me-1" />
                      {adData.creatorPhoneNumber}
                    </a>
                  ) : (
                    <button className="btn btn-danger" onClick={deleteAd}>
                      Delete profile
                    </button>
                  )}
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Oglas;

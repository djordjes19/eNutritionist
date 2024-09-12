import React from "react";
import { Link } from "react-router-dom";

import { BsArrowRight } from "react-icons/bs";

function Home() {
  return (
    <>
      <div className="container my-5">
        <div className="col-12 row m-0">
          <div className="col-7 d-flex align-items-center">
            <div>
              <h4 className="text-secondary">
                Welcome to first online nutritionist website! We provide
                personalized meal plans for a healthier life.
              </h4>
              <h1 className="mb-3">Health is Wealth </h1>
              <p>
                "Our website offers a wide range of services, such as creating
                nutrition plans for various needs, online consultations with
                selected nutritionists, a wealth of healthy recipes, and
                valuable tips. Our goal is to provide all these services to our
                users online."
              </p>
              <Link className="btn btn-success" to={"/ads"}>
                Choose your Nutricionist
                <BsArrowRight className="ms-2" />
              </Link>
            </div>
          </div>
          <img
            src="/img/11.jpg"
            alt="Dog"
            className="col-5 img-fluid rounded p-0 float-end"
          />
        </div>
      </div>
      <div class="bg-success bg-opacity-50 py-5">
        <div className="d-flex justify-content-center text-center gap-5 my-2">
          <div className="px-5">
            <h1>
              <strong>27</strong>
            </h1>
            <p>Registered nutricionist </p>
          </div>
          <div className="px-5">
            <h1>
              <strong>354</strong>
            </h1>
            <p>Clients</p>
          </div>
          <div className="px-5">
            <h1>
              <strong>5</strong>
            </h1>
            <p>Countries</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

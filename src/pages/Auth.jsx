import React from "react";

import { useState } from "react";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";

const Auth = () => {
  const [mode, setMode] = useState(1);

  return (
    <>
      <div className="my-5 d-flex justify-content-center">
        <div className="col-4">
          <h2 className="text-center mb-5">
            {mode === 1 ? "Prijavi se" : "Napravi nalog"}
          </h2>
          {mode === 1 ? <Login /> : <Register />}
          <p
            onClick={() => setMode(!mode)}
            className="text-center mt-3"
            style={{ cursor: "pointer" }}
          >
            {mode === 1
              ? "Don't have account? Sing in"
              : "Have account? Log in"}
          </p>
        </div>
      </div>
    </>
  );
};

export default Auth;

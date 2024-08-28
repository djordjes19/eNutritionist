import React from "react";

import { auth } from "../../firebase-conf";
import { signInWithEmailAndPassword } from "firebase/auth";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/ads");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="d-flex flex-column">
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Email address
        </label>
        <input
          type="email"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="nick@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Password
        </label>
        <input
          type="password"
          class="form-control"
          id="exampleFormControlInput2"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-success" onClick={signIn}>
        Log in
      </button>
    </div>
  );
};

export default Login;

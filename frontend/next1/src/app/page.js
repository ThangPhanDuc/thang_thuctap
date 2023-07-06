"use client";

import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import axios from "./api/axios";
import Cookies from 'js-cookie';

export default function Home() {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();

  const router = useRouter();
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      let res = await axios.post('/login', {
        email: userName,
        password: password
      });
      // setUserName("");
      // setPassword("");
      if (res && res.data) {
        localStorage.setItem("token", res.data.access_token)
        // Cookies.set('token', res.data.message);
      }
      router.push("/listUser");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      onSubmit={handleLogin}
      className="w-50 mx-auto mt-5">
        <h1 className="mb-3">Form login</h1>

      <div className="form-outline mb-4">
        <input
          onChange={e => setUserName(e.target.value)}
          type="email" id="form2Example1" className="form-control" />
        <label className="form-label" htmlFor="form2Example1">
          Email address
        </label>
      </div>
      <div className="form-outline mb-4">
        <input
          onChange={e => setPassword(e.target.value)}
          type="password" id="form2Example2" className="form-control" />
        <label className="form-label" htmlFor="form2Example2">
          Password
        </label>
      </div>
      <div className="row mb-4">
        <div className="col d-flex justify-content-center">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue=""
              id="form2Example31"
              defaultChecked=""
            />
            <label className="form-check-label" htmlFor="form2Example31">
              {" "}
              Remember me{" "}
            </label>
          </div>
        </div>
        <div className="col">
          <a href="#!">Forgot password?</a>
        </div>
      </div>
      <button type="submit" className="btn btn-primary btn-block mb-4">
        Sign in
      </button>
      <div className="text-center">
        <p>
          Not a member? <a href="#!">Register</a>
        </p>
        <p>or sign up with:</p>
        <button type="button" className="btn btn-link btn-floating mx-1">
          <i className="fab fa-facebook-f" />
        </button>
        <button type="button" className="btn btn-link btn-floating mx-1">
          <i className="fab fa-google" />
        </button>
        <button type="button" className="btn btn-link btn-floating mx-1">
          <i className="fab fa-twitter" />
        </button>
        <button type="button" className="btn btn-link btn-floating mx-1">
          <i className="fab fa-github" />
        </button>
      </div>
    </form>

  );
}

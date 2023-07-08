"use client";

import axios from "../../../api/axios";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Link from 'next/link'

function InformationOfOtherUsers({ params }) {
  const { id } = params;
  const [user, setUser] = useState({});
  const [userIsLogin, setUserIsLogin] = useState({});

  useEffect(() => {
    const getUserById = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      try {
        const response = await axios.get(`/getUserById/${id}`, config);
        const userInfo = response.data;
        setUser(userInfo);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUserById();

    //
    const getUserIsLogin = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      try {
        const response = await axios.get(`/user`, config);
        const userInfo = response.data;
        setUserIsLogin(userInfo);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUserIsLogin();
  }, []);

  const router = useRouter();
  const updateUser = () => {
    router.push('user/updateUser');
  }

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <div className="container py-5">
        <div className="row">
          <div className="col">
            <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">User</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  User Profile
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src={"http://localhost:8000/" + user.img}
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: 150 }}
                />
                <h5 className="my-3">{user.name}</h5>
                <div className="d-flex justify-content-center mb-2">
                  {user.id == userIsLogin.id &&
                    <button
                      type="button"
                      className="btn btn-outline-dark"
                      data-mdb-ripple-color="dark"
                      style={{ zIndex: 1 }}
                    >
                      <Link href="/user/updateUser" >Edit profile</Link>


                    </button>
                  }

                  {/* <button type="button" className="btn btn-primary">
                    Follow
                  </button>
                  <button type="button" className="btn btn-outline-primary ms-1">
                    Message
                  </button> */}

                </div>
              </div>
            </div>

          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body" dangerouslySetInnerHTML={{ __html: user.profile }}>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


  )
}

export default InformationOfOtherUsers
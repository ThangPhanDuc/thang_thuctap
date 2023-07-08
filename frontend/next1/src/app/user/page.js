"use client";

import axios from "../api/axios";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';


function User() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      try {
        const response = await axios.get('/user', config);
        const userInfo = response.data;
        setUser(userInfo);
        console.log(user);
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
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
                   <h5 className="my-3" >
                    {user.name}
                  </h5>
                <div className="d-flex justify-content-center mb-2">
                  <button
                    onClick={updateUser}
                    type="button" className="btn btn-outline-primary ms-1">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
         
          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body" dangerouslySetInnerHTML={{ __html: user.profile }}>

              </div>
              {/* <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Full Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0" dangerouslySetInnerHTML={{ __html: user.name }}></p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{user.email}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Age</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{user.age}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Phone</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{user.phone}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Address</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{user.address}</p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>


  )
}

export default User
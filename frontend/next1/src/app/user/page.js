"use client";

import axios from "../api/axios";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";

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
    <div class="card">
      
      <img
        src={ "http://localhost:8000/"+user.img  }
        className="card-img-top "
        alt="User Image"
        style={{ width: "5rem" }}
      />
      <div class="card-body">
        <h1 className="card-title">User name: {user.name}</h1>
        <p className="card-text">Email: {user.email}</p>
        <p className="card-text">Age: {user.age}</p>
        <p className="card-text">Phone: {user.phone}</p>
        <p className="card-text">Address: {user.address}</p>
        <button type="button" className="btn btn-primary" onClick={updateUser}>Chỉnh sửa thông tin cá nhân</button>
      </div>
    </div>

  )
}

export default User
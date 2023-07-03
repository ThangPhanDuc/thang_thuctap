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
      router.push("/user");
      // console.log(res.data.access_token);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1 class="display-4">Đăng nhập</h1>
      <form class="my-4" onSubmit={handleLogin}>
        <div class="form-group">
          <input
            onChange={e => setUserName(e.target.value)}
            type="text" name="username" class="form-control" placeholder="Tên người dùng" />
        </div>
        <div class="form-group">
          <input
            onChange={e => setPassword(e.target.value)}
            type="password" name="password" class="form-control" placeholder="Mật khẩu" />
        </div>
        <button type="submit" class="btn btn-primary" >Đăng nhập</button>
      </form>
    </div>
  );
}

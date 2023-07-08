"use client";

import axios from "../api/axios";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Link from 'next/link'

export default function listUser() {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        const getAllUser = async () => {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            try {
                const response = await axios.get('/getAllUser', config);

                setUsers(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        getAllUser();

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

    return (
        <div className="row mt-5">


            <div className="card">
                <div
                    className="rounded-top text-white d-flex flex-row"
                    style={{ backgroundColor: "#000", height: 200 }}
                >
                    <div
                        className="ms-4 mt-5 d-flex flex-column"
                        style={{ width: 150 }}
                    >
                        <img
                            src={"http://localhost:8000/" + user.img}
                            alt="Generic placeholder image"
                            className="img-fluid img-thumbnail mt-4 mb-2"
                            style={{ width: 150, zIndex: 1 }}
                        />
                        <button
                            type="button"
                            className="btn btn-outline-dark"
                            data-mdb-ripple-color="dark"
                            style={{ zIndex: 1 }}
                        >
                            <Link href="/user" >View profile</Link>
                        </button>
                    </div>
                    <div className="ms-3" style={{ marginTop: 130 }}>
                        <h5>{user.name}</h5>
                        <p>{user.email}</p>
                    </div>
                </div>
                <div
                    className="p-4 text-black"
                    style={{ backgroundColor: "#f8f9fa" }}
                >
                    <div className="d-flex justify-content-end text-center py-1">
                        <div>
                            <p className="mb-1 h5">250</p>
                            <p className="small text-muted mb-0">Photos</p>
                        </div>
                        <div className="px-3">
                            <p className="mb-1 h5">1026</p>
                            <p className="small text-muted mb-0">Followers</p>
                        </div>
                        <div>
                            <p className="mb-1 h5">425</p>
                            <p className="small text-muted mb-0">Following</p>
                        </div>
                    </div>
                </div>
            </div>

            <h1>List user</h1>
            {users.map((user, index) => {
                return (
                    <div key={index} className="col-xl-4 col-lg-6 mb-4">
                        <Link href={`listUser/informationOfOtherUsers/${user.id}`}>
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={"http://localhost:8000/" + user.img}
                                            alt=""
                                            style={{ width: 45, height: 45 }}
                                            className="rounded-circle"
                                        />
                                        <div className="ms-3">
                                            <p className="fw-bold mb-1">{user.name}</p>
                                            <p className="text-muted mb-0">{user.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                );
            })}
        </div>
    )
}
"use client";

import axios from "../api/axios";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Link from 'next/link'

export default function listUser() {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [friendStatus, setFriendStatus] = useState([]);

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
            } catch (error) {
                console.error(error);
            }
        };
        getUser();
    }, []);

    useEffect(() => {
        if (user.id) {
            const getFriendStatusByUserId = async () => {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                try {
                    const response = await axios.get(`/getFriendStatusByUserId/${user.id}`, config);
                    const friendStatus = response.data;
                    setFriendStatus(friendStatus);
                    console.log(response.data);
                } catch (error) {
                    console.error(error);
                }
            };


            getFriendStatusByUserId();
        }
    });


    const updateStatusFriend = async (friend_id, status) => {
        const token = localStorage.getItem('token');
        try {
            await axios.post("/updateStatusFriend", {
                "friend_id": friend_id,
                "status": status
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("update");

            const getFriendStatusByUserId = async () => {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                try {
                    const response = await axios.get(`/getFriendStatusByUserId/${user.id}`, config);
                    const friendStatus = response.data;
                    setFriendStatus(friendStatus);
                    console.log(response.data);
                } catch (error) {
                    console.error(error);
                }
            };


            getFriendStatusByUserId();
        } catch (error) {
            console.error(error);
        }
    }



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
                    <div className="mt-1 mr-1  d-flex ">
                        <button
                            type="button"
                            className="btn btn-outline-dark"
                            data-mdb-ripple-color="dark"
                            style={{ zIndex: 1 }}
                        >
                            <Link href="/user" >View profile</Link>
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-dark"
                            data-mdb-ripple-color="dark"
                            style={{ zIndex: 1 }}
                        >
                            <Link href="" >Friend request</Link>
                        </button>
                    </div>
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

            <div className="row">
                {users.filter((user1) => user1.id !== user.id).map((user, index) => {
                    var status = "Add Friend";
                    for (let i = 0; i < friendStatus.length; i++) {
                        if (user.id == friendStatus[i].friend_id) {
                            status = friendStatus[i].status;
                            if (status == "pending") status = "Cancel Request";
                            if (status == "accepted") status = "Unfriend";
                        }
                        if (user.id == friendStatus[i].user_id) {
                            status = friendStatus[i].status;
                            if (status == "pending") status = "Confirm";
                            if (status == "accepted") status = "Unfriend";
                        }
                    }

                    return (
                        <div key={index} className="col-xl-6 mb-4">

                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Link href={`listUser/informationOfOtherUsers/${user.id}`}>
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
                                            </div></Link>

                                        <button
                                            onClick={() => updateStatusFriend(user.id, status)}
                                            type="button" class="btn btn-outline-primary btn-rounded" data-mdb-ripple-color="dark">
                                            {status}
                                        </button>
                                    </div>
                                </div>
                                <div className="card-footer border-0 bg-light p-2 d-flex justify-content-around">
                                    <a
                                        className="btn btn-link m-0 text-reset"
                                        href="#"
                                        role="button"
                                        data-ripple-color="primary"
                                    >
                                        Message
                                        <i className="fas fa-envelope ms-2" />
                                    </a>
                                    <a
                                        className="btn btn-link m-0 text-reset"
                                        href="#"
                                        role="button"
                                        data-ripple-color="primary"
                                    >
                                        Call
                                        <i className="fas fa-phone ms-2" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    )
}
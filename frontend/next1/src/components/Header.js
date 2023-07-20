"use client";

import { useState, useEffect } from "react";
import axios from "../app/api/axios";
import Pusher from "pusher-js";
import Link from 'next/link'


export default function Header() {
    const [user, setUser] = useState({});
    const [notifications, setNotifications] = useState([]);
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        getUser();
    }, []);
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

    useEffect(() => {
        Pusher.logToConsole = true;

        var pusher = new Pusher('0699e48d294babf98468', {
            cluster: 'ap1'
        });

        var channel = pusher.subscribe('comment.' + user.id);

        channel.bind('new-comment', function (data) {
            // alert(data.userComment.name + "commented on your post: " + data.content);
            // setNotification(notification + 1);
            setNotifications(prevNotifications => [...prevNotifications, data]);
        });

    }, [user.id]);
    return (


        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-header mt-3" style={{ height: '60px' }}>
                {/* Container wrapper */}
                <div className="container-fluid">
                    {/* Navbar brand */}
                    <a className="navbar-brand mt-2 mt-lg-0" href="#">
                        <h5 className="pt-1">MDB</h5>
                    </a>
                    {/* Toggle button */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="fas fa-bars" />
                    </button>
                    <form className="d-flex mx-2">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button className="btn btn-outline-light" type="submit">
                            <i className="fas fa-search" />
                        </button>
                    </form>
                    {/* Collapsible wrapper */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {/* Left links */}
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Dashboard
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Team
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Projects
                                </a>
                            </li>
                        </ul>
                        {/* Left links */}
                        {/* Right elements */}
                        <div className="d-flex align-items-center justify-content-start">
                            {/* Icon */}
                            <a className="text-reset me-3" href="#">
                                <i className="fas fa-envelope text-white" />
                            </a>
                            {/* Notifications */}
                            <div className="dropdown">
                                <Link
                                    onClick={() => setShowNotification(!showNotification)}
                                    className="text-reset me-3 dropdown-toggle hidden-arrow"
                                    href="#"
                                    id="navbarDropdownMenuLink"
                                    role="button"
                                    data-mdb-toggle="dropdown"
                                    aria-expanded="false"

                                >
                                    <i className="fas fa-bell text-white" />
                                    <span className="badge rounded-pill badge-notification bg-danger">
                                        {notifications.length}
                                    </span>
                                </Link>
                                {showNotification &&
                                    <ul className="list-group list-group-light"
                                        style={{ position: 'absolute', marginTop: '25px', zIndex: 1, marginLeft: '-330px' }}
                                    >
                                        {
                                            notifications.map((notification, index) => {
                                                return (
                                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            <img
                                                                src={"http://localhost:8000/" + notification.userComment.img}
                                                                alt=""
                                                                style={{ width: 45, height: 45 }}
                                                                className="rounded-circle"
                                                            />
                                                            <Link href={"post/" + notification.post_id}>
                                                                <div className="ms-3">
                                                                    <p className="fw-bold mb-1">{notification.userComment.name}</p>
                                                                    <p className="text-muted mb-0">{notification.userComment.name} commented on your post: {notification.content}</p>
                                                                </div>
                                                            </Link>

                                                        </div>
                                                        {/* <span className="badge rounded-pill badge-success">Active</span> */}
                                                    </li>
                                                )
                                            })
                                        }


                                    </ul>

                                }

                            </div>
                            {/* Avatar */}
                            <div className="dropdown">
                                <a
                                    className="dropdown-toggle d-flex align-items-center hidden-arrow"
                                    href="#"
                                    id="navbarDropdownMenuAvatar"
                                    role="button"
                                    data-mdb-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <img
                                        src={"http://localhost:8000/" + user.img}
                                        className="rounded-circle"
                                        height={25}
                                        alt="Black and White Portrait of a Man"
                                        loading="lazy"
                                    />
                                </a>
                                <ul
                                    className="dropdown-menu dropdown-menu-end"
                                    aria-labelledby="navbarDropdownMenuAvatar"
                                >
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            My profile
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Settings
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* Right elements */}
                    </div>
                    {/* Collapsible wrapper */}
                </div>
                {/* Container wrapper */}
            </nav>
            {/* Navbar */}

        </>

    )
}
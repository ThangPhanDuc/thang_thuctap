"use client";

import { useState, useEffect } from "react";
import axios from "../app/api/axios";
import Pusher from "pusher-js";
import { useRouter } from 'next/navigation';
import { changeSearchKeyword } from "@/redux/features/searchSlice";
import { setUser } from "@/redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import 'bootstrap/dist/css/bootstrap.css';
import Link from 'next/link'

import CommentNotification from "./notifications/CommentNotification";
import FriendRequestNotification from "./notifications/FriendRequestNotification";
import LikeNotification from "./notifications/LikeNotification";

export default function Header(props) {

    const [notifications, setNotifications] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [notificationCount, setNotificationCount] = useState(0)

    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.userReducer.value);

    // useEffect(() => {
    //     Pusher.logToConsole = true;

    //     var pusher = new Pusher('0699e48d294babf98468', {
    //         cluster: 'ap1'
    //     });

    //     var channel = pusher.subscribe('comment.' + user.id);
    //     channel.bind('new-comment', function (data) {
    //         // alert(data.userComment.name + "commented on your post: " + data.content);
    //         setNotifications(prevNotifications => [...prevNotifications, data]);
    //     });

    //     var channel = pusher.subscribe('chat.' + user.id);
    //     channel.bind('message', function (data) {
    //         setMessages(prevMessages => [...prevMessages, data]);
    //     });

    // }, [user.id]);

    useEffect(() => {
        Pusher.logToConsole = true;

        var pusher = new Pusher('0699e48d294babf98468', {
            cluster: 'ap1'
        });

        var channel = pusher.subscribe('notification.' + user.id);
        channel.bind('new-notification', function (data) {
            setNotifications(prevNotifications => [...prevNotifications, data]);
            setNotificationCount(notificationCount + 1);
        });

    }, [user.id]);

    useEffect(() => {
        getUser();
        getNotification();
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
            dispatch(setUser(userInfo))
        } catch (error) {
            console.error(error);
        }
    };

    const getNotification = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        try {
            const response = await axios.get('/getNotification', config);
            setNotifications(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const router = useRouter();
    const handSearch = (event) => {
        event.preventDefault();
        dispatch(changeSearchKeyword(searchKeyword))
        router.push('/search');
    }


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light shadow p-3 mb-5 bg-white rounded"
                style={{
                    position: 'fixed',
                    top: 0, left: 0, width: '100%', zIndex: 100, height: '65px', justifyContent: 'center'
                }}>
                <div className="container-fluid justify-content-between ">
                    {/* Left elements */}
                    <div className="d-flex">
                        {/* Brand */}
                        <a
                            className="navbar-brand me-2 mb-1 d-flex align-items-center"
                            href="#"
                        >
                            <img
                                src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                                height={20}
                                alt="MDB Logo"
                                loading="lazy"
                            // style={{ marginTop: 2 }}
                            />
                        </a>
                        {/* Search form */}
                        <form

                            className="input-group w-auto my-auto d-none d-sm-flex">
                            <input
                                onChange={e => setSearchKeyword(e.target.value)}
                                value={searchKeyword}
                                autoComplete="off"
                                type="search"
                                className="form-control rounded"
                                placeholder="Search"
                                style={{ minWidth: 125 }}
                            />

                            <span onClick={handSearch} className="input-group-text border-0 d-none d-lg-flex">
                                <i className="fas fa-search" />
                            </span>


                        </form>
                    </div>
                    <ul className="navbar-nav flex-row d-none d-md-flex">
                        <li className="nav-item me-3 me-lg-1 active">
                            <Link className="nav-link" href="/home">
                                <span>
                                    <i className="fas fa-home fa-lg" />
                                </span>
                                <span className="badge rounded-pill badge-notification bg-danger">
                                    1
                                </span>
                            </Link>
                        </li>
                        <li className="nav-item me-3 me-lg-1">
                            <a className="nav-link" href="#">
                                <span>
                                    <i className="fas fa-flag fa-lg" />
                                </span>
                            </a>
                        </li>
                        <li className="nav-item me-3 me-lg-1">
                            <Link className="nav-link" href="/watch">
                                <span>
                                    <i className="fas fa-video fa-lg" />
                                </span>
                            </Link>
                        </li>
                        <li className="nav-item me-3 me-lg-1">
                            <a className="nav-link" href="#">
                                <span>
                                    <i className="fas fa-shopping-bag fa-lg" />
                                </span>
                            </a>
                        </li>
                        <li className="nav-item me-3 me-lg-1">
                            <Link className="nav-link" href="/dating">
                                <span>
                                    <i className="fas fa-users fa-lg" />
                                </span>
                                <span className="badge rounded-pill badge-notification bg-danger">
                                    2
                                </span>
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav flex-row">
                        <li className="nav-item me-3 me-lg-1">
                            <a className="nav-link d-sm-flex align-items-sm-center" href="#">
                                <img
                                    src={"http://localhost:8000/" + user.img}
                                    className="rounded-circle"
                                    height={25}
                                    width={25}
                                    alt="Black and White Portrait of a Man"
                                    loading="lazy"
                                />
                                <strong className="d-none d-sm-block ms-1">{user.name}</strong>
                            </a>
                        </li>
                        <li className="nav-item me-3 me-lg-1">
                            <a className="nav-link" href="#">
                                <span>
                                    <i className="fas fa-plus-circle fa-lg" />
                                </span>
                            </a>
                        </li>
                        <li className="nav-item dropdown me-3 me-lg-1">
                            <Link
                                className="nav-link dropdown-toggle hidden-arrow"
                                href="/chat/1"
                                id="navbarDropdownMenuLink"
                                role="button"
                                data-mdb-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i className="fas fa-comments fa-lg" />
                                <span className="badge rounded-pill badge-notification bg-danger">
                                    6
                                </span>
                            </Link>
                            <ul
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="navbarDropdownMenuLink"
                            >
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Some news
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Another news
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Something else here
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown me-3 me-lg-1">
                            <Link
                                onClick={() => {
                                    setShowNotification(!showNotification);
                                    setNotificationCount(0);
                                    getNotification();
                                }
                                }
                                className="nav-link dropdown-toggle hidden-arrow"
                                href="#"
                                id="navbarDropdownMenuLink"
                                role="button"
                                data-mdb-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i className="fas fa-bell fa-lg" />
                                <span className="badge rounded-pill badge-notification bg-danger">
                                    {notificationCount}
                                </span>
                            </Link>
                            {showNotification && (
                                <ul
                                    className="list-group list-group-light"
                                    style={{ position: 'absolute', marginTop: '25px', zIndex: 1, marginLeft: '-330px' }}
                                >
                                    {notifications.map((notification, index) => (
                                        notification.type === "comment_notification" ? (
                                            <CommentNotification notification={notification} />
                                        ) : notification.type === "like_notification" ? (
                                            <LikeNotification notification={notification} />
                                        ) : notification.type === "friend_request_notification" ? (
                                            <FriendRequestNotification notification={notification} />
                                        ) : null
                                    ))}
                                </ul>
                            )}


                        </li>
                        <li className="nav-item dropdown me-3 me-lg-1">
                            <a
                                className="nav-link dropdown-toggle hidden-arrow"
                                href="#"
                                id="navbarDropdownMenuLink"
                                role="button"
                                data-mdb-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i className="fas fa-chevron-circle-down fa-lg" />
                            </a>
                            <ul
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="navbarDropdownMenuLink"
                            >
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Some news
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Another news
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Something else here
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
            <div style={{ height: 65, }}></div>

        </>
    )
}
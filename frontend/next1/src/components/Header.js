"use client";

import { useState, useEffect } from "react";
import axios from "../app/api/axios";
import Pusher from "pusher-js";
import { useRouter } from 'next/navigation';
import { changeSearchKeyword } from "@/redux/features/searchSlice";
import { setUser } from "@/redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function Header(props) {
    // const [user, setUser] = useState({});
    const [notifications, setNotifications] = useState([]);
    const [messages, setMessages] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [showMessages, setShowMessages] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const dispatch = useAppDispatch();

    const user = useAppSelector((state) => state.userReducer.value);

    useEffect(() => {
        Pusher.logToConsole = true;

        var pusher = new Pusher('0699e48d294babf98468', {
            cluster: 'ap1'
        });

        var channel = pusher.subscribe('comment.' + user.id);
        channel.bind('new-comment', function (data) {
            // alert(data.userComment.name + "commented on your post: " + data.content);
            setNotifications(prevNotifications => [...prevNotifications, data]);
        });

        var channel = pusher.subscribe('chat.' + user.id);
        channel.bind('message', function (data) {
            setMessages(prevMessages => [...prevMessages, data]);
        });

    }, [user.id]);

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
            // setUser(userInfo);
            dispatch(setUser(userInfo))
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
            <nav className="navbar navbar-expand-lg navbar-light bg-light ">
                <div className="container-fluid justify-content-between bg-primary">
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
                                style={{ marginTop: 2 }}
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
                    {/* Left elements */}
                    {/* Center elements */}
                    <ul className="navbar-nav flex-row d-none d-md-flex">
                        <li className="nav-item me-3 me-lg-1 active">
                            <a className="nav-link" href="#">
                                <span>
                                    <i className="fas fa-home fa-lg" />
                                </span>
                                <span className="badge rounded-pill badge-notification bg-danger">
                                    1
                                </span>
                            </a>
                        </li>
                        <li className="nav-item me-3 me-lg-1">
                            <a className="nav-link" href="#">
                                <span>
                                    <i className="fas fa-flag fa-lg" />
                                </span>
                            </a>
                        </li>
                        <li className="nav-item me-3 me-lg-1">
                            <a className="nav-link" href="#">
                                <span>
                                    <i className="fas fa-video fa-lg" />
                                </span>
                            </a>
                        </li>
                        <li className="nav-item me-3 me-lg-1">
                            <a className="nav-link" href="#">
                                <span>
                                    <i className="fas fa-shopping-bag fa-lg" />
                                </span>
                            </a>
                        </li>
                        <li className="nav-item me-3 me-lg-1">
                            <a className="nav-link" href="#">
                                <span>
                                    <i className="fas fa-users fa-lg" />
                                </span>
                                <span className="badge rounded-pill badge-notification bg-danger">
                                    2
                                </span>
                            </a>
                        </li>
                    </ul>
                    {/* Center elements */}
                    {/* Right elements */}
                    <ul className="navbar-nav flex-row">
                        <li className="nav-item me-3 me-lg-1">
                            <a className="nav-link d-sm-flex align-items-sm-center" href="#">
                                <img
                                    src={"http://localhost:8000/" + user.img}
                                    className="rounded-circle"
                                    height={22}
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
                            <a
                                className="nav-link dropdown-toggle hidden-arrow"
                                href="#"
                                id="navbarDropdownMenuLink"
                                role="button"
                                data-mdb-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i className="fas fa-comments fa-lg" />
                                <span className="badge rounded-pill badge-notification bg-danger">
                                    6
                                </span>
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
                        <li className="nav-item dropdown me-3 me-lg-1">
                            <a
                                className="nav-link dropdown-toggle hidden-arrow"
                                href="#"
                                id="navbarDropdownMenuLink"
                                role="button"
                                data-mdb-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i className="fas fa-bell fa-lg" />
                                <span className="badge rounded-pill badge-notification bg-danger">
                                    12
                                </span>
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
                    {/* Right elements */}
                </div>
            </nav>
            {/* Navbar */}
        </>


        // <>
        //     {/* Navbar */}
        //     <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-header mt-3" style={{ height: '60px' }}>
        //         {/* Container wrapper */}
        //         <div className="container-fluid">
        //             {/* Navbar brand */}
        //             <a className="navbar-brand mt-2 mt-lg-0" href="#">
        //                 <h5 className="pt-1">MDB</h5>
        //             </a>
        //             {/* Toggle button */}
        //             <button
        //                 className="navbar-toggler"
        //                 type="button"
        //                 data-mdb-toggle="collapse"
        //                 data-mdb-target="#navbarSupportedContent"
        //                 aria-controls="navbarSupportedContent"
        //                 aria-expanded="false"
        //                 aria-label="Toggle navigation"
        //             >
        //                 <i className="fas fa-bars" />
        //             </button>
        //             <form
        //                 className="d-flex mx-2">
        //                 <input
        //                     onChange={e => setSearchKeyword(e.target.value)}
        //                     className="form-control me-2"
        //                     type="search"
        //                     placeholder="Search"
        //                     aria-label="Search"
        //                     value={searchKeyword}
        //                 />
        //                 <button className="btn btn-outline-light" type="submit">
        //                     <i className="fas fa-search" />
        //                 </button>
        //             </form>
        //             {/* Collapsible wrapper */}
        //             <div className="collapse navbar-collapse" id="navbarSupportedContent">
        //                 {/* Left links */}
        //                 <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        //                     <li className="nav-item">
        //                         <a className="nav-link" href="#">
        //                             Dashboard
        //                         </a>
        //                     </li>
        //                     <li className="nav-item">
        //                         <a className="nav-link" href="#">
        //                             Team
        //                         </a>
        //                     </li>
        //                     <li className="nav-item">
        //                         <a className="nav-link" href="#">
        //                             Projects
        //                         </a>
        //                     </li>
        //                 </ul>
        //                 <div className="d-flex align-items-center justify-content-start">
        //                     <div className="dropdown">
        //                         <Link
        //                             onClick={() => setShowMessages(!showMessages)}
        //                             className="text-reset me-3 dropdown-toggle hidden-arrow"
        //                             href="#"
        //                             id="navbarDropdownMenuLink"
        //                             role="button"
        //                             data-mdb-toggle="dropdown"
        //                             aria-expanded="false"

        //                         >
        //                             <i className="fas fa-envelope text-white" />
        //                             <span className="badge rounded-pill badge-notification bg-danger">
        //                                 {messages.length}
        //                             </span>
        //                         </Link>
        //                         {showMessages &&
        //                             // <ul className="list-group list-group-light"
        //                             //     style={{ position: 'absolute', marginTop: '25px', zIndex: 1, marginLeft: '-330px' }}
        //                             // >
        //                             //     {
        //                             //         messages.map((notification, index) => {
        //                             //             return (
        //                             //                 <li className="list-group-item d-flex justify-content-between align-items-center">
        //                             //                     <div className="d-flex align-items-center">
        //                             //                         <img
        //                             //                             src={"http://localhost:8000/" + notification.userComment.img}
        //                             //                             alt=""
        //                             //                             style={{ width: 45, height: 45 }}
        //                             //                             className="rounded-circle"
        //                             //                         />
        //                             //                         <Link href={"post/" + notification.post_id}>
        //                             //                             <div className="ms-3">
        //                             //                                 <p className="fw-bold mb-1">{notification.userComment.name}</p>
        //                             //                                 <p className="text-muted mb-0">{notification.userComment.name} commented on your post: {notification.content}</p>
        //                             //                             </div>
        //                             //                         </Link>

        //                             //                     </div>
        //                             //                     {/* <span className="badge rounded-pill badge-success">Active</span> */}
        //                             //                 </li>
        //                             //             )
        //                             //         })
        //                             //     }


        //                             // </ul>
        //                             <></>
        //                         }

        //                     </div>
        //                     {/* Notifications */}
        //                     <div className="dropdown">
        //                         <Link
        //                             onClick={() => setShowNotification(!showNotification)}
        //                             className="text-reset me-3 dropdown-toggle hidden-arrow"
        //                             href="#"
        //                             id="navbarDropdownMenuLink"
        //                             role="button"
        //                             data-mdb-toggle="dropdown"
        //                             aria-expanded="false"

        //                         >
        //                             <i className="fas fa-bell text-white" />
        //                             <span className="badge rounded-pill badge-notification bg-danger">
        //                                 {notifications.length}
        //                             </span>
        //                         </Link>
        //                         {showNotification &&
        //                             <ul className="list-group list-group-light"
        //                                 style={{ position: 'absolute', marginTop: '25px', zIndex: 1, marginLeft: '-330px' }}
        //                             >
        //                                 {
        //                                     notifications.map((notification, index) => {
        //                                         return (
        //                                             <li className="list-group-item d-flex justify-content-between align-items-center">
        //                                                 <div className="d-flex align-items-center">
        //                                                     <img
        //                                                         src={"http://localhost:8000/" + notification.userComment.img}
        //                                                         alt=""
        //                                                         style={{ width: 45, height: 45 }}
        //                                                         className="rounded-circle"
        //                                                     />
        //                                                     <Link href={"post/" + notification.post_id}>
        //                                                         <div className="ms-3">
        //                                                             <p className="fw-bold mb-1">{notification.userComment.name}</p>
        //                                                             <p className="text-muted mb-0">{notification.userComment.name} commented on your post: {notification.content}</p>
        //                                                         </div>
        //                                                     </Link>

        //                                                 </div>
        //                                                 {/* <span className="badge rounded-pill badge-success">Active</span> */}
        //                                             </li>
        //                                         )
        //                                     })
        //                                 }


        //                             </ul>

        //                         }

        //                     </div>
        //                     {/* Avatar */}
        //                     <div className="dropdown">
        //                         <a
        //                             className="dropdown-toggle d-flex align-items-center hidden-arrow"
        //                             href="#"
        //                             id="navbarDropdownMenuAvatar"
        //                             role="button"
        //                             data-mdb-toggle="dropdown"
        //                             aria-expanded="false"
        //                         >
        //                             <img
        //                                 src={"http://localhost:8000/" + user.img}
        //                                 className="rounded-circle"
        //                                 height={25}
        //                                 alt="Black and White Portrait of a Man"
        //                                 loading="lazy"
        //                             />
        //                         </a>
        //                         <ul
        //                             className="dropdown-menu dropdown-menu-end"
        //                             aria-labelledby="navbarDropdownMenuAvatar"
        //                         >
        //                             <li>
        //                                 <a className="dropdown-item" href="#">
        //                                     My profile
        //                                 </a>
        //                             </li>
        //                             <li>
        //                                 <a className="dropdown-item" href="#">
        //                                     Settings
        //                                 </a>
        //                             </li>
        //                             <li>
        //                                 <a className="dropdown-item" href="#">
        //                                     Logout
        //                                 </a>
        //                             </li>
        //                         </ul>
        //                     </div>
        //                 </div>
        //                 {/* Right elements */}
        //             </div>
        //             {/* Collapsible wrapper */}
        //         </div>
        //         {/* Container wrapper */}
        //     </nav>
        //     {/* Navbar */}

        // </>

    )
}
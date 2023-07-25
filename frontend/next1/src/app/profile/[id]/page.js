"use client";

import axios from "../../api/axios";
import { useState, useEffect } from "react";

import Header from "@/components/Header";
import PostCard from "@/components/PostCard";

import "../../../styles/Profile.css"
import 'bootstrap/dist/css/bootstrap.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import { useRouter } from 'next/navigation';
import Link from 'next/link'

export default function Profile() {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    getUser();
    getAllPost();
    // getFriendList();
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

  const getAllPost = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    try {
      const response = await axios.get('/getAllPost', config);
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // const getFriendList = async () => {
  //   const token = localStorage.getItem('token');
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   };
  //   try {
  //     const response = await axios.get('/getFriendList', config);
  //     setFriends(response.data.friends);
  //     console.log(response.data.friends);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const getUpdatedPost = () => {
    getAllPost();
  }


  return (
    <>
      <Header />
      <div className="container">
        <div className="profile-page tx-13">
          <div className="row">
            <div className="col-12 grid-margin">
              <div className="profile-header">
                <div className="cover">
                  <div className="gray-shade" />
                  <figure>
                    <img
                      src="https://bootdey.com/img/Content/bg1.jpg"
                      className="img-fluid"
                      alt="profile cover"
                    />
                  </figure>
                  <div className="cover-body d-flex justify-content-between align-items-center">
                    <div>
                      <img
                        className="profile-pic"
                        src="https://bootdey.com/img/Content/avatar/avatar6.png"
                        alt="profile"
                      />
                      <span className="profile-name">{user.name}</span>
                    </div>
                    <div className="d-none d-md-block">
                      <button className="btn btn-primary btn-icon-text btn-edit-profile">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-edit btn-icon-prepend"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>{" "}
                        Edit profile
                      </button>
                    </div>
                  </div>
                </div>
                <div className="header-links">
                  <ul className="links d-flex align-items-center mt-3 mt-md-0">
                    <li className="header-link-item d-flex align-items-center active">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-columns mr-1 icon-md"
                      >
                        <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18" />
                      </svg>
                      <a className="pt-1px d-none d-md-block" href="#">
                        Timeline
                      </a>
                    </li>
                    <li className="header-link-item ml-3 pl-3 border-left d-flex align-items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-user mr-1 icon-md"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx={12} cy={7} r={4} />
                      </svg>
                      <a className="pt-1px d-none d-md-block" href="#">
                        About
                      </a>
                    </li>
                    <li className="header-link-item ml-3 pl-3 border-left d-flex align-items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-users mr-1 icon-md"
                      >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx={9} cy={7} r={4} />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      <a className="pt-1px d-none d-md-block" href="#">
                        Friends <span className="text-muted tx-12">3,765</span>
                      </a>
                    </li>
                    <li className="header-link-item ml-3 pl-3 border-left d-flex align-items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-image mr-1 icon-md"
                      >
                        <rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <a className="pt-1px d-none d-md-block" href="#">
                        Photos
                      </a>
                    </li>
                    <li className="header-link-item ml-3 pl-3 border-left d-flex align-items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-video mr-1 icon-md"
                      >
                        <polygon points="23 7 16 12 23 17 23 7" />
                        <rect x={1} y={5} width={15} height={14} rx={2} ry={2} />
                      </svg>
                      <a className="pt-1px d-none d-md-block" href="#">
                        Videos
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row profile-body">
            {/* left wrapper start */}
            <div className="d-none d-md-block col-md-4 col-xl-3 left-wrapper">
              <div className="card rounded">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h6 className="card-title mb-0">About</h6>
                    <div className="dropdown">
                      <button
                        className="btn p-0"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-more-horizontal icon-lg text-muted pb-3px"
                        >
                          <circle cx={12} cy={12} r={1} />
                          <circle cx={19} cy={12} r={1} />
                          <circle cx={5} cy={12} r={1} />
                        </svg>
                      </button>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <a
                          className="dropdown-item d-flex align-items-center"
                          href="#"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-edit-2 icon-sm mr-2"
                          >
                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                          </svg>{" "}
                          <span className="">Edit</span>
                        </a>
                        <a
                          className="dropdown-item d-flex align-items-center"
                          href="#"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-git-branch icon-sm mr-2"
                          >
                            <line x1={6} y1={3} x2={6} y2={15} />
                            <circle cx={18} cy={6} r={3} />
                            <circle cx={6} cy={18} r={3} />
                            <path d="M18 9a9 9 0 0 1-9 9" />
                          </svg>{" "}
                          <span className="">Update</span>
                        </a>
                        <a
                          className="dropdown-item d-flex align-items-center"
                          href="#"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-eye icon-sm mr-2"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx={12} cy={12} r={3} />
                          </svg>{" "}
                          <span className="">View all</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <p>
                    {user.profile}
                  </p>
                  <div className="mt-3">
                    <label className="tx-11 font-weight-bold mb-0 text-uppercase">
                      Joined:
                    </label>
                    <p className="text-muted">{user.create_at}</p>
                  </div>
                  <div className="mt-3">
                    <label className="tx-11 font-weight-bold mb-0 text-uppercase">
                      Lives:
                    </label>
                    <p className="text-muted">{user.address}</p>
                  </div>
                  <div className="mt-3">
                    <label className="tx-11 font-weight-bold mb-0 text-uppercase">
                      Email:
                    </label>
                    <p className="text-muted">{user.email}</p>
                  </div>
                  <div className="mt-3">
                    <label className="tx-11 font-weight-bold mb-0 text-uppercase">
                      Phone:
                    </label>
                    <p className="text-muted">{user.phone}</p>
                  </div>
                  <div className="mt-3 d-flex social-links">
                    <a
                      href="javascript:;"
                      className="btn d-flex align-items-center justify-content-center border mr-2 btn-icon github"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-github"
                        data-toggle="tooltip"
                        title=""
                        data-original-title="github.com/nobleui"
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                    </a>
                    <a
                      href="javascript:;"
                      className="btn d-flex align-items-center justify-content-center border mr-2 btn-icon twitter"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-twitter"
                        data-toggle="tooltip"
                        title=""
                        data-original-title="twitter.com/nobleui"
                      >
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                      </svg>
                    </a>
                    <a
                      href="javascript:;"
                      className="btn d-flex align-items-center justify-content-center border mr-2 btn-icon instagram"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-instagram"
                        data-toggle="tooltip"
                        title=""
                        data-original-title="instagram.com/nobleui"
                      >
                        <rect x={2} y={2} width={20} height={20} rx={5} ry={5} />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* left wrapper end */}
            {/* middle wrapper start */}
            <div className="col-md-6 col-xl-6 middle-wrapper">
              <div className="row">

                {posts.map((post, index) => {
                  return (
                    <PostCard key={index}
                      post={post}
                      user={user}
                       getUpdatedPost={getUpdatedPost()} />
                  )
                })}

              </div>
            </div>
            {/* middle wrapper end */}
            {/* right wrapper start */}
            <div className="d-none d-xl-block col-xl-3 right-wrapper">
              <div className="row">
                <div className="col-md-12 grid-margin">
                  <div className="card rounded">
                    <div className="card-body">
                      <h6 className="card-title">latest photos</h6>
                      <div className="latest-photos">
                        <div className="row">
                          <div className="col-md-4">
                            <figure>
                              <img
                                className="img-fluid"
                                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                alt=""
                              />
                            </figure>
                          </div>
                          <div className="col-md-4">
                            <figure>
                              <img
                                className="img-fluid"
                                src="https://bootdey.com/img/Content/avatar/avatar2.png"
                                alt=""
                              />
                            </figure>
                          </div>
                          <div className="col-md-4">
                            <figure>
                              <img
                                className="img-fluid"
                                src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                alt=""
                              />
                            </figure>
                          </div>
                          <div className="col-md-4">
                            <figure>
                              <img
                                className="img-fluid"
                                src="https://bootdey.com/img/Content/avatar/avatar4.png"
                                alt=""
                              />
                            </figure>
                          </div>
                          <div className="col-md-4">
                            <figure>
                              <img
                                className="img-fluid"
                                src="https://bootdey.com/img/Content/avatar/avatar5.png"
                                alt=""
                              />
                            </figure>
                          </div>
                          <div className="col-md-4">
                            <figure>
                              <img
                                className="img-fluid"
                                src="https://bootdey.com/img/Content/avatar/avatar6.png"
                                alt=""
                              />
                            </figure>
                          </div>
                          <div className="col-md-4">
                            <figure className="mb-0">
                              <img
                                className="img-fluid"
                                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                alt=""
                              />
                            </figure>
                          </div>
                          <div className="col-md-4">
                            <figure className="mb-0">
                              <img
                                className="img-fluid"
                                src="https://bootdey.com/img/Content/avatar/avatar8.png"
                                alt=""
                              />
                            </figure>
                          </div>
                          <div className="col-md-4">
                            <figure className="mb-0">
                              <img
                                className="img-fluid"
                                src="https://bootdey.com/img/Content/avatar/avatar9.png"
                                alt=""
                              />
                            </figure>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 grid-margin">
                  <div className="card rounded">
                    <div className="card-body">
                      <h6 className="card-title">suggestions for you</h6>
                      <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                        <div className="d-flex align-items-center hover-pointer">
                          <img
                            className="img-xs rounded-circle"
                            src="https://bootdey.com/img/Content/avatar/avatar2.png"
                            alt=""
                          />
                          <div className="ml-2">
                            <p>Mike Popescu</p>
                            <p className="tx-11 text-muted">12 Mutual Friends</p>
                          </div>
                        </div>
                        <button className="btn btn-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-user-plus"
                            data-toggle="tooltip"
                            title=""
                            data-original-title="Connect"
                          >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="8.5" cy={7} r={4} />
                            <line x1={20} y1={8} x2={20} y2={14} />
                            <line x1={23} y1={11} x2={17} y2={11} />
                          </svg>
                        </button>
                      </div>
                      <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                        <div className="d-flex align-items-center hover-pointer">
                          <img
                            className="img-xs rounded-circle"
                            src="https://bootdey.com/img/Content/avatar/avatar3.png"
                            alt=""
                          />
                          <div className="ml-2">
                            <p>Mike Popescu</p>
                            <p className="tx-11 text-muted">12 Mutual Friends</p>
                          </div>
                        </div>
                        <button className="btn btn-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-user-plus"
                            data-toggle="tooltip"
                            title=""
                            data-original-title="Connect"
                          >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="8.5" cy={7} r={4} />
                            <line x1={20} y1={8} x2={20} y2={14} />
                            <line x1={23} y1={11} x2={17} y2={11} />
                          </svg>
                        </button>
                      </div>
                      <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                        <div className="d-flex align-items-center hover-pointer">
                          <img
                            className="img-xs rounded-circle"
                            src="https://bootdey.com/img/Content/avatar/avatar4.png"
                            alt=""
                          />
                          <div className="ml-2">
                            <p>Mike Popescu</p>
                            <p className="tx-11 text-muted">12 Mutual Friends</p>
                          </div>
                        </div>
                        <button className="btn btn-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-user-plus"
                            data-toggle="tooltip"
                            title=""
                            data-original-title="Connect"
                          >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="8.5" cy={7} r={4} />
                            <line x1={20} y1={8} x2={20} y2={14} />
                            <line x1={23} y1={11} x2={17} y2={11} />
                          </svg>
                        </button>
                      </div>
                      <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                        <div className="d-flex align-items-center hover-pointer">
                          <img
                            className="img-xs rounded-circle"
                            src="https://bootdey.com/img/Content/avatar/avatar5.png"
                            alt=""
                          />
                          <div className="ml-2">
                            <p>Mike Popescu</p>
                            <p className="tx-11 text-muted">12 Mutual Friends</p>
                          </div>
                        </div>
                        <button className="btn btn-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-user-plus"
                            data-toggle="tooltip"
                            title=""
                            data-original-title="Connect"
                          >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="8.5" cy={7} r={4} />
                            <line x1={20} y1={8} x2={20} y2={14} />
                            <line x1={23} y1={11} x2={17} y2={11} />
                          </svg>
                        </button>
                      </div>
                      <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                        <div className="d-flex align-items-center hover-pointer">
                          <img
                            className="img-xs rounded-circle"
                            src="https://bootdey.com/img/Content/avatar/avatar6.png"
                            alt=""
                          />
                          <div className="ml-2">
                            <p>Mike Popescu</p>
                            <p className="tx-11 text-muted">12 Mutual Friends</p>
                          </div>
                        </div>
                        <button className="btn btn-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-user-plus"
                            data-toggle="tooltip"
                            title=""
                            data-original-title="Connect"
                          >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="8.5" cy={7} r={4} />
                            <line x1={20} y1={8} x2={20} y2={14} />
                            <line x1={23} y1={11} x2={17} y2={11} />
                          </svg>
                        </button>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center hover-pointer">
                          <img
                            className="img-xs rounded-circle"
                            src="https://bootdey.com/img/Content/avatar/avatar7.png"
                            alt=""
                          />
                          <div className="ml-2">
                            <p>Mike Popescu</p>
                            <p className="tx-11 text-muted">12 Mutual Friends</p>
                          </div>
                        </div>
                        <button className="btn btn-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-user-plus"
                            data-toggle="tooltip"
                            title=""
                            data-original-title="Connect"
                          >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="8.5" cy={7} r={4} />
                            <line x1={20} y1={8} x2={20} y2={14} />
                            <line x1={23} y1={11} x2={17} y2={11} />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* right wrapper end */}
          </div>
        </div>
      </div>
    </>


  )
}
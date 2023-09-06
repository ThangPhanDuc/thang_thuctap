"use client";

import axios from "../api/axios";
import { useState, useEffect } from "react";
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";

import 'bootstrap/dist/css/bootstrap.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Group() {

    return (
        <>
            <>
                <Header />
                <div className="container gedf-wrapper mt-3">
                    <div className="row">
                        <div className="col-md-3">
                            <div>
                                <div className="d-flex text-center justify-content-between">
                                    <h3 className="fw-bolder">Groups</h3>
                                    <i

                                        className="fa-solid fa-gear" style={{ fontSize: "20px", float: "right" }}></i>
                                </div>

                                <div className="input-group rounded">

                                    <span
                                        //  onClick={searchVideo} 
                                        className="input-group-text border-0" id="search-addon">
                                        <i className="fas fa-search" />
                                    </span>
                                    <input
                                        // onChange={(e) => setKeyword(e.target.value)}
                                        // value={keyword}
                                        type="search"
                                        className="form-control rounded"
                                        placeholder="Search groups"
                                        aria-label="Search"
                                        aria-describedby="search-addon"
                                    />

                                </div>
                            </div>


                            <div>
                                <div className="list-group list-group-light mt-2">
                                    <Link href="/" className="list-group-home list-group-item list-group-item-action px-3 border-0">
                                        <span>
                                            <i className="fas fa-lg fa-newspaper" />
                                        </span>  Your feed
                                    </Link>
                                    <Link href="#" className="list-group-home list-group-item list-group-item-action px-3 border-0 ripple">
                                        <span>
                                            <i className="fas fa-lg fa-compass" />
                                        </span> Discover
                                    </Link>
                                    <Link href="#" className="list-group-home list-group-item list-group-item-action px-3 border-0 ripple">
                                        <span>
                                            <i className="fas fa-users fa-lg" />
                                        </span> Your groups
                                    </Link>
                                </div>
                                <button type="button" className="btn btn-secondary w-100 font-weight-bold">+ Create New Group</button>
                                <hr></hr>
                            </div>
                            <div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="fw-bolder">Groups you manage</h5>

                                </div>
                                <div>
                                    <ul className="list-group list-group-light">
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center">
                                                <img
                                                    src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                                                    alt=""
                                                    style={{ width: 45, height: 45 }}
                                                    // className="rounded-circle"
                                                    className="rounded-3"
                                                />
                                                <div className="ms-3">
                                                    <p className="fw-bold mb-1">John Doe</p>
                                                    <p className="text-muted mb-0">john.doe@gmail.com</p>
                                                </div>
                                            </div>
                                            <span className="badge rounded-pill badge-success">Active</span>
                                        </li>
                                    </ul>

                                </div>
                                <hr></hr>
                            </div>

                            <div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="fw-bolder">Groups you've joined</h5>
                                    <h6 className="text-primary">See all</h6>
                                </div>
                                <div>
                                    <ul className="list-group list-group-light">
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center">
                                                <img
                                                    src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                                                    alt=""
                                                    style={{ width: 45, height: 45 }}
                                                    // className="rounded-circle"
                                                    className="rounded-3"
                                                />
                                                <div className="ms-3">
                                                    <p className="fw-bold mb-1">John Doe</p>
                                                    <p className="text-muted mb-0">john.doe@gmail.com</p>
                                                </div>
                                            </div>
                                            <span className="badge rounded-pill badge-success">Active</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center">
                                                <img
                                                    src="https://mdbootstrap.com/img/new/avatars/6.jpg"
                                                    className="rounded-circle"
                                                    alt=""
                                                    style={{ width: 45, height: 45 }}
                                                />
                                                <div className="ms-3">
                                                    <p className="fw-bold mb-1">Alex Ray</p>
                                                    <p className="text-muted mb-0">alex.ray@gmail.com</p>
                                                </div>
                                            </div>
                                            <span className="badge rounded-pill badge-primary">Onboarding</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center">
                                                <img
                                                    src="https://mdbootstrap.com/img/new/avatars/7.jpg"
                                                    className="rounded-circle"
                                                    alt=""
                                                    style={{ width: 45, height: 45 }}
                                                />
                                                <div className="ms-3">
                                                    <p className="fw-bold mb-1">Kate Hunington</p>
                                                    <p className="text-muted mb-0">kate.hunington@gmail.com</p>
                                                </div>
                                            </div>
                                            <span className="badge rounded-pill badge-warning">Awaiting</span>
                                        </li>
                                    </ul>

                                </div>
                            </div>

                        </div>
                        <div className="col-md-9 gedf-main " >
                            <p className="fw-bolder">Recent activity</p>


                        </div>

                    </div>
                </div>
            </>
        </>
    )
}
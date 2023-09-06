"use client";

import axios from "../../api/axios";
import { useState, useEffect } from "react";
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import Header from "@/components/Header";


import 'bootstrap/dist/css/bootstrap.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function GroupCreate() {

    return (

        <>
            <Header />
            <div className="container gedf-wrapper mt-3">
                <div className="row">
                    <div className="col-md-3">
                        <div>
                            <p>Groups › Create group</p>
                            <div className="d-flex text-center justify-content-between">

                                <h3 className="fw-bolder">Create Group</h3>
                                <i

                                    className="fa-solid fa-gear" style={{ fontSize: "20px", float: "right" }}></i>
                            </div>

                            <div className="list-group-item d-flex justify-content-between align-items-center mt-3">
                                <div className="d-flex align-items-center">
                                    <img
                                        src="https://mdbootstrap.com/img/new/avatars/6.jpg"
                                        className="rounded-circle"
                                        alt=""
                                        style={{ width: 45, height: 45 }}
                                    />
                                    <div className="ms-3">
                                        <p className="fw-bold mb-1">Alex Ray</p>
                                        <p className="text-muted mb-0">admin</p>
                                    </div>
                                </div>

                            </div>
                            <form>
                                <div className="form-outline border border-secondary rounded-2 mt-3">
                                    <input
                                        type="text"
                                        id="formControlLg"
                                        className="form-control form-control-lg"
                                    />
                                    <label className="form-label" htmlFor="formControlLg">
                                        Group Name
                                    </label>
                                </div>

                                <div className="form-outline border border-secondary rounded-2 mt-3">
                                    <select
                                        className="form-select"
                                        aria-label="Disabled select example"
                                        disabled=""
                                    >
                                        <option selected="">Choose Privacy</option>
                                        <option value={1}>Public</option>
                                        <option value={2}>Private</option>

                                    </select>

                                </div>

                                <div className="form-outline border border-secondary rounded-2 mt-3">
                                    <select
                                        // multiple
                                        className="form-select"
                                        aria-label="Disabled select example"
                                        disabled=""
                                    >
                                        <option selected="">Open this select menu</option>
                                        <option value={1}>One</option>
                                        <option value={2}>Two</option>
                                        <option value={3}>Three</option>
                                    </select>
                                </div>



                                <button type="button" className="btn btn-primary w-100 mt-3">Create</button>
                            </form>
                        </div>





                    </div>
                    <div className="col-md-9 gedf-main " >
                        <p className="fw-bolder">Recent activity</p>


                    </div>

                </div>
            </div>
        </>

    )
}
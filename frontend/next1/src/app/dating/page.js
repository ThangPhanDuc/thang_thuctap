"use client";

import Header from "@/components/Header";
import { useState } from "react";
import "../../styles/Dating.css"
import MatchProfile from "@/components/dating/MatchProfile";
import DatingSettings from "@/components/dating/DatingSettings";
import LikedYou from "@/components/dating/LikedYou";
import DatingProfile from "@/components/dating/DatingProfile";

import 'bootstrap/dist/css/bootstrap.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from "@/redux/hooks";


export default function Dating() {
    const [selectedTab, setSelectedTab] = useState("MatchProfile");
    const user = useAppSelector((state) => state.userReducer.value);
    const [showDatingSetting, setShowDatingSetting] = useState(false)

    return (
        <>
            <Header />
            <div className="container gedf-wrapper">
                <div className="row">
                    <div className="col-md-3">
                        <div className="card">
                            {/* <Link href={"profile/" + user.id}>
                                <div className="card-body">
                                    <img
                                        alt="image"
                                        src={"http://localhost:8000/" + user.img}
                                    />
                                    <div className="h5">{user.name}</div>
                                    <div className="h7 text-muted">Email : {user.email}</div>
                                    <div className="h7">
                                        {user.profile}
                                    </div>
                                </div>
                            </Link> */}

                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <div className="h6 text-muted">Followers</div>
                                    <div className="h5">4</div>
                                </li>
                                <li className="list-group-item">
                                    <div className="h6 text-muted">Following</div>
                                    <div className="h5">3</div>
                                </li>
                                <li className="list-group-item">Vestibulum at eros</li>
                            </ul>
                        </div>
                        <div className="list-group list-group-light ">
                            <Link
                                href="/friends"
                                className="list-group-home list-group-item list-group-item-action px-3 border-0  ripple "
                            >
                                Friends
                            </Link>
                            <a
                                href="#"
                                className=" list-group-home list-group-item list-group-item-action px-3 border-0 ripple "
                            >
                                Video
                            </a>
                            <a
                                href="#"
                                className="list-group-home list-group-item list-group-item-action px-3 border-0 ripple"
                            >
                                Feeds
                            </a>
                            <a
                                href="#"
                                className="list-group-home list-group-item list-group-item-action px-3 border-0 ripple"
                            >
                                Groups
                            </a>
                            <Link
                                href="/dating"
                                className="list-group-home list-group-item list-group-item-action px-3 border-0  ripple "
                            >
                                Dating
                            </Link>
                            <Link
                                href="/dating"
                                className="list-group-home list-group-item list-group-item-action px-3 border-0  ripple "
                            >
                                Liked You
                            </Link>
                        </div>

                    </div>
                    <div className="col-md-6 gedf-main " >
                        <h1 className="text-center">Dating</h1>
                        <MatchProfile />
                    </div>
                    <div className="col-md-3">
                        <i
                            onClick={() => setShowDatingSetting(!showDatingSetting)}
                            className="fa-solid fa-gear" style={{ fontSize: "20px", float: "right" }}></i>
                        {
                            showDatingSetting && <DatingSettings />
                        }

                        {/* <LikedYou /> */}

                    </div>
                </div>
            </div>

            {/* <section className="" style={{ backgroundColor: "#eee" }}>
                <div className="container h-10 pt-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-12 col-xl-6">
                            <div className="d-flex justify-content-between">
                                <i onClick={() => setSelectedTab("MatchProfile")} className="fa-solid fa-angle-left" style={{ fontSize: "20px" }}></i>
                                <p className="fw-bold" style={{ fontSize: "16px" }}>
                                    {
                                        selectedTab === "MatchProfile" ? (
                                            "Dating"
                                        ) : selectedTab === "DatingSetting" ? (
                                            "Setting"
                                        ) : selectedTab === "LikedYou" ? (
                                            "Liked You"
                                        ) : selectedTab === "DatingProfile" ? (
                                            "Dating Profile"
                                        ) : null
                                    }
                                </p>
                                <i onClick={() => setSelectedTab("DatingSetting")} className="fa-solid fa-gear" style={{ fontSize: "20px" }}></i>
                            </div>

                            {
                                selectedTab === "MatchProfile" ? (
                                    <MatchProfile setSelectedTab={setSelectedTab} />
                                ) : selectedTab === "DatingSetting" ? (
                                    <DatingSettings />
                                ) : selectedTab === "LikedYou" ? (
                                    <LikedYou />
                                ) : selectedTab === "DatingProfile" ? (
                                    <DatingProfile />
                                ) : null
                            }
                        </div>
                    </div>
                </div>
            </section> */}


        </>
    )
}
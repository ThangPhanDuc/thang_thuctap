"use client";

import Header from "@/components/Header";
import { useState } from "react";
import "../../styles/Dating.css"
import MatchProfile from "@/components/dating/MatchProfile";
import DatingSettings from "@/components/dating/DatingSettings";
import LikedYou from "@/components/dating/LikedYou";

import 'bootstrap/dist/css/bootstrap.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";



export default function Dating() {
    const [selectedTab, setSelectedTab] = useState("MatchProfile");

    return (
        <>
            <Header />
            <section className="vh-100" style={{ backgroundColor: "#eee" }}>
                <div className="container h-100">
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
                                ) : null
                            }
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}
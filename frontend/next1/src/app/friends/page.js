"use client";

import axios from "../api/axios";
import "../../styles/Friend.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Link from 'next/link'
import Header from "@/components/Header";
import FriendRequests from "@/components/FriendRequests";
import AllFriends from "@/components/AllFriends";
import { useState, useEffect } from "react";


export default function Friends() {
    const [selectedTab, setSelectedTab] = useState("Friend Requests");


    return (
        <>
            <Header />
            <div className="container bootstrap snippets bootdeys bootdey">
                <div className="row decor-default">
                    <div className="col-lg-3 col-md-4 col-sm-12">
                        <div className="list-group list-group-light ">
                            <a
                                onClick={() => setSelectedTab("Friend Requests")}
                                href="#"
                                className="list-group-home list-group-item list-group-item-action px-3 border-0  ripple "
                            >
                                Friends Request
                            </a>
                            <a
                                href="#"
                                className=" list-group-home list-group-item list-group-item-action px-3 border-0 ripple "
                            >
                                Suggestions
                            </a>
                            <a
                                onClick={() => setSelectedTab("All Friends")}
                                href="#"
                                className="list-group-home list-group-item list-group-item-action px-3 border-0 ripple"
                            >
                                All Friends
                            </a>
                            <a
                                href="#"
                                className="list-group-home list-group-item list-group-item-action px-3 border-0 ripple"
                            >
                                Birthdays
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-8 col-sm-12">
                        {
                            selectedTab === "Friend Requests" ? (
                                <FriendRequests />
                            ) : selectedTab === "All Friends" ? (
                                <AllFriends />
                            ) : null
                        }

                    </div>
                </div>
            </div>
            <link
                rel="stylesheet"
                href="http://91.234.35.26/iwiki-admin/v1.0.0/admin/css/vendors/checkboxes.css"
            />
        </>
    )
}
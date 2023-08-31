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

export default function Watch() {
    const [videos, setVideos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getVideos();
    }, [currentPage]);

    const getVideos = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        try {
            const response = await axios.get(`/getVideos?page=${currentPage}`, config);
            setVideos(response.data.data);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <>
                <Header />
                <div className="container gedf-wrapper">
                    <div className="row">
                        <div className="col-md-3">
                            <div>
                                <div>
                                    <h1>Video</h1>
                                    <i

                                        className="fa-solid fa-gear" style={{ fontSize: "20px", float: "right" }}></i>
                                </div>
                                <input type="text" placeholder="search video"></input>
                            </div>


                            <div className="list-group list-group-light ">
                                <Link
                                    href="/friends"
                                    className="list-group-home list-group-item list-group-item-action px-3 border-0  ripple "
                                >
                                    Home
                                </Link>
                                <Link
                                    href="#"
                                    className=" list-group-home list-group-item list-group-item-action px-3 border-0 ripple "
                                >
                                    Like
                                </Link>
                                <Link
                                    href="#"
                                    className="list-group-home list-group-item list-group-item-action px-3 border-0 ripple"
                                >
                                    Reels
                                </Link>
                                <Link
                                    href="#"
                                    className="list-group-home list-group-item list-group-item-action px-3 border-0 ripple"
                                >
                                    Shows
                                </Link>
                                <Link
                                    href="/dating"
                                    className="list-group-home list-group-item list-group-item-action px-3 border-0  ripple "
                                >
                                    Explore
                                </Link>
                                <Link
                                    href="/dating"
                                    className="list-group-home list-group-item list-group-item-action px-3 border-0  ripple "
                                >
                                    Saves Videos
                                </Link>
                            </div>

                        </div>
                        <div className="col-md-9 gedf-main " >


                            {videos.map((video, index) => {
                                return (
                                    <VideoCard key={index} video={video} />
                                )
                            })}
                        </div>

                    </div>
                </div>
            </>
        </>
    )
}
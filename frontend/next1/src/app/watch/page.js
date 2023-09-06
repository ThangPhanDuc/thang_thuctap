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
    const [keyword, setKeyword] = useState("");
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

    const searchVideo = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        try {
            const response = await axios.get(`/searchVideos?query=${keyword}`, config);
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
                                <div className="d-flex text-center justify-content-between">
                                    <h3 className="fw-bolder">Video</h3>
                                    <i

                                        className="fa-solid fa-gear" style={{ fontSize: "20px", float: "right" }}></i>
                                </div>

                                <div className="input-group rounded">

                                    <span onClick={searchVideo} className="input-group-text border-0" id="search-addon">
                                        <i className="fas fa-search" />
                                    </span>
                                    <input
                                        onChange={(e) => setKeyword(e.target.value)}
                                        value={keyword}
                                        type="search"
                                        className="form-control rounded"
                                        placeholder="Search"
                                        aria-label="Search"
                                        aria-describedby="search-addon"
                                    />

                                </div>



                            </div>


                            <div className="list-group list-group-light mt-2">
                                <Link href="/friends" className="list-group-home list-group-item list-group-item-action px-3 border-0">
                                    <span>
                                        <i className="fas fa-home fa-lg" />
                                    </span> Home
                                </Link>
                                <Link href="#" className="list-group-home list-group-item list-group-item-action px-3 border-0 ripple">
                                    <span>
                                        <i className="fas fa-circle fa-xs text-danger" />
                                    </span> Live
                                </Link>
                                <Link href="#" className="list-group-home list-group-item list-group-item-action px-3 border-0 ripple">
                                    <span>
                                        <i className="fas fa-video fa-lg" />
                                    </span> Reels
                                </Link>
                                <Link href="#" className="list-group-home list-group-item list-group-item-action px-3 border-0 ripple">
                                    <span>
                                        <i className="fas fa-tv fa-lg" />
                                    </span> Shows
                                </Link>
                                <Link href="/" className="list-group-home list-group-item list-group-item-action px-3 border-0 ripple">
                                    <span>
                                        <i className="fas fa-compass fa-lg" />
                                    </span> Explore
                                </Link>
                                <Link href="/" className="list-group-home list-group-item list-group-item-action px-3 border-0 ripple">
                                    <span>
                                        <i className="fas fa-save fa-lg" />
                                    </span> Saves Videos
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
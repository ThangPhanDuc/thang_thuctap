"use client";

import axios from "../../app/api/axios";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import "../../styles/Dating.css"
import Link from 'next/link'

export default function MatchProfile(props) {
    const { setSelectedTab } = props;
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(5);
    const idealMatch = useAppSelector((state) => state.idealMatchReducer.value);

    useEffect(() => {
        getDatingList();
    }, [currentPage]);

    const getDatingList = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        try {
            const response = await axios.post(`/getDatingList?page=${currentPage}`, idealMatch, config);
            setUsers(response.data.data);
            setLastPage(response.data.last_page);
        } catch (error) {
            console.error(error);
        }
    };

    const sendDateInvitation = async (receiver_id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.post('/sendDateInvitation', {
                "receiver_id": receiver_id,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            handleChangeCurrentPage(1)
        } catch (error) {
            console.log(error);
        }
    }



    const handleChangeCurrentPage = (number) => {
        setCurrentPage(prevPage => {
            let newPage = prevPage + number;
            if (newPage > lastPage) return 1;
            if (newPage < 1) return lastPage;
            return newPage
        })
    }
    return (
        <>
            {/* <div className="d-flex justify-content-around m-3">
                <div className="">
                    <div className="row">
                        <div class="col-md">
                            <button
                                onClick={() => setSelectedTab("LikedYou")}
                                type="button" className="btn btn-light btn-rounded fw-bold">LikedYou</button>
                            <span className="badge rounded-pill badge-notification bg-danger" style={{ fontSize: "10px" }}>
                                0
                            </span>
                        </div>
                        <div class="col-md">
                            <button type="button" className="btn btn-light btn-rounded fw-bold">Matches</button>
                        </div>
                        <div class="col-md">
                            <button
                                onClick={() => setSelectedTab("DatingProfile")}
                                type="button" className="btn btn-light btn-rounded fw-bold">Profile</button>
                        </div>
                    </div>
                </div>

            </div> */}
            <div className="card" style={{ borderRadius: 15 }}>
                <div className="d-flex navigation-icons cart-item">
                    <i onClick={() => handleChangeCurrentPage(-1)} className="fa-solid fa-angle-left"></i>
                    <i onClick={() => handleChangeCurrentPage(+1)} className="fa-solid fa-angle-right"></i>

                </div>
                {
                    users.map((user, index) => {
                        return (
                            <div className="card-body text-center">
                                <div className="mt-3 mb-4">
                                    <img
                                        src={"http://localhost:8000/" + user.img}
                                        className=""
                                        style={{ width: 150 }}
                                    />
                                    {/* <img
                                        src={"http://localhost:8000/" + user.img}
                                        className="rounded-circle img-fluid"
                                        style={{ width: 100 }}
                                    /> */}
                                </div>
                                <h4 className="mb-2">{user.name}, {user.age}</h4>
                                <p className="text-muted mb-4">
                                    @{user.email} <span className="mx-2">|</span>{" "}
                                    <a href="#!">mdbootstrap.com</a>
                                </p>
                                <div className="d-flex justify-content-end p-3">
                                    <i
                                        onClick={() => handleChangeCurrentPage(+1)}
                                        class="fa-solid fa-xmark p-2 " style={{ fontSize: "40px" }}></i>
                                    <i
                                        onClick={() => sendDateInvitation(user.id)}
                                        class="fa-regular fa-heart p-2" style={{ fontSize: "40px" }}></i>
                                </div>



                                <div>
                                    <ul className="">
                                        <li className="list-group-item d-flex align-items-center">
                                            <span className="icon me-3">
                                                <i className="fas fa-map-marker-alt"></i>
                                            </span>
                                            <div className="flex-fill">
                                                <div className="fw-bold">Dating Location</div>
                                                <div className="text-muted">{user.address}</div>
                                            </div>
                                        </li>

                                        <li className="list-group-item d-flex align-items-center">
                                            <span className="icon me-3">
                                                <i className="fas fa-heart"></i>
                                            </span>
                                            <div className="flex-fill">
                                                <div className="fw-bold">Looking For</div>
                                                <div className="text-muted">Something Casual</div>
                                            </div>
                                        </li>
                                        <li className="list-group-item d-flex align-items-center">
                                            <span className="icon me-3">
                                                <i className="fas fa-ruler-vertical"></i>
                                            </span>
                                            <div className="flex-fill">
                                                <div className="fw-bold">Height</div>
                                                <div className="text-muted">{user.user_info.height} cm tall</div>
                                            </div>
                                        </li>
                                        <li className="list-group-item d-flex align-items-center">
                                            <span className="icon me-3">
                                                <i className="fas fa-home"></i>
                                            </span>
                                            <div className="flex-fill">
                                                <div className="fw-bold">Hometown</div>
                                                <div className="text-muted">Hà Đông, Hà Nội, Việt Nam</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )
                    })
                }

                {/* <div className="card-body p-4 text-black">
                    <div className="mb-5">
                        <p className="lead fw-normal mb-1">About</p>
                        <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                            <p className="font-italic mb-1">Web Developer</p>
                            <p className="font-italic mb-1">Lives in New York</p>
                            <p className="font-italic mb-0">Photographer</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <p className="lead fw-normal mb-0">Recent photos</p>
                        <p className="mb-0">
                            <a href="#!" className="text-muted">
                                Show all
                            </a>
                        </p>
                    </div>
                    <div className="row g-2">
                        <div className="col mb-2">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                                alt="image 1"
                                className="w-100 rounded-3"
                            />
                        </div>
                        <div className="col mb-2">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                                alt="image 1"
                                className="w-100 rounded-3"
                            />
                        </div>
                    </div>
                    <div className="row g-2">
                        <div className="col">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                                alt="image 1"
                                className="w-100 rounded-3"
                            />
                        </div>
                        <div className="col">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                                alt="image 1"
                                className="w-100 rounded-3"
                            />
                        </div>
                    </div>
                </div> */}
            </div>




        </>
    )
}
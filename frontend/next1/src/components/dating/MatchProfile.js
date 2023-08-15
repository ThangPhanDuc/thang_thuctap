"use client";

import axios from "../../app/api/axios";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import "../../styles/Dating.css"

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
            <div className="d-flex justify-content-around m-3">
                <div className="">
                    <div className="row">
                        <div class="col-md">
                            <button
                                onClick={() => setSelectedTab("LikedYou")}
                                type="button" className="btn btn-light btn-rounded fw-bold">LikedYou</button>
                            <span className="badge rounded-pill badge-notification bg-danger" style={{ fontSize: "10px" }}>
                                2
                            </span>
                        </div>
                        <div class="col-md">
                            <button type="button" className="btn btn-light btn-rounded fw-bold">Matches</button>
                        </div>
                        <div class="col-md">
                            <button type="button" className="btn btn-light btn-rounded fw-bold">Profile</button>
                        </div>
                    </div>
                </div>

            </div>
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
                                        className="rounded-circle img-fluid"
                                        style={{ width: 100 }}
                                    />
                                </div>
                                <h4 className="mb-2">{user.name}, {user.age}</h4>
                                <p className="text-muted mb-4">
                                    @{user.email} <span className="mx-2">|</span>{" "}
                                    <a href="#!">mdbootstrap.com</a>
                                </p>
                                {/* <div className="mb-4 pb-2">
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary btn-floating"
                                    >
                                        <i className="fab fa-facebook-f fa-lg" />
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary btn-floating"
                                    >
                                        <i className="fab fa-twitter fa-lg" />
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary btn-floating"
                                    >
                                        <i className="fab fa-skype fa-lg" />
                                    </button>
                                </div> */}
                                {/* <button
                                    type="button"
                                    className="btn btn-primary btn-rounded btn-lg"
                                >
                                    Message now
                                </button> */}
                                <div className="d-flex justify-content-end">
                                    <i
                                        onClick={() => handleChangeCurrentPage(+1)}
                                        class="fa-solid fa-xmark p-1" style={{ fontSize: "30px" }}></i>
                                    <i
                                        onClick={() => sendDateInvitation(user.id)}
                                        class="fa-regular fa-heart p-1" style={{ fontSize: "30px" }}></i>
                                </div>
                                <div className="d-flex justify-content-between text-center mt-5 mb-2">
                                    <div>
                                        <p className="mb-2 h5">8471</p>
                                        <p className="text-muted mb-0">Wallets Balance</p>
                                    </div>
                                    <div className="px-3">
                                        <p className="mb-2 h5">8512</p>
                                        <p className="text-muted mb-0">Income amounts</p>
                                    </div>
                                    <div>
                                        <p className="mb-2 h5">4751</p>
                                        <p className="text-muted mb-0">Total Transactions</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
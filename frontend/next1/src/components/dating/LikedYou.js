"use client";

import axios from "../../app/api/axios";
import { useState, useEffect } from "react";

export default function LikedYou() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getReceivedDateInvitations();
    }, []);

    const getReceivedDateInvitations = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        try {
            const response = await axios.get(`/getReceivedDateInvitations?page=${currentPage}`, config);
            setUsers(response.data.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <ul className="list-group list-group-light">
                {
                    users.map((user, index) => {
                        return (
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <img
                                        src={"http://localhost:8000/" + user.img}
                                        alt=""
                                        style={{ width: 45, height: 45 }}
                                        className="rounded-circle"
                                    />
                                    <div className="ms-3">
                                        <p className="fw-bold mb-1">{user.name}</p>
                                        <p className="text-muted mb-0">{user.email}</p>
                                    </div>
                                </div>
                                <a className="btn btn-link btn-rounded btn-sm" href="#" role="button">
                                    Message now
                                </a>
                            </li>
                        )
                    })
                }


            </ul>

        </>
    )
}
"use client";

import axios from "../app/api/axios";
import { useState, useEffect } from "react";
import Link from 'next/link'


export default function FriendRequests() {
    const [friendRequests, setFriendRequests] = useState([]);

    useEffect(() => {
        getFriendRequests();
    }, []);


    const getFriendRequests = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        try {
            const response = await axios.get('/getFriendRequestsReceived', config);
            setFriendRequests(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const updateFriendRequestStatus = async (friend_id, action) => {
        const token = localStorage.getItem('token');
        try {
            await axios.post("/friendRequest", {
                "friend_id": friend_id,
                "action": action
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            getFriendRequests();
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <>
            <h2 className="mb-3">Friend Requests</h2>
            <div className="row">
                {friendRequests.map((friendRequest, index) => {
                    return (
                        <div key={index} className="col-xl-4 col-lg-6 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={"http://localhost:8000/" + friendRequest.img}
                                            alt=""
                                            style={{ width: 45, height: 45 }}
                                            className="rounded-circle"
                                        />
                                        <div className="ms-3">
                                            <p className="fw-bold mb-1">{friendRequest.name}</p>
                                            <p className="text-muted mb-0">{friendRequest.email}</p>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button
                                            onClick={() => updateFriendRequestStatus(friendRequest.id, "accept_request")}
                                            type="button" className="btn btn-primary mt-2">Confirm</button>
                                        <button
                                            onClick={() => updateFriendRequestStatus(friendRequest.id, "reject_request")}
                                            type="button" className="btn btn-secondary mt-1">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
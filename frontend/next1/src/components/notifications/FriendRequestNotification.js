"use client";

import axios from "../../app/api/axios";
import Link from 'next/link'
import { useState } from "react";


export default function FriendRequestNotification(props) {
    var { notification } = props;
    const [status,setStatus] =useState("pending");
    

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
            
          setStatus(action);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <li className="list-group-item justify-content-between align-items-center" >
            <div className="d-flex align-items-center">
                <img
                    src={"http://localhost:8000/" + notification.data.sender.img}
                    alt=""
                    style={{ width: 45, height: 45 }}
                    className="rounded-circle"
                />
                <div className="ms-3">
                    <p className="fw-bold mb-1">{notification.data.sender.name}</p>
                    <p className="text-muted mb-0">{notification.data.sender.name} sent you a friend request</p>
                </div>
            </div>
            {
                (
                    status === "pending" ? (
                        <div className="text-center  ">
                            <button
                                onClick={() => updateFriendRequestStatus(notification.data.sender.id, "accept_request")}
                                type="button" className="btn btn-primary mt-2 w-3">Confirm</button>
                            <button
                                onClick={() => updateFriendRequestStatus(notification.data.sender.id, "reject_request")}
                                type="button" className="btn btn-secondary mt-1">Delete</button>
                        </div>
                    ) : status === "accept_request" ? (
                        <button type="button" className="btn btn-secondary mt-1" >Requests Confirm</button>
                    ) : status === "reject_request" ? (
                        <button type="button" className="btn btn-secondary mt-1">Requests Delete</button>
                    ) : null
                )
            }

        </li>

    )
}
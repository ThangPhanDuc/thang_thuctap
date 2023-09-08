"use client";

import axios from "../../app/api/axios";
import { useState, useEffect } from "react";

export default function GroupInvitation() {
    const [groupInvitations, setGroupInvitations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getGroupInvitation();
    }, [currentPage]);


    const getGroupInvitation = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        try {
            const response = await axios.get(`/groups/invitations?page=${currentPage}`, config);
            setGroupInvitations(response.data.data);

        } catch (error) {
            console.error(error);
        }
    };

    const handleInvitationToJoinGroup = async (invitation_id, is_accepted) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        try {
            const response = await axios.put(`/groups/join-invitations`, {
                "invitation_id": invitation_id,
                "is_accepted": is_accepted
            }, config);
            alert(response.data);
            getGroupInvitation();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <p className="fw-bolder">Groups you should join</p>
            <div>
                <ul className="list-group list-group-light">
                    {
                        groupInvitations.map((groupInvitation, index) => {
                            return (
                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <img
                                            src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                                            alt=""
                                            style={{ width: 45, height: 45 }}
                                            // className="rounded-circle"
                                            className="rounded-3"
                                        />
                                        <div className="ms-3">
                                            <p className="fw-bold mb-1">{groupInvitation.group.name}</p>
                                            <p className="text-muted mb-0">Invited by {groupInvitation.sender.name}</p>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <button type="button" class="btn btn-secondary btn-floating m-1">
                                            <i
                                                onClick={() => handleInvitationToJoinGroup(groupInvitation.id, true)}
                                                className="fas fa-check"></i>
                                        </button>
                                        <button type="button" class="btn btn-secondary btn-floating m-1">
                                            <i
                                                onClick={() => handleInvitationToJoinGroup(groupInvitation.id, false)}
                                                className="fas fa-times"></i>
                                        </button>
                                    </div>
                                </li>
                            )
                        })
                    }

                </ul>

            </div>
        </>
    )
}
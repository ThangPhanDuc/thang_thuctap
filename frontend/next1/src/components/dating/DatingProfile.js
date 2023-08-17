"use client";

import { useState } from "react";
import EditProfile from "./datingProfile/EditProfile"
import PreviewProfile from "./datingProfile/PreviewProfile"
import { useAppSelector } from "@/redux/hooks";


export default function DatingProfile() {
    const [selectedTab, setSelectedTab] = useState("EditProfile");
    const user = useAppSelector((state) => state.userReducer.value);
    return (
        <>
            <div className="d-flex justify-content-around m-3">
                <div className="">
                    <div className="row">
                        <div class="col-md">
                            <button onClick={() => setSelectedTab("EditProfile")} type="button" className="btn btn-light btn-rounded fw-bold">Edit Profile</button>
                        </div>
                        <div class="col-md">

                            <button onClick={() => setSelectedTab("PreviewProfile")} type="button" className="btn btn-light btn-rounded fw-bold">Preview Profile</button>
                        </div>
                    </div>
                </div>
            </div>
            {
                selectedTab === "EditProfile" ? (
                    <EditProfile user={user} />
                ) : selectedTab === "PreviewProfile" ? (
                    <PreviewProfile user={user} />
                ) : null
            }
        </>
    )
}
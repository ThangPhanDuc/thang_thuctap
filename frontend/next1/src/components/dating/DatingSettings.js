"use client";

import { setIdealMatch } from "@/redux/features/IdealMatchSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useState, useEffect } from "react";

export default function DatingSettings() {
    const dispatch = useAppDispatch();
    const idealMatch = useAppSelector((state) => state.idealMatchReducer.value);



    return (
        <>
            <form>
                <div>
                    <p className="fw-bold" style={{ fontSize: "20px" }}>Their basics</p>
                    <ul className="list-group ">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <div className="fw-bold">Distance From You</div>
                                <div className="text-muted">Within {idealMatch.distance} kilometers</div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <div className="form-outline" style={{ width: "5rem" }}>
                                    <input
                                        onChange={e => {
                                            dispatch(setIdealMatch({ ...idealMatch, distance: parseInt(e.target.value) }));
                                        }}
                                        // min={18}
                                        type="number"
                                        id="typeNumber"
                                        className="form-control"
                                    />
                                    <label className="form-label" htmlFor="typeNumber">
                                        Within
                                    </label>
                                </div>


                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <div className="fw-bold">Gender Identity</div>
                                <div className="text-muted">Women (must have)</div>
                            </div>
                            <select class="form-select  " aria-label="Default select example" style={{ width: "5rem" }} >
                                {/* <option selected>Open this select menu</option> */}
                                <option value="1">Women</option>
                                <option value="2">Men</option>
                                <option value="3">Everyone</option>
                            </select>

                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <div className="fw-bold">Age Range</div>
                                <div className="text-muted">{idealMatch.min_age}-{idealMatch.max_age}</div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <div className="form-outline" style={{ width: "5rem" }}>
                                    <input
                                        onChange={e => {
                                            dispatch(setIdealMatch({ ...idealMatch, min_age: parseInt(e.target.value) }));
                                        }}
                                        min={18}
                                        type="number"
                                        id="typeNumber"
                                        className="form-control"
                                    />
                                    <label className="form-label" htmlFor="typeNumber">
                                        Min Age
                                    </label>
                                </div>
                                <div className="form-outline" style={{ width: "5rem" }}>
                                    <input
                                        onChange={e => {
                                            dispatch(setIdealMatch({ ...idealMatch, max_age: parseInt(e.target.value) }));
                                        }}
                                        max={50}
                                        type="number"
                                        id="typeNumber"
                                        className="form-control"
                                    />
                                    <label className="form-label" htmlFor="typeNumber">
                                        Max Age
                                    </label>
                                </div>

                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <div className="fw-bold">Height Range</div>
                                <div className="text-muted">{idealMatch.min_height} cm-{idealMatch.max_height} cm</div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <div className="form-outline" style={{ width: "5rem" }}>
                                    <input
                                        onChange={e => {
                                            dispatch(setIdealMatch({ ...idealMatch, min_height: parseInt(e.target.value) }));
                                        }}
                                        min={150}
                                        type="number"
                                        id="typeNumber"
                                        className="form-control"
                                    />
                                    <label className="form-label" htmlFor="typeNumber">
                                        Min Height
                                    </label>
                                </div>
                                <div className="form-outline" style={{ width: "5rem" }}>
                                    <input
                                        onChange={e => {
                                            dispatch(setIdealMatch({ ...idealMatch, max_height: parseInt(e.target.value) }));
                                        }}
                                        max={50}
                                        type="number"
                                        id="typeNumber"
                                        className="form-control"
                                    />
                                    <label className="form-label" htmlFor="typeNumber">
                                        Max Height
                                    </label>
                                </div>

                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <div className="fw-bold">Languages Spoken</div>
                                <div className="text-muted">No preference</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div>
                    <p className="fw-bold mt-3" style={{ fontSize: "20 px" }}>Their Education</p>
                    <ul className="list-group ">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <div className="fw-bold">Education Levels</div>
                                <div className="text-muted">{idealMatch.educationLevel}</div>
                            </div>
                            <select
                                onChange={e => {
                                    dispatch(setIdealMatch({ ...idealMatch, educationLevel: (e.target.value) }));
                                }}
                                class="form-select  " aria-label="Default select example" style={{ width: "5rem" }} >
                                <option value="No Preference">No Preference</option>
                                <option value="High School Diploma">High School Diploma</option>
                                <option value="College Degree"> College Degree</option>
                                <option value="Grad School Degree"> Grad School Degree</option>
                            </select>

                            {/* Chatting
                        Friendship
                        Something Casual
                        Long-term Relationship
                        Prefer Not to Say */}

                        </li>
                    </ul>

                </div>
                <button type="button" className="btn btn-secondary mt-2">
                    Save Setting
                </button>
            </form>
        </>

    )
}
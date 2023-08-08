"use client";

import axios from 'axios';
import Header from "@/components/Header";
import { useState, useEffect } from "react";


import 'bootstrap/dist/css/bootstrap.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function FaceRecognition() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [usersSearch, setUsersSearch] = useState([]);

    const FaceRecognitionSearch = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');

        const formData = new FormData();
        formData.append("image", selectedImage);

        try {
            const response = await axios.post("http://127.0.0.1:5000/recognize", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response.data);
            setUsersSearch(response.data)
            // setSelectedImage(null);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Header />
            <div className="col-lg-4 col-md-4 col-sm-12 mx-auto">
                <form onSubmit={FaceRecognitionSearch}>
                    {selectedImage &&
                        <div className="d-flex align-items-center">
                            <img
                                src={URL.createObjectURL(selectedImage)}
                                alt="avatar"
                                className="img-fluid m-3"
                                style={{ width: 150 }}
                            />
                            <button onClick={() => setSelectedImage()}>X</button>
                        </div>
                    }
                    <div>
                        <label for="formFileMultiple" class="form-label">Multiple files input example</label>
                        <input
                            onChange={(event) => {
                                setSelectedImage(event.target.files[0]);
                            }}
                            className="form-control" type="file" id="formFileMultiple" multiple />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Search
                    </button>
                </form>

                <h1>list user</h1>
                <ul className="list-group list-group-light">
                    {
                        usersSearch.map((user, index) => {
                            return (
                                <div key={index}>
                                    {user.id && (
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center">
                                                <img
                                                    src={"http://localhost:8000/" + user.img}
                                                    alt=""
                                                    style={{ width: 60, height: 60 }}
                                                    className="rounded-circle"
                                                />
                                                <div className="ms-3">
                                                    <p className="fw-bold mb-1">{user.name}</p>
                                                    <p className="text-muted mb-0">{user.email}</p>
                                                </div>
                                            </div>
                                            {/* <span className="badge rounded-pill badge-success">Active</span> */}
                                            {/* <img
                                                src={"http://localhost:8000/" + user.img}
                                                alt=""
                                                style={{ width: 60, height: 60 }}

                                            /> */}
                                        </li>
                                    )}
                                </div>
                            )
                        })
                    }


                </ul>
            </div>


        </>
    )
}
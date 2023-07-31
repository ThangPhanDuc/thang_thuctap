"use client";

import PostCard from "@/components/PostCard";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import axios from "../../api/axios";

import 'bootstrap/dist/css/bootstrap.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Post({ params }) {
    const { id } = params;
    const [post, setPost] = useState({});

    useEffect(() => {
        getPostById();
    }, []);

    const getPostById = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        try {
            const response = await axios.get(`/getPostById/${id}`, config);
            setPost(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Header />
            <PostCard post={post} />
        </>
    )
}
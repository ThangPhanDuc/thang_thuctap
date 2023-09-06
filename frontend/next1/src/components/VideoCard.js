"use client";


import { useState, useEffect } from "react";
import Link from 'next/link'
import axios from "../app/api/axios";
import { useAppSelector } from "@/redux/hooks";

export default function VideoCard(props) {
    const videoState = props.video;
    const [video, setVideo] = useState(videoState);
    const user = useAppSelector((state) => state.userReducer.value);
    const [comment, setComment] = useState("");
    const emojis = ["😊", "😂", "😍", "👍", "❤️"];
    const [showEmojis, setShowEmojis] = useState(false);
    const [showComment, setShowComment] = useState(false);

    const handCommentVideo = async (video_id, event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.post('/commentVideo', {
                "video_id": video_id,
                "content": comment
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setComment("");
            getVideoById();
        } catch (error) {
            console.log(error);
        }
    }

    const handleLikeVideo = async (video_id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.post('/likeVideo', {
                "video_id": video_id,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            getVideoById();
        } catch (error) {
            console.log(error);
        }
    }

    const getVideoById = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        try {
            const response = await axios.get(`/videos/${videoState.id}`, config);
            setVideo(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    function formatTimeDistance(timestamp) {
        const now = new Date();
        const timeDiff = now - new Date(timestamp);
      
        const seconds = timeDiff / 1000;
        const minutes = seconds / 60;
        const hours = minutes / 60;
        const days = hours / 24;
        const months = days / 30;
      
        if (months >= 1) {
          return `${Math.floor(months)}m`;
        } else if (days >= 1) {
          return `${Math.floor(days)}d`;
        } else if (hours >= 1) {
          return `${Math.floor(hours)}h`;
        } else if (minutes >= 1) {
          return `${Math.floor(minutes)}m`;
        } else {
          return `${Math.floor(seconds)}s`;
        }
      }

    return (
        <>
            <div className="container ">
                <div className=" mx-auto  mt-4">
                    <div className="social-feed-box">
                        <div className="social-avatar">
                            <Link href={"/profile/" + video.post.user?.id} className="pull-left">
                                <img
                                    alt="image"
                                    src={"http://localhost:8000/" + video.post?.user.img}
                                />
                            </Link>
                            <div className="media-body">
                                <a href="#">{video.post?.user.name}</a>
                                <small className="text-muted">
                                    {/* 2h */}
                                    {formatTimeDistance(video.created_at)}
                                </small>
                            </div>
                        </div>
                        <div className="social-body">
                            <p>
                                {video.post.content}
                            </p>


                            <video

                                controls
                                className="video-responsive w-100"
                            >
                                <source src={"http://localhost:8000/" + video.path} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                            <div className="btn-group">
                                <button
                                    onClick={() => handleLikeVideo(video.id)}
                                    className={video.liked_by_user ? "btn btn-primary btn-xs" : "btn btn-white btn-xs"}
                                >
                                    <i className="fa fa-thumbs-up" />

                                    {video.likes_count + " like"}
                                </button>
                                <button className="btn btn-white btn-xs"
                                    onClick={() => setShowComment(!showComment)}
                                >
                                    <i className="fa fa-comments" />
                                    {video.comments?.length} Comment
                                </button>
                                <button className="btn btn-white btn-xs">
                                    <i className="fa fa-share" /> Share
                                </button>
                            </div>
                        </div>
                        {
                            showComment && <div className="social-footer">
                                {video.comments?.map((comment, index) => {

                                    return (
                                        <div key={index} className="social-comment" >
                                            <a href="" className="pull-left">
                                                <img
                                                    alt="image"
                                                    src={"http://localhost:8000/" + comment.user?.img}
                                                />
                                            </a>
                                            <div className="media-body">
                                                <a href="#">{comment.user.name}</a>
                                                {" " + comment.content}
                                                <br />
                                                <a href="#" className="small">
                                                    <i

                                                        className="fa fa-thumbs-up"
                                                    /> 0 Like this!
                                                </a>{" "}
                                                <small className="text-muted">
                                                    {/* 1h */}
                                                    {(comment.created_at)}
                                                </small>
                                            </div>
                                        </div>
                                    )
                                })}
                                <form
                                    onSubmit={(event) => handCommentVideo(video.id, event)}
                                >
                                    <div className="social-comment">
                                        <Link href="#" className="pull-left">
                                            <img
                                                alt="image"
                                                src={"http://localhost:8000/" + user?.img}
                                            />
                                        </Link>
                                        <div className="media-body">
                                            <textarea
                                                value={comment}
                                                className="form-control"
                                                placeholder="Write comment..."
                                                onChange={e => setComment(e.target.value)}
                                            />
                                        </div>

                                        <button type="submit">sent</button>
                                    </div>
                                    <div className="emoji-icon" onClick={() => setShowEmojis(!showEmojis)}>
                                        😊
                                    </div>
                                    {showEmojis && (
                                        <div className="emoji-list">
                                            {emojis.map(emoji => (
                                                <button
                                                    key={emoji}
                                                    type="button"
                                                    onClick={() => setComment(prevComment => prevComment + emoji)}
                                                >
                                                    {emoji}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </form>
                            </div>
                        }

                    </div>
                </div>
            </div>

        </>
    )
}
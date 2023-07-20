"use client";
import "../css/PostCard.css"
import { useState, useEffect } from "react";
import Link from 'next/link'
import axios from "../app/api/axios";

export default function PostCard(props) {
    const { user, post,getUpdatedPost } = props;
    const [comment, setComment] = useState("");
    const emojis = ["😊", "😂", "😍", "👍", "❤️"];
    const [showEmojis, setShowEmojis] = useState(false);

    const handCommentPost = async (post_id,event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.post('/commentPost', {
                post_id: post_id,
                "content": comment
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setComment("");
            getUpdatedPost();
        } catch (error) {
            console.log(error);
        }
    }

    const handleLikePost = async (post_id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.post('/likePost', {
                "post_id": post_id,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            getUpdatedPost();
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="container ">
            <div className="col-md-6 mx-auto  mt-4 w-100">
                <div className="social-feed-box">
                    <div className="social-avatar">
                        <a href="" className="pull-left">
                            <img
                                alt="image"
                                src={"http://localhost:8000/" + post.user?.img}
                            />
                        </a>
                        <div className="media-body">
                            <a href="#">{post.user?.name}</a>
                            <small className="text-muted">{post.created_at}</small>
                        </div>
                    </div>
                    <div className="social-body">
                        <p>
                            {post.content}
                        </p>
                        {post.photos?.map((photo, index) => {
                            return (
                                <img
                                    src={"http://localhost:8000/" + photo.path}
                                    className="img-responsive"
                                />
                            )
                        })}
                        <div className="btn-group">
                            <button
                                onClick={() => handleLikePost(post.id)}
                                className="btn btn-white btn-xs">
                                <i className="fa fa-thumbs-up" />
                                {post.liked_by_user ? `You and ${post.likes_count - 1} others` : `${post.likes_count} like`}
                            </button>
                            <button className="btn btn-white btn-xs">
                                <i className="fa fa-comments" /> {post.comments?.length} Comment
                            </button>
                            <button className="btn btn-white btn-xs">
                                <i className="fa fa-share" /> Share
                            </button>
                        </div>
                    </div>
                    <div className="social-footer">
                        {post.comments?.map((comment, index) => {

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
                                        {comment.content}
                                        <br />
                                        <a href="#" className="small">
                                            <i

                                                className="fa fa-thumbs-up"
                                            /> 26 Like this!
                                        </a>{" "}
                                        -<small className="text-muted">{comment.created_at}</small>
                                    </div>
                                </div>
                            )
                        })}
                        <form onSubmit={() => handCommentPost(post.id,event)}>
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
                </div>
            </div>
        </div>

    )
}
"use client";
import "../styles/PostCard.css"
import { useState, useEffect } from "react";
import Link from 'next/link'
import axios from "../app/api/axios";
import { useAppSelector } from "@/redux/hooks";
import {
    format, differenceInMinutes, differenceInHours,
    differenceInDays, differenceInMonths, differenceInMilliseconds
} from 'date-fns';


export default function PostCard(props) {
    const postState = props.post;
    const [post, setPost] = useState(postState);
    const user = useAppSelector((state) => state.userReducer.value);
    const [comment, setComment] = useState("");
    const emojis = ["😊", "😂", "😍", "👍", "❤️"];
    const [showEmojis, setShowEmojis] = useState(false);

    const handCommentPost = async (post_id, event) => {
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
            getPostById();
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
            getPostById();
        } catch (error) {
            console.log(error);
        }
    }


    const getPostById = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        try {
            const response = await axios.get(`/getPostById/${postState.id}`, config);
            setPost(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getFormattedTimeDifference = (inputDate) => {
        const formattedDate = format(new Date(), 'dd/MM/yyyy, hh:mm:ss');

        const startDate = new Date(inputDate);
        const endDate = new Date(formattedDate);

        const timeDifferenceInMilliseconds = differenceInMilliseconds(endDate, startDate);
        var timeDifferenceInMinute = timeDifferenceInMilliseconds / 1000 / 60  ;

        if(timeDifferenceInMilliseconds<=1){
            return `now`;
        }else if (timeDifferenceInMinute < 60) {
            timeDifferenceInMinute = Math.floor(timeDifferenceInMinute)
            return `${timeDifferenceInMinute} minute ago`;
        } else if (timeDifferenceInMinute < 24 * 60) {
            timeDifferenceInMinute = Math.floor(timeDifferenceInMinute / 60)
            return `${timeDifferenceInMinute} hour ago`;
        } 
        // else if (timeDifferenceInMinute < 30 * 24 * 60) {
        //     timeDifferenceInMinute = Math.floor(timeDifferenceInMinute / 60 / 24)
        //     return `${timeDifferenceInMinute} day ago`;
        // } else if (timeDifferenceInMinute < 12 * 30 * 24 * 60) {
        //     timeDifferenceInMinute = Math.floor(timeDifferenceInMinute / 60 / 24 / 30);
        //     return `${timeDifferenceInMinute} month ago`;
        // }
         else {
            return inputDate;
        }

    
    };



    return (
        <div className="container ">
            <div className="col-md-12 mx-auto  mt-4">
                <div className="social-feed-box">
                    <div className="social-avatar">
                        <Link href={"/profile/" + post.user?.id} className="pull-left">
                            <img
                                alt="image"
                                src={"http://localhost:8000/" + post.user?.img}
                            />
                        </Link>
                        <div className="media-body">
                            <a href="#">{post.user?.name}</a>
                            <small className="text-muted">{getFormattedTimeDifference(post.created_at)}</small>
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
                                className={post.liked_by_user ? "btn btn-primary btn-xs" : "btn btn-white btn-xs"}>
                                <i className="fa fa-thumbs-up" />
                                {/* {post.liked_by_user ? `You and ${post.likes_count - 1} others` : `${post.likes_count} like`} */}
                                {post.likes_count + " like"}
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
                                        {" " + comment.content}
                                        <br />
                                        <a href="#" className="small">
                                            <i

                                                className="fa fa-thumbs-up"
                                            /> 26 Like this!
                                        </a>{" "}
                                        <small className="text-muted">{getFormattedTimeDifference(comment.created_at)}</small>
                                    </div>
                                </div>
                            )
                        })}
                        <form onSubmit={() => handCommentPost(post.id, event)}>
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
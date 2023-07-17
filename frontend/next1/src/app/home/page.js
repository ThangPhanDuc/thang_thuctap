"use client";

import "../home.css"
import axios from "../api/axios";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Link from 'next/link'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Pusher from "pusher-js";

export default function Home() {
    const [user, setUser] = useState({});

    useEffect(() => {
        getUser();
    }, []);
    const getUser = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        try {
            const response = await axios.get('/user', config);
            const userInfo = response.data;
            setUser(userInfo);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            {/* <link
                href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
                rel="stylesheet"
                integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
                crossOrigin="anonymous"
            /> */}
            {/* <nav className="navbar navbar-light bg-white">
                <a href="#" className="navbar-brand">
                    BootdEy.com
                </a>
                <form className="form-inline">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            aria-label="Recipient's username"
                            aria-describedby="button-addon2"
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-primary"
                                type="button"
                                id="button-addon2"
                            >
                                <i className="fa fa-search" />
                            </button>
                        </div>
                    </div>
                </form>
            </nav> */}
            <div className="container gedf-wrapper">
                <div className="row">
                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="h5">@LeeCross</div>
                                <div className="h7 text-muted">Fullname : Miracles Lee Cross</div>
                                <div className="h7">
                                    Developer of web applications, JavaScript, PHP, Java, Python,
                                    Ruby, Java, Node.js, etc.
                                </div>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <div className="h6 text-muted">Followers</div>
                                    <div className="h5">5.2342</div>
                                </li>
                                <li className="list-group-item">
                                    <div className="h6 text-muted">Following</div>
                                    <div className="h5">6758</div>
                                </li>
                                <li className="list-group-item">Vestibulum at eros</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6 gedf-main ">
                        {/*- \\\\\\\Post*/}
                        <div className="card gedf-card">
                            <div className="card-header">
                                <ul
                                    className="nav nav-tabs card-header-tabs"
                                    id="myTab"
                                    role="tablist"
                                >
                                    <li className="nav-item">
                                        <a
                                            className="nav-link active"
                                            id="posts-tab"
                                            data-toggle="tab"
                                            href="#posts"
                                            role="tab"
                                            aria-controls="posts"
                                            aria-selected="true"
                                        >
                                            Make a publication
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            id="images-tab"
                                            data-toggle="tab"
                                            role="tab"
                                            aria-controls="images"
                                            aria-selected="false"
                                            href="#images"
                                        >
                                            Images
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="card-body">
                                <div className="tab-content" id="myTabContent">
                                    <div
                                        className="tab-pane fade show active"
                                        id="posts"
                                        role="tabpanel"
                                        aria-labelledby="posts-tab"
                                    >
                                        <div className="form-group">
                                            <label className="sr-only" htmlFor="message">
                                                post
                                            </label>
                                            <textarea
                                                className="form-control"
                                                id="message"
                                                rows={3}
                                                placeholder="What are you thinking?"
                                                defaultValue={""}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className="tab-pane fade"
                                        id="images"
                                        role="tabpanel"
                                        aria-labelledby="images-tab"
                                    >
                                        <div className="form-group">
                                            <div className="custom-file">
                                                <input
                                                    type="file"
                                                    className="custom-file-input"
                                                    id="customFile"
                                                />
                                                <label className="custom-file-label" htmlFor="customFile">
                                                    Upload image
                                                </label>
                                            </div>
                                        </div>
                                        <div className="py-4" />
                                    </div>
                                </div>
                                <div className="btn-toolbar justify-content-between">
                                    <div className="btn-group">
                                        <button type="submit" className="btn btn-primary">
                                            share
                                        </button>
                                    </div>
                                    <div className="btn-group">
                                        <button
                                            id="btnGroupDrop1"
                                            type="button"
                                            className="btn btn-link dropdown-toggle"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            <i className="fa fa-globe" />
                                        </button>
                                        <div
                                            className="dropdown-menu dropdown-menu-right"
                                            aria-labelledby="btnGroupDrop1"
                                        >
                                            <a className="dropdown-item" href="#">
                                                <i className="fa fa-globe" /> Public
                                            </a>
                                            <a className="dropdown-item" href="#">
                                                <i className="fa fa-users" /> Friends
                                            </a>
                                            <a className="dropdown-item" href="#">
                                                <i className="fa fa-user" /> Just me
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="social-feed-box">
                            {/* <div className="pull-right social-action dropdown">
                                <button data-toggle="dropdown" className="dropdown-toggle btn-white">
                                    <i className="fa fa-angle-down" />
                                </button>
                                <ul className="dropdown-menu m-t-xs">
                                    <li>
                                        <a href="#">Config</a>
                                    </li>
                                </ul>
                            </div> */}
                            <div className="social-avatar">
                                <a href="" className="pull-left">
                                    <img
                                        alt="image"
                                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                    />
                                </a>
                                <div className="media-body">
                                    <a href="#">Andrew Williams</a>
                                    <small className="text-muted">Today 4:21 pm - 12.06.2014</small>
                                </div>
                            </div>
                            <div className="social-body">
                                <p>
                                    Many desktop publishing packages and web page editors now use Lorem
                                    Ipsum as their default model text, and a search for 'lorem ipsum'
                                    will uncover many web sites still in their infancy. Packages and web
                                    page editors now use Lorem Ipsum as their default model text.
                                </p>
                                <div className="btn-group">
                                    <button className="btn btn-white btn-xs">
                                        <i className="fa fa-thumbs-up" /> Like this!
                                    </button>
                                    <button className="btn btn-white btn-xs">
                                        <i className="fa fa-comments" /> Comment
                                    </button>
                                    <button className="btn btn-white btn-xs">
                                        <i className="fa fa-share" /> Share
                                    </button>
                                </div>
                            </div>
                            <div className="social-footer">
                                <div className="social-comment">
                                    <a href="" className="pull-left">
                                        <img
                                            alt="image"
                                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                        />
                                    </a>
                                    <div className="media-body">
                                        <a href="#">Andrew Williams</a>
                                        Internet tend to repeat predefined chunks as necessary, making
                                        this the first true generator on the Internet. It uses a
                                        dictionary of over 200 Latin words.
                                        <br />
                                        <a href="#" className="small">
                                            <i className="fa fa-thumbs-up" /> 26 Like this!
                                        </a>{" "}
                                        -<small className="text-muted">12.06.2014</small>
                                    </div>
                                </div>
                                <div className="social-comment">
                                    <a href="" className="pull-left">
                                        <img
                                            alt="image"
                                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                        />
                                    </a>
                                    <div className="media-body">
                                        <a href="#">Andrew Williams</a>
                                        Making this the first true generator on the Internet. It uses a
                                        dictionary of.
                                        <br />
                                        <a href="#" className="small">
                                            <i className="fa fa-thumbs-up" /> 11 Like this!
                                        </a>{" "}
                                        -<small className="text-muted">10.07.2014</small>
                                    </div>
                                </div>
                                <div className="social-comment">
                                    <a href="" className="pull-left">
                                        <img
                                            alt="image"
                                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                        />
                                    </a>
                                    <div className="media-body">
                                        <textarea
                                            className="form-control"
                                            placeholder="Write comment..."
                                            defaultValue={""}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="social-feed-box">
                            {/* <div className="pull-right social-action dropdown">
                                <button data-toggle="dropdown" className="dropdown-toggle btn-white">
                                    <i className="fa fa-angle-down" />
                                </button>
                                <ul className="dropdown-menu m-t-xs">
                                    <li>
                                        <a href="#">Config</a>
                                    </li>
                                </ul>
                            </div> */}
                            <div className="social-avatar">
                                <a href="" className="pull-left">
                                    <img
                                        alt="image"
                                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                    />
                                </a>
                                <div className="media-body">
                                    <a href="#">Andrew Williams</a>
                                    <small className="text-muted">Today 4:21 pm - 12.06.2014</small>
                                </div>
                            </div>
                            <div className="social-body">
                                <p>
                                    Many desktop publishing packages and web page editors now use Lorem
                                    Ipsum as their default model text, and a search for 'lorem ipsum'
                                    will uncover many web sites still in their infancy. Packages and web
                                    page editors now use Lorem Ipsum as their default model text.
                                </p>
                                <p>
                                    Lorem Ipsum as their default model text, and a search for 'lorem
                                    ipsum' will uncover many web sites still in their infancy. Packages
                                    and web page editors now use Lorem Ipsum as their default model
                                    text.
                                </p>
                                <img
                                    src="https://www.bootdey.com/image/650x280/FFB6C1/000000"
                                    className="img-responsive"
                                />
                                <div className="btn-group">
                                    <button className="btn btn-white btn-xs">
                                        <i className="fa fa-thumbs-up" /> Like this!
                                    </button>
                                    <button className="btn btn-white btn-xs">
                                        <i className="fa fa-comments" /> Comment
                                    </button>
                                    <button className="btn btn-white btn-xs">
                                        <i className="fa fa-share" /> Share
                                    </button>
                                </div>
                            </div>
                            <div className="social-footer">
                                <div className="social-comment">
                                    <a href="" className="pull-left">
                                        <img
                                            alt="image"
                                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                        />
                                    </a>
                                    <div className="media-body">
                                        <a href="#">Andrew Williams</a>
                                        Internet tend to repeat predefined chunks as necessary, making
                                        this the first true generator on the Internet. It uses a
                                        dictionary of over 200 Latin words.
                                        <br />
                                        <a href="#" className="small">
                                            <i className="fa fa-thumbs-up" /> 26 Like this!
                                        </a>{" "}
                                        -<small className="text-muted">12.06.2014</small>
                                    </div>
                                </div>
                                <div className="social-comment">
                                    <a href="" className="pull-left">
                                        <img
                                            alt="image"
                                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                        />
                                    </a>
                                    <div className="media-body">
                                        <a href="#">Andrew Williams</a>
                                        Making this the first true generator on the Internet. It uses a
                                        dictionary of.
                                        <br />
                                        <a href="#" className="small">
                                            <i className="fa fa-thumbs-up" /> 11 Like this!
                                        </a>{" "}
                                        -<small className="text-muted">10.07.2014</small>
                                    </div>
                                </div>
                                <div className="social-comment">
                                    <a href="" className="pull-left">
                                        <img
                                            alt="image"
                                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                        />
                                    </a>
                                    <div className="media-body">
                                        <a href="#">Andrew Williams</a>
                                        Making this the first true generator on the Internet. It uses a
                                        dictionary of.
                                        <br />
                                        <a href="#" className="small">
                                            <i className="fa fa-thumbs-up" /> 11 Like this!
                                        </a>{" "}
                                        -<small className="text-muted">10.07.2014</small>
                                    </div>
                                </div>
                                <div className="social-comment">
                                    <a href="" className="pull-left">
                                        <img
                                            alt="image"
                                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                        />
                                    </a>
                                    <div className="media-body">
                                        <textarea
                                            className="form-control"
                                            placeholder="Write comment..."
                                            defaultValue={""}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="social-feed-box">
                            {/* <div className="pull-right social-action dropdown">
                                <button data-toggle="dropdown" className="dropdown-toggle btn-white">
                                    <i className="fa fa-angle-down" />
                                </button>
                                <ul className="dropdown-menu m-t-xs">
                                    <li>
                                        <a href="#">Config</a>
                                    </li>
                                </ul>
                            </div> */}
                            <div className="social-avatar">
                                <a href="" className="pull-left">
                                    <img
                                        alt="image"
                                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                    />
                                </a>
                                <div className="media-body">
                                    <a href="#">Andrew Williams</a>
                                    <small className="text-muted">Today 4:21 pm - 12.06.2014</small>
                                </div>
                            </div>
                            <div className="social-body">
                                <p>
                                    Packages and web page editors now use Lorem Ipsum as their default
                                    model text. Page editors now use Lorem Ipsum as their default model
                                    text.
                                </p>
                                <div className="btn-group">
                                    <button className="btn btn-white btn-xs">
                                        <i className="fa fa-thumbs-up" /> Like this!
                                    </button>
                                    <button className="btn btn-white btn-xs">
                                        <i className="fa fa-comments" /> Comment
                                    </button>
                                    <button className="btn btn-white btn-xs">
                                        <i className="fa fa-share" /> Share
                                    </button>
                                </div>
                            </div>
                            <div className="social-footer">
                                <div className="social-comment">
                                    <a href="" className="pull-left">
                                        <img
                                            alt="image"
                                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                        />
                                    </a>
                                    <div className="media-body">
                                        <a href="#">Andrew Williams</a>
                                        Making this the first true generator on the Internet. It uses a
                                        dictionary of.
                                        <br />
                                        <a href="#" className="small">
                                            <i className="fa fa-thumbs-up" /> 11 Like this!
                                        </a>{" "}
                                        -<small className="text-muted">10.07.2014</small>
                                    </div>
                                </div>
                                <div className="social-comment">
                                    <a href="" className="pull-left">
                                        <img
                                            alt="image"
                                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                        />
                                    </a>
                                    <div className="media-body">
                                        <textarea
                                            className="form-control"
                                            placeholder="Write comment..."
                                            defaultValue={""}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-3">
                        <div className="card gedf-card">
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                <p className="card-text">
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </p>
                                <a href="#" className="card-link">
                                    Card link
                                </a>
                                <a href="#" className="card-link">
                                    Another link
                                </a>
                            </div>
                        </div>
                        <div className="card gedf-card">
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                <p className="card-text">
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </p>
                                <a href="#" className="card-link">
                                    Card link
                                </a>
                                <a href="#" className="card-link">
                                    Another link
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>



    )
}
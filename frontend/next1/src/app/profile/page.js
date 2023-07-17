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

export default function Profile() {
    return (
        <>
            <link
                href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
                rel="stylesheet"
            />
            <div className="container">
                <div className="col-md-7">
                    <div className="social-feed-box">
                        <div className="pull-right social-action dropdown">
                            <button data-toggle="dropdown" className="dropdown-toggle btn-white">
                                <i className="fa fa-angle-down" />
                            </button>
                            <ul className="dropdown-menu m-t-xs">
                                <li>
                                    <a href="#">Config</a>
                                </li>
                            </ul>
                        </div>
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
                        <div className="pull-right social-action dropdown">
                            <button data-toggle="dropdown" className="dropdown-toggle btn-white">
                                <i className="fa fa-angle-down" />
                            </button>
                            <ul className="dropdown-menu m-t-xs">
                                <li>
                                    <a href="#">Config</a>
                                </li>
                            </ul>
                        </div>
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
                        <div className="pull-right social-action dropdown">
                            <button data-toggle="dropdown" className="dropdown-toggle btn-white">
                                <i className="fa fa-angle-down" />
                            </button>
                            <ul className="dropdown-menu m-t-xs">
                                <li>
                                    <a href="#">Config</a>
                                </li>
                            </ul>
                        </div>
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
            </div>
        </>


    )
}
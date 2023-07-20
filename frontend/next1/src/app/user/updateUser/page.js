"use client";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "../../api/axios";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";

import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

function UpdateUser() {
  const [user, setUser] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const router = useRouter();

  const editorRef = useRef();

  useEffect(() => {
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
        console.log(user);
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, []);

  const handleUpdate = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("name", user.name);
    formData.append("age", user.age);
    formData.append("phone", user.phone);
    formData.append("address", user.address);
    formData.append("profile",editorRef.current.getContent())

    console.log(formData.getAll('age'));

    try {
      await axios.post("/updateUser", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("User updated successfully");
    } catch (error) {
      console.error(error);
    }
    router.push("/user");
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImageUrl(imageUrl);
    } else {
      setSelectedImageUrl("");
    }
  }

  return (
    <section style={{ backgroundColor: "#eee" }}>
     

      <div className="container py-5">


        <div className="row">
          <div className="col">
            <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">User</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Update User
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <form onSubmit={handleUpdate} >
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img
                    src={selectedImageUrl ? selectedImageUrl : "http://localhost:8000/" + user.img}
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: 150 }}
                  />
                  <h5 className="my-3" dangerouslySetInnerHTML={{ __html: user.name }} >
                  </h5>

                  <div className="d-flex justify-content-center mb-2">
                    <div class="mb-3">
                      <label for="formFile" class="form-label">Update profile picture</label>
                      <input class="form-control" type="file" id="formFile"
                        // onChange={(event) => {
                        //   console.log(event.target.files[0]);
                        //   setSelectedImage(event.target.files[0]);
                        // }}
                        onChange={handleImageChange}
                      />
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <Editor
                  onInit={(evt, editor) => editorRef.current = editor}
                  initialValue={user.profile}
                />
                <button type="submit" class="btn btn-primary w-25 mx-auto mb-2">Update</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default UpdateUser
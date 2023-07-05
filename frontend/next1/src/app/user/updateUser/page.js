"use client";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "../../api/axios";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";

function UpdateUser() {
  const [user, setUser] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const router = useRouter();

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

    // console.log(formData.getAll('age'));

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

    <div class="card">
      <form onSubmit={handleUpdate}  >

        <div class="card-body">
          <div class="form-group">
            <img
              src={selectedImageUrl ? selectedImageUrl : "http://localhost:8000/" + user.img}
              className="card-img-top "
              alt="User Image"
              style={{ width: "5rem" }}
            />
            <input type="file" class="form-control-file"
              // onChange={(event) => {
              //   console.log(event.target.files[0]);
              //   setSelectedImage(event.target.files[0]);
              // }}
              onChange={handleImageChange}
            />
          </div>
          <div class="form-group">
            <label for="name">Name:</label>
            <input
              value={user.name}
              onChange={(event) => setUser({ ...user, name: event.target.value })}
              name="name" class="form-control" placeholder="" />
          </div>
          <div class="form-group">
            <label for="age">Age:</label>
            <input
              value={user.age}
              onChange={(event) => setUser({ ...user, age: event.target.value })}
              type="number" class="form-control" placeholder="" />
          </div>
          <div class="form-group">
            <label for="phone">Phone:</label>
            <input
              value={user.phone}
              onChange={(event) => setUser({ ...user, phone: event.target.value })}
              type="text" class="form-control" placeholder="" />
          </div>
          <div class="form-group">
            <label for="address">Address:</label>
            <input
              value={user.address}
              onChange={(event) => setUser({ ...user, address: event.target.value })}
              type="text" class="form-control" placeholder="" />
          </div>
          <button type="submit" class="btn btn-primary">Update</button>
        </div>
      </form>
    </div>

  )
}

export default UpdateUser
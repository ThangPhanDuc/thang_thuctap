"use client";
import React, { useState,useEffect } from 'react';
import axios from 'axios';

export default function Text() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000'); 
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // const data = [{"id":1,"title":"hello","body":"hello world","created_at":null,"updated_at":null},{"id":2,"title":"chao ban","body":"xin chao","created_at":null,"updated_at":null}];

  return (
    <div>
      <div>This is text component</div>
      {data.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
}



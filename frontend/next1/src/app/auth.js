
import axios from "./api/axios";

export const checkAuthentication = async () => {

  const token = localStorage.getItem('token');

  if (!token) {
    return false;
  } else {
    const response = await axios.get('/user', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data) {
      return true;
    } else {
      return false;
    }
  }


  // const getUser = async () => {
  //   const token = localStorage.getItem('token');
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   };
  //   try {
  //     const response = await axios.get('/user', config);
  //     const userInfo = response.data;
  //     dispatch(setUser(userInfo))
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
};
